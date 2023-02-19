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
    window.onresize = () => {
      setWidthSize(window.innerWidth);
    };
  }, []);

  return {
    width,
    collapsed,
  };
};

export default useWindowResize;
