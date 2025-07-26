import { useState , useEffect } from "react";
const useStatusOfInternet = () => {
  const [internetStatus, updateInternetStatus] = useState(true);

  useEffect(() => {
    window.addEventListener("offline", () => {
      updateInternetStatus(false);
    });
  }, []);
  return internetStatus;
};
export default useStatusOfInternet;
