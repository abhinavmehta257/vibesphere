// pages/index.js
import { useState, useEffect, useContext } from "react";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import toastContext from "@/context/toastContext";
import postContext from "@/context/postContext";
import { Toaster, toast } from "react-hot-toast";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import Cookies from "js-cookie";
import Header from "@/components/ui/Header";
import Loader from "@/components/ui/Loader";
import checkLocationPermission from "@/utils/checkLocationPermission";
import WelcomePopup from "@/components/welcomePopup";
import Head from "next/head";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [sortType, setSortType] = useState("hot");
  const [posts, setPosts] = useState([]);
  // Handle form submission

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
    <postContext.Provider value={{ posts, setPosts }}>
      <toastContext.Provider value={{ successToast, warningToast, errorToast }}>
        <Head>
          <title>VibeSphere</title>
        </Head>
        <div className="min-h-screen p-4 bg-dark-background">
          <Header sortType={sortType} setSortType={setSortType} />
          <div className="w-full h-full max-w-md space-y-6 ">
            {showForm && <PostForm setShowForm={setShowForm} />}
            <div className="mt-[100px]">
              <PostList sortType={sortType} />
            </div>
          </div>
          <Toaster />
          <FloatingActionButton
            onClick={() => setShowForm(!showForm)}
            showForm={showForm}
          />
        </div>
        <WelcomePopup />
      </toastContext.Provider>
    </postContext.Provider>
  );
}
