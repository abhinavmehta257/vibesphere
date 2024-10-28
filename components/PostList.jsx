// components/PostList.js
import Loader from "./ui/Loader";
import Post from "./ui/Post";

export default function PostList({ posts }) {
  return (
    <div className="space-y-4 mt-4">
      {
      posts.length > 0 ? posts.map((post) => (
        <Post key={post._id} post={post} />
      )) : <Loader/>
    }
    </div>
  );
}
