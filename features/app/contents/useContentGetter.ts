import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

function useContentGetter() {
  const content = useSelector((s: RootState) => s.app.content);
  const router = useRouter();

  const getContent = () => {
    return content || router.query?.content || "dashboard";
  };
  return { router, getContent };
}

export default useContentGetter;
