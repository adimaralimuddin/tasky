import { useEffect, useState } from "react";

function _useGraphCount(value: number, speed: number = 10) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const sett = setInterval(() => {
      setCounter((p) => {
        if (p >= value - 1) {
          clearInterval(sett);
        }
        return (p += 1);
      });
    }, speed);

    return () => {
      clearInterval(sett);
    };
  }, []);
  return {
    counter,
    value,
  };
}

export default _useGraphCount;
