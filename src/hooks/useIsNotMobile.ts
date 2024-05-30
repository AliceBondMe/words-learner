import { useEffect, useState } from "react";

export const useIsNotMobile = () => {
  const [isNotMobile, setIsNotMobile] = useState<boolean>(
    window.innerWidth >= 768
  );

  const handleResize = () => {
    window.innerWidth >= 768 ? setIsNotMobile(true) : setIsNotMobile(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isNotMobile };
};
