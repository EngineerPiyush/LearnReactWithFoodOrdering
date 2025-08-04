import { useState , useEffect } from "react";
const useStatusOfInternet = () => {
   const [internetStatus, updateInternetStatus] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => updateInternetStatus(true);
    const handleOffline = () => updateInternetStatus(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
},[]);
return internetStatus;
}
export default useStatusOfInternet;
