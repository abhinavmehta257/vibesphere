// components/PostList.js
import Post from "./ui/Post";

export default function PostList({ posts }) {
  return (
    <div className="space-y-4 mt-4">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}
