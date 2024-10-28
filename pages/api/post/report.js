import reportPost from '@/utils/reportPost';
import cookies from 'next-cookies';

export default async (req, res) => {
    const {post_id} = req.body;
    const { user_id } = cookies({ req });
    if (req.method === 'POST') {
        const report = await reportPost(post_id, user_id);
        return res.status(200).json(report);
    }
};