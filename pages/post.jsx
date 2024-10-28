import React, { useEffect, useState } from 'react';
import Loader from '@/components/ui/Loader';
import { useRouter } from 'next/router';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

function PostPage() {
  const router = useRouter();
  const { post_id } = router.query;
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    // Fetch post data here and set it to the state
    const fetchPost = async () => {
      if (post_id) {
        const response = await fetch(`/api/post/${post_id}`);
        const data = await response.json();
        setPost(data);
      }
    };

    fetchPost();
  }, [post_id]);

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
        setIsPosting(true);
      const response = await fetch(`/api/comments/${post_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: 'Anonymous', text: comment }),
      });
      const result = await response.json();
      if (response.ok) {
        setIsPosting(false);
        setPost((prevPost) => ({
          ...prevPost,
          comments: (prevPost.comments || 0) + 1, // Increment comment count
        }));
        setComment(''); // Clear the comment input
      }
      setIsPosting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen p-4 pb-24 bg-dark-background">
        <h3 className="text-xl font-bold text-light-text mb-4">VibeSphere</h3>
        {post ? (
          <div className="p-4 bg-dark-surface rounded-md shadow">
            <div className="flex gap-2 w-full">
              <div className="flex flex-col gap-3 w-full">
                <div className="flex w-full items-center gap-2">
                  <div className="p-1 rounded-full bg-dark-background text-light-tet">
                    <PersonOutlinedIcon />
                  </div>
                  <div className="flex justify-between w-full">
                    <div>
                      <div className="flex gap-2">
                        <p className="text-[14px]">{post.created_by}</p>
                      </div>
                      <p className="text-[12px] text-subtle-text">{post.created_at}</p>
                    </div>
                  </div>
                </div>
                <p className="text-light-text">{post.content}</p>
              </div>
            </div>
            <div className="flex justify-start gap-4 text-[12px] text-subtle-text pb-2">
              <div>{post?.comments || "0"} comments</div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>

      {/* Comment Input Area */}
      <div className="fixed bottom-0 left-0 w-full bg-dark-background p-4 flex items-center gap-2 border-t border-dark-surface">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 p-2 rounded-lg bg-dark-surface text-light-text"
          rows={1}
        />
        <button
          onClick={handleCommentSubmit}
          className="px-4 py-2 bg-primary text-light-text rounded-lg hover:bg-primary-hover transition border-[1px] border-dark-surface"
          disabled={isPosting}
        >
          { isPosting ? "..." : "Post" }
        </button>
      </div>
    </>
  );
}

export default PostPage;
