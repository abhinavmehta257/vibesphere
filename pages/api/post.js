import { dbConnect } from '@/db/dbConnect';
import Post from '../../model/postSchema';
import rateLimit from "../../utils/rateLimit";

export default async (req, res) => {
   
  if (req.method === 'POST') {
    
    const isAllowed = await rateLimit(req, res);
    if (!isAllowed) return;

    const { content, location } = req.body;
    console.log(content, location);
    
    await dbConnect();
    try {
      const post = await Post.create({
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
    const { longitude, latitude, radius = 1000 } = req.query; 
    await dbConnect();
    try {
        const posts = await Post.find({
        location: {
            $near: {
            $geometry: {
                type: 'Point',
                coordinates: [parseFloat(longitude), parseFloat(latitude)]
            },
            $maxDistance: parseInt(radius)
            }
        }
        });
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ error: 'Error fetching posts' });
    }
  }
};
