import toast from "react-hot-toast";

export const successToast = (message) => {
  toast.success(message, {
    duration: 2000, // duration in milliseconds
    position: "bottom-center", // position of the toast
  });
};

export const warningToast = (message) => {
  toast.warning(message, {
    duration: 2000, // duration in milliseconds
    position: "bottom-center", // position of the toast
  });
};

export const errorToast = (message) => {
  toast.error(message, {
    duration: 2000, // duration in milliseconds
    position: "bottom-center", // position of the toast
  });
};
