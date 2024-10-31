export default async function checkLocationPermission() {
  try {
    const permission = await navigator.permissions.query({
      name: "geolocation",
    });

    if (permission.state === "granted") {
      // If permission is granted, get the current position
      return await new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("Location obtained:", position);
            resolve(true);
          },
          (error) => {
            console.error("Error obtaining location:", error);
            resolve(false);
          }
        );
      });
    } else if (permission.state === "prompt" || permission.state === "denied") {
      // Prompt user for location access if permission is not granted
      return await new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("Location obtained after prompting:", position);
            resolve(true);
          },
          (error) => {
            console.error(
              "User denied location access or an error occurred:",
              error
            );

            resolve(false);
          }
        );
      });
    }
  } catch (error) {
    console.error("Error checking location permission:", error);
    errorToast("Error checking location permission.");
    return false;
  }
}
