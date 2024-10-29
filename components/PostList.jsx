// components/PostList.js
import NoData from "./ui/NoData";
import Post from "./ui/Post";

export default function PostList({ posts }) {
  return (
    <div className="space-y-4 mt-4 h-full">
      {
      posts.length > 0 ? posts.map((post) => (
        <Post key={post._id} post={post} />
      )) : <div className="mt-[250px]"><NoData text={'Be the first to start the conversation—no posts here yet!'}/> </div>
    }
    </div>
  );
}
