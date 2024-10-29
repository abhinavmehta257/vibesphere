import dbConnect from "@/db/dbConnect";
import Post from "../../../model/postSchema";
import rateLimit from "../../../utils/rateLimit";
import generateAnonymousName from "@/utils/generateAnonymousName";
import moderateText from "@/utils/moderateText";
import cookies from "next-cookies";

export default async (req, res) => {
  if (req.method === "POST") {
    const isAllowed = await rateLimit(req, res);
    if (!isAllowed) return;

    const { content, location, created_at } = req.body;

    try {
      const result = await moderateText(content);
      console.log(result);

      if (!result.isApproved) {
        return res.status(400).json({ message: result.message });
      }

      await dbConnect();
      const post = await Post.create({
        created_by: generateAnonymousName(),
        content,
        location: {
          type: "Point",
          coordinates: [location.longitude, location.latitude],
        },
        created_at,
      });

      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: "Error creating post" });
    }
  }
  if (req.method === "GET") {
    const { longitude, latitude, sort_type, page = 1, limit = 10 } = req.query;

    if (!longitude || !latitude) {
      return res
        .status(400)
        .json({ message: "Please allow location in order to use the app" });
    }

    const radius = parseInt(process.env.SPHERE_RADIOUS);
    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);
    const skip = (pageNumber - 1) * pageSize;

    await dbConnect();
    try {
      const posts = await Post.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [parseFloat(longitude), parseFloat(latitude)],
            },
            distanceField: "distance",
            maxDistance: radius,
            spherical: true,
          },
        },
        {
          $match: {
            is_active: true, // Only include active posts
          },
        },
        {
          $addFields: {
            distance: { $toInt: { $divide: ["$distance", 1000] } }, // Convert distance to kilometers and round to integer
            score: { $subtract: ["$upvotes", "$downvotes"] }, // Calculate score
          },
        },
        {
          $sort: {
            ...(sort_type === "hot" ? { score: -1 } : { created_at: -1 }),
          },
        },
        {
          $addFields: {
            relative_time: {
              $switch: {
                branches: [
                  {
                    case: {
                      $lt: [
                        {
                          $dateDiff: {
                            startDate: "$created_at",
                            endDate: "$$NOW",
                            unit: "minute",
                          },
                        },
                        60,
                      ],
                    },
                    then: {
                      $concat: [
                        {
                          $toString: {
                            $dateDiff: {
                              startDate: "$created_at",
                              endDate: "$$NOW",
                              unit: "minute",
                            },
                          },
                        },
                        " min",
                      ],
                    },
                  },
                  {
                    case: {
                      $lt: [
                        {
                          $dateDiff: {
                            startDate: "$created_at",
                            endDate: "$$NOW",
                            unit: "hour",
                          },
                        },
                        24,
                      ],
                    },
                    then: {
                      $concat: [
                        {
                          $toString: {
                            $dateDiff: {
                              startDate: "$created_at",
                              endDate: "$$NOW",
                              unit: "hour",
                            },
                          },
                        },
                        " hr",
                      ],
                    },
                  },
                  {
                    case: {
                      $lt: [
                        {
                          $dateDiff: {
                            startDate: "$created_at",
                            endDate: "$$NOW",
                            unit: "day",
                          },
                        },
                        30,
                      ],
                    },
                    then: {
                      $concat: [
                        {
                          $toString: {
                            $dateDiff: {
                              startDate: "$created_at",
                              endDate: "$$NOW",
                              unit: "day",
                            },
                          },
                        },
                        " d",
                      ],
                    },
                  },
                  {
                    case: {
                      $lt: [
                        {
                          $dateDiff: {
                            startDate: "$created_at",
                            endDate: "$$NOW",
                            unit: "month",
                          },
                        },
                        12,
                      ],
                    },
                    then: {
                      $concat: [
                        {
                          $toString: {
                            $dateDiff: {
                              startDate: "$created_at",
                              endDate: "$$NOW",
                              unit: "month",
                            },
                          },
                        },
                        " m",
                      ],
                    },
                  },
                ],
                default: {
                  $concat: [
                    {
                      $toString: {
                        $dateDiff: {
                          startDate: "$created_at",
                          endDate: "$$NOW",
                          unit: "year",
                        },
                      },
                    },
                    " y",
                  ],
                },
              },
            },
          },
        },
        {
          $project: {
            created_by: 1,
            distance: 1,
            location: 1,
            content: 1,
            comments: 1,
            relative_time: 1,
            score: 1,
          },
        },
        { $skip: skip }, // Skip the documents for previous pages
        { $limit: pageSize }, // Limit the number of documents to the page size
      ]);

      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error fetching posts" });
    }
  }
};
