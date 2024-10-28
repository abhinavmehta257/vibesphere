import dbConnect from '@/db/dbConnect';
import Post from '../../../model/postSchema';
import rateLimit from "../../../utils/rateLimit";
import generateAnonymousName from '@/utils/generateAnonymousName';
import moderateText from '@/utils/moderateText';

export default async (req, res) => {
   
  if (req.method === 'POST') {
    
    const isAllowed = await rateLimit(req, res);
    if (!isAllowed) return;

    const { content, location, created_at } = req.body;
    
    
    try {
      const result = await moderateText(content);
      console.log(result);
      
      if(!result.isApproved){
        return res.status(400).json({ message: result.message });
      }

      await dbConnect();
      const post = await Post.create({
        created_by: generateAnonymousName(),
        content,
        location: {
          type: 'Point',
          coordinates: [location.longitude, location.latitude]
        },
        created_at
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: 'Error creating post' });
    }
  }
  if(req.method === 'GET'){
    const { longitude, latitude, sort_type} = req.query; 
    const radius = process.env.SPHERE_RADIOUS;
    await dbConnect();
    try {
      const posts = await Post.aggregate([
        {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [parseFloat(longitude), parseFloat(latitude)]
                },
                distanceField: "distance",
                maxDistance: parseInt(radius),
                spherical: true
            }
        },
        {
          $match: {
              is_active: true // Only include active posts
          }
      },
        {
            $addFields: {
                distance: { $toInt: { $divide: ["$distance", 1000] } } // Convert distance to kilometers and round to integer
            }
        },
        {
            $project: {
                created_by: 1,
                created_at: {
                    $dateToString: { format: "%d-%m-%Y %H:%M", date: "$created_at" }
                },
                distance: 1,
                location: 1,
                content: 1,
                upvotes: 1,
                downvotes: 1
            }
        },
        {
            $addFields: {
                score: { $subtract: ["$upvotes", "$downvotes"] } // Calculate the score based on upvotes - downvotes
            }
        },
        {
            $sort: {
                ...(sort_type === "hot"
                    ? { score: -1 } // Sort by score (highest upvotes - downvotes first)
                    : { created_at: -1 }) // Sort by newest first
            }
        }
    ]);
    
    console.log(posts);
    
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ error: 'Error fetching posts' });
    }
  }
};
