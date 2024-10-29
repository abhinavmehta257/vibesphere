// pages/index.js
import { useState, useEffect, useContext } from "react";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import toastContext from "@/context/toastContext";
import { Toaster, toast } from "react-hot-toast";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import Cookies from "js-cookie";
import Header from "@/components/ui/Header";
import Loader from "@/components/ui/Loader";
import checkLocationPermission from "@/utils/checkLocationPermission";

export default function Home() {
  const [posts, setPosts] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [sortType, setSortType] = useState("hot");
  // Handle form submission
  const handlePostSubmit = async (content, location, setIsPosting) => {
    const created_at = new Date();
    console.log(created_at);

    const res = await fetch("/api/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, location, created_at }),
    });

    const newPost = await res.json();
    console.log(newPost);

    if (res.ok) {
      setShowForm(false);
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    } else {
      errorToast(newPost.message);
    }
    setIsPosting(false);
  };

  useEffect(() => {
    const fetchNearbyPosts = async (radius = 1000) => {
      try {
        // Get user's current location
        checkLocationPermission();
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          // Send a request to the API with location and radius
          const res = await fetch(
            `/api/post?longitude=${longitude}&latitude=${latitude}&radius=${radius}&sort_type=${sortType}`
          );
          if (!res.ok) {
            throw new Error("Failed to fetch posts");
          }

          const posts = await res.json();
          setPosts(posts); // Assuming you have a setPosts function in your component state
        });
      } catch (error) {
        console.error("Error fetching nearby posts:", error);
      }
    };
    fetchNearbyPosts();
  }, [sortType]);

  useEffect(() => {
    const user_id = Cookies.get("user_id");
    if (!user_id) {
      Cookies.set("user_id", crypto.randomUUID());
    }
  }, []);

  const successToast = (message) => {
    toast.success(message, {
      duration: 2000, // duration in milliseconds
      position: "bottom-center", // position of the toast
    });
  };

  const warningToast = (message) => {
    toast.warning(message, {
      duration: 2000, // duration in milliseconds
      position: "bottom-center", // position of the toast
    });
  };

  const errorToast = (message) => {
    toast.error(message, {
      duration: 2000, // duration in milliseconds
      position: "bottom-center", // position of the toast
    });
  };

  return (
    <toastContext.Provider value={{ successToast, warningToast, errorToast }}>
      <div className="min-h-screen p-4 bg-dark-background">
        <Header sortType={sortType} setSortType={setSortType} />
        <div className="w-full h-full max-w-md space-y-6 ">
          {showForm && <PostForm onSubmit={handlePostSubmit} />}
          <div className="mt-[100px]">
            {posts ? (
              <PostList posts={posts} />
            ) : (
              <Loader className="mt-[50px]" />
            )}
          </div>
        </div>
        <Toaster />
        <FloatingActionButton
          onClick={() => setShowForm(!showForm)}
          showForm={showForm}
        />
      </div>
    </toastContext.Provider>
  );
}
