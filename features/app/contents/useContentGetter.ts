import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
// import useContentSetter from "./useContentSetter";

function useContentGetter() {
  const content = useSelector((s: RootState) => s.app.content);
  const router = useRouter();
  const [s, ss] = useState(undefined);
  // const { setContent } = useContentSetter();

  useEffect(() => {
    const xx = localStorage.getItem("content");
    console.log(`xx`, xx);
    if (xx) {
      ss(s);
      console.log(`seteed`, xx);

      // setContent(xx);
    }
  }, []);

  const getContent = () => {
    // const localContent = localStorage.getItem("content");
    return content || s || router.query?.content || "dashboard";
  };
  return { router, getContent };
}

export default useContentGetter;
