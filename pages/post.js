import React, { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import { useRouter } from "next/router";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CommentInput from "@/components/CommentInput";
import CommentList from "@/components/CommentList";
import Link from "next/link";
import Head from "next/head";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function PostPage() {
  const router = useRouter();
  const { post_id } = router.query;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const url = process.env.NEXT_PUBLIC_SITE_URL;
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
  }, [post_id]);

  return (
    <>
      {post ? (
        <Head>
          <title>
            {post ? post.content.slice(0, 15) + "..." : "VibeSphere"}
          </title>
          <meta
            name="description"
            content={post ? post.content.slice(0, 150) : "A post on VibeSphere"}
          />
          <meta
            property="og:title"
            content={post ? post.content.slice(0, 15) + "..." : "VibeSphere"}
          />
          <meta
            property="og:description"
            content={post ? post.content.slice(0, 150) : "A post on VibeSphere"}
          />
          <meta
            property="og:image"
            content={`/api/og?content=${encodeURIComponent(
              post.content
            )}&created_by=${encodeURIComponent(post.created_by)}&distance=${
              post.distance || "0"
            }&time_ago=${post.relative_time || "0 min"}&score=${
              post.score || "0"
            }&comments=${post.comments || "0"}`}
          />
          <meta property="og:url" content={`${url}/posts/${post_id}`} />
          <meta property="og:type" content="article" />
        </Head>
      ) : null}
      <div className="min-h-screen py-6 px-4 pb-24 bg-background">
        <Link href={"/"}>
          <div className="flex gap-[8px] items-center text-purple text-[36px]">
            {/* <ArrowBackIosNewIcon /> */}
            <img className="w-[180px]" src="/logo.png" alt="" srcset="" />
          </div>
        </Link>
        {post ? (
          <div className="p-4 bg-background rounded-[8px] border-[3px] border-purple mt-[16px]">
            <div className="flex gap-2 w-full">
              <div className="flex flex-col gap-[8px] w-full">
                <div className="flex w-full items-center gap-2">
                  <div className="p-1 rounded-full bg-purple text-background">
                    <PersonOutlinedIcon />
                  </div>
                  <div className="flex justify-between w-full">
                    <div>
                      <div className="flex gap-2">
                        <p className="text-[14px] text-dark-text font-semibold">
                          {post.created_by}
                        </p>
                      </div>
                      <p className="text-[12px] text-purple font-semibold">
                        {post.relative_time || "0 min"}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-dark-text">{post.content}</p>
              </div>
            </div>
            <div className="text-[12px] text-purple font-semibold mt-[8px]">
              <div>{post?.comments || "0"} comments</div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
        {comments ? <CommentList comments={comments} /> : <Loader />}
      </div>
      {/* Comment Input Area */}
      <CommentInput
        postId={post_id}
        setPost={setPost}
        setComments={setComments}
      />
    </>
  );
}

export default PostPage;
