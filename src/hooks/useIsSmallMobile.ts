import { useEffect, useState } from "react";

export const useIsSmallMobile = () => {
  const [isSmallMobile, setIsSmallMobile] = useState<boolean>(
    window.innerWidth < 375
  );

  const handleResize = () => {
    window.innerWidth < 375 ? setIsSmallMobile(true) : setIsSmallMobile(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isSmallMobile };
};
