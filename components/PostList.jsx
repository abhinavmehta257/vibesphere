import { useEffect, useState, useRef, useCallback, useContext } from "react";
import NoData from "./ui/NoData";
import Post from "./ui/Post";
import Loader from "./ui/Loader";
import checkLocationPermission from "@/utils/checkLocationPermission";
import postContext from "@/context/postContext";

export default function PostList({ sortType }) {
  const { posts, setPosts } = useContext(postContext);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const fetchNearbyPosts = async (page, radius = 1000) => {
    setIsLoading(true);
    try {
      // Get user's current location
      checkLocationPermission();
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        // Send a request to the API with location, radius, sortType, and page
        const res = await fetch(
          `/api/post?longitude=${longitude}&latitude=${latitude}&radius=${radius}&sort_type=${sortType}&page=${page}`
        );
        if (res.ok) {
          setIsLoading(false);
        } else {
          throw new Error("Failed to fetch posts");
        }

        const data = await res.json();
        setPosts((prevPosts) => (page === 1 ? data : [...prevPosts, ...data])); // Reset posts if page is 1
        setHasMore(data.length > 0); // Check if more posts are available
      });
    } catch (error) {
      console.error("Error fetching nearby posts:", error);
    }
  };

  // Reset page and posts if sortType changes
  useEffect(() => {
    setPage(1); // Reset page to 1
    setPosts([]); // Clear previous posts
    setHasMore(true); // Reset hasMore
  }, [sortType]);

  // Fetch posts whenever page or sortType changes
  useEffect(() => {
    fetchNearbyPosts(page);
  }, [page, sortType]);

  // Use IntersectionObserver to trigger loadMore when loaderRef is in view
  const loadMore = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [hasMore, isLoading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(loadMore, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });
    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loadMore]);

  return (
    <div className="space-y-4 mt-4 h-full">
      {posts.length > 0
        ? posts.map((post) => <Post key={post._id} post={post} />)
        : !isLoading && (
            <div className="mt-[250px]">
              <NoData
                text={
                  "Be the first to start the conversation—no posts here yet!"
                }
              />
            </div>
          )}
      {isLoading && <Loader className="mt-[50px]" />}
      <div ref={loaderRef} className="h-10"></div>
    </div>
  );
}
