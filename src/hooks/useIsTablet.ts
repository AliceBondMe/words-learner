import { useEffect, useState } from "react";

export const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState<boolean>(
    window.innerWidth < 1440 && window.innerWidth >= 768
  );

  const handleResize = () => {
    window.innerWidth < 1440 && window.innerWidth >= 768
      ? setIsTablet(true)
      : setIsTablet(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isTablet };
};
