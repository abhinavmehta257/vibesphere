import CommentInput from "@/components/CommentInput";
import CommentList from "@/components/CommentList";
import Loader from "@/components/ui/Loader";
import Post from "@/components/ui/Post";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toastContext from "@/context/toastContext";
import { successToast, errorToast, warningToast } from "@/utils/toast";
import Link from "next/link";
import getRelativeTime from "@/utils/getRelativeTime";

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
      <toastContext.Provider value={{ successToast, errorToast, warningToast }}>
        {post ? (
          <Head>
            <title>
              {post ? post.content.slice(0, 15) + "..." : "VibeSphere"}
            </title>
            <meta
              name="description"
              content={
                post ? post.content.slice(0, 150) : "A post on VibeSphere"
              }
            />
            <meta
              property="og:title"
              content={post ? post.content.slice(0, 15) + "..." : "VibeSphere"}
            />
            <meta
              property="og:description"
              content={
                post ? post.content.slice(0, 150) : "A post on VibeSphere"
              }
            />
            <meta
              property="og:image"
              content={`${url}/api/og?content=${encodeURIComponent(
                post.content
              )}&created_by=${encodeURIComponent(post.created_by)}&distance=${
                post.distance || "0"
              }&time_ago=${getRelativeTime(post.created_at) || "0 min"}&score=${
                post.score || "0"
              }&comments=${post.comments || "0"}`}
            />
            <meta property="og:image:width" content="600" />
            <meta property="og:image:width" content="auto" />
            <meta
              property="twitter:image"
              content={`${url}/api/og?content=${encodeURIComponent(
                post.content
              )}&created_by=${encodeURIComponent(post.created_by)}&distance=${
                post.distance || "0"
              }&time_ago=${getRelativeTime(post.created_at) || "0 min"}&score=${
                post.score || "0"
              }&comments=${post.comments || "0"}`}
            />
            <meta
              property="og:url"
              content={`${url}/posts/post_id=${post_id}`}
            />
            <meta property="og:type" content="article" />
          </Head>
        ) : null}
        <div className="min-h-screen p-[16px] py-6 pb-24 bg-background">
          <Link href={"/"}>
            <div className="flex items-center text-purple text-[36px] mb-[16px]">
              <img className="w-[180px]" src="/logo.png" alt="" srcset="" />
            </div>
          </Link>
          {post ? <Post post={post} isComment={false} /> : <Loader />}
          {comments ? <CommentList comments={comments} /> : <Loader />}
        </div>
        {/* Comment Input Area */}
        <CommentInput
          postId={post_id}
          setPost={setPost}
          setComments={setComments}
        />
      </toastContext.Provider>
    </>
  );
}

export default PostPage;
