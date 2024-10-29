import React, { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import { useRouter } from "next/router";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CommentInput from "@/components/CommentInput";
import CommentList from "@/components/CommentList";
import Link from "next/link";

function PostPage() {
  const router = useRouter();
  const { post_id } = router.query;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);

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

  useEffect(() => {
    // Fetch post data here and set it to the state
    const fetchComments = async () => {
      if (post_id) {
        const response = await fetch(`/api/comments/${post_id}`);
        const data = await response.json();
        console.log(data);
        setComments(data);
      }
    };

    fetchComments();
  }, [post_id, post]);

  return (
    <>
      <div className="min-h-screen p-4 pb-24 bg-dark-background">
        <Link href={"/"}>
          <h3 className="text-xl font-bold text-light-text mb-4">VibeSphere</h3>
        </Link>
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
                      <p className="text-[12px] text-subtle-text">
                        {post.relative_time}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-light-text">{post.content}</p>
              </div>
            </div>
            <div className="flex justify-start gap-4 text-[12px] text-subtle-text">
              <div>{post?.comments || "0"} comments</div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
        {comments ? <CommentList comments={comments} /> : <Loader />}
      </div>
      {/* Comment Input Area */}
      <CommentInput postId={post_id} setPost={setPost} />
    </>
  );
}

export default PostPage;
