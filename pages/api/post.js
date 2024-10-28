import dbConnect from '@/db/dbConnect';
import Post from '../../model/postSchema';
import rateLimit from "../../utils/rateLimit";
import generateAnonymousName from '@/utils/generateAnonymousName';

export default async (req, res) => {
   
  if (req.method === 'POST') {
    
    const isAllowed = await rateLimit(req, res);
    if (!isAllowed) return;

    const { content, location } = req.body;
    console.log(content, location);
    
    await dbConnect();
    try {
      const post = await Post.create({
        created_by: generateAnonymousName(),
        content,
        location: {
          type: 'Point',
          coordinates: [location.longitude, location.latitude]
        }
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ error: 'Error creating post' });
    }
  }
  if(req.method === 'GET'){
    const { longitude, latitude} = req.query; 
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
                distanceField: "distance", // The calculated distance will be stored in this field
                maxDistance: parseInt(radius),
                spherical: true
            }
        },
        {
            $addFields: {
                distance: { $toInt: { $divide: ["$distance", 1000] } } // Convert distance to kilometers and round to integer
            }
        },{
            $project: {
                created_by:1,
                created_at: {
                    $dateToString: { format: "%d-%m-%Y %H:%M", date: "$created_at" }
                },
                distance: 1, 
                location: 1,
                content:1,
                upvotes:1,
                downvotes:1
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
