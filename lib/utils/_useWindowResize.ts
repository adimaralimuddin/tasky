import { useEffect, useState } from "react";
const useWindowResize = (minWidth = 470) => {
  const [width, setWidth] = useState<number | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const setWidthSize = (windowWidth: number) => {
    if (windowWidth < minWidth) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
    setWidth(windowWidth);
  };

  useEffect(() => {
    setWidthSize(window.innerWidth);

    const updateOnResize = () => {
      setWidthSize(window.innerWidth);
    };

    window.addEventListener("resize", updateOnResize);

    return () => {
      window.removeEventListener("resize", updateOnResize);
    };
  }, []);

  return {
    width,
    collapsed,
  };
};

export default useWindowResize;
