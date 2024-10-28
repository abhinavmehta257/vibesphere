import Post from '@/model/postSchema';
import Report from '@/model/reportSchema'

export default async function reportPost(postId, reporterId) {
    try {
        // Check if the user has already reported this post
        const existingReport = await Report.findOne({ post_id: postId, reporter_id: reporterId });
        if (existingReport) {
            return { status: "error", message: "You have already reported this post." };
        }

        // Create a new report
        await Report.create({ post_id: postId, reporter_id: reporterId });

        // Count the total reports for the post
        const reportCount = await Report.countDocuments({ post_id: postId });

        // If report count is 5 or more, deactivate the post
        if (reportCount >= 2) {
            await Post.findByIdAndUpdate(postId, { is_active: false });
            return { 
                status: "success", 
                message: "Post has been deactivated due to multiple reports." 
            };
        }

        return { status: "success", message: "Post reported successfully." };

    } catch (error) {
        console.error("Error reporting post:", error);
        return { status: "error", message: "Could not report the post." };
    }
}
