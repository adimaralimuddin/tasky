import { useEffect, useState } from "react";

function _useGraphCount(value: number, speed: number = 10) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setCounter(0);
    const sett = setInterval(() => {
      setCounter((p) => {
        if (value === 0) {
          clearInterval(sett);
          return 0;
        }
        if (value >= 100 && p >= 100) {
          clearInterval(sett);
          return 100;
        }
        if (p >= value - 1) {
          clearInterval(sett);
        }
        if (isNaN(value)) {
          clearInterval(sett);
          return 0;
        }
        return (p += 1);
      });
    }, speed);

    return () => {
      clearInterval(sett);
      setCounter(0);
    };
  }, [value]);
  return {
    counter,
    value,
  };
}

export default _useGraphCount;
