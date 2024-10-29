export default function checkLocationPermission() {
  if (navigator.permissions) {
    navigator.permissions.query({ name: "geolocation" }).then((permission) => {
      if (permission.state === "granted") {
        // Permission is granted, fetch location
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("Location obtained:", position);
          },
          (error) => {
            console.error("Error obtaining location:", error);
          }
        );
      } else if (permission.state === "prompt") {
        // Prompt the user for permission
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("Location obtained after prompt:", position);
          },
          (error) => {
            console.error(
              "Error obtaining location after prompt:",
              error.message
            );
          }
        );
      } else {
        // Permission denied, ask again
        console.error(
          "Location permission denied. Requesting permission again..."
        );
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(
              "Location obtained after re-requesting permission:",
              position
            );
          },
          (error) => {
            alert("Location permission is required to proceed.");
          }
        );
      }
    });
  } else {
    // Permissions API not supported, request location directly
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Location obtained:", position);
      },
      (error) => {
        console.error("Error obtaining location:", error.message);
        alert("Location permission is required to proceed.");
      }
    );
  }
}
