import { useRouter } from "next/router";
import useServerState from "../dateState/useServerState";
import useClassById from "./useClassById";

function useClassGetter() {
  const router = useRouter();
  const { query } = router;

  const { class_ } = useServerState();
  const classById = useClassById(String(query?.classId));
  const getClassId = () => {
    return class_?.id;
  };
  const getClass = () => {
    return classById.data;
  };
  return { ...classById, class_, getClassId, getClass };
}

export default useClassGetter;
