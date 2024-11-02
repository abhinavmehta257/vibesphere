// pages/index.js
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import Header from "@/components/ui/Header";
import WelcomePopup from "@/components/welcomePopup";
import postContext from "@/context/postContext";
import toastContext from "@/context/toastContext";
import Cookies from "js-cookie";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import generateAnonymousName from "@/utils/generateAnonymousName";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [sortType, setSortType] = useState("new");
  const [posts, setPosts] = useState([]);
  const [isLocation, setIsLocation] = useState(false);
  // Handle form submission

  useEffect(() => {
    const user_id = Cookies.get("user_id");
    const user_name = Cookies.get("user_name");
    if (!user_id) {
      Cookies.set("user_id", crypto.randomUUID());
    }
    if (!user_name) {
      Cookies.set("user_name", generateAnonymousName());
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
    <postContext.Provider value={{ posts, setPosts }}>
      <toastContext.Provider value={{ successToast, warningToast, errorToast }}>
        <Head>
          <title>VibeSphere</title>
        </Head>
        <div className="min-h-screen p-4 bg-background">
          <Header sortType={sortType} setSortType={setSortType} />
          <div className="w-full h-full max-w-md space-y-6 ">
            {showForm && <PostForm setShowForm={setShowForm} />}
            <div className="mt-[132px]">
              {isLocation ? (
                <PostList sortType={sortType} />
              ) : (
                <WelcomePopup setIsLocation={setIsLocation} />
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
    </postContext.Provider>
  );
}
