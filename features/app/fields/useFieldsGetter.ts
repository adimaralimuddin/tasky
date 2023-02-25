import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { FieldType } from "../../card/CardType";
import { fieldVal } from "../appSlice";

function useFieldsGetter() {
  const router = useRouter();

  const fronts = useSelector((s: RootState) => s.app.fronts);
  const backs = useSelector((s: RootState) => s.app.backs);

  const getFieldUrlState = (side: "fronts" | "backs"): FieldType[] => {
    return router.query?.[side] &&
      typeof String(router.query[side]) === "string"
      ? JSON.parse(String(router.query[side]))
      : [];
  };

  const getFronts = () => {
    return fronts || getFieldUrlState("fronts");
  };
  const getBacks = () => {
    return backs || getFieldUrlState("backs");
  };

  const getFields = () => {
    return {
      fronts: getFronts(),
      backs: getBacks(),
    };
  };

  const getFieldsRaw = () => {
    return {
      fronts: getFronts()?.map((f) => {
        const { view, ...f_ } = f;
        return f_;
      }),
      backs: getBacks()?.map((f) => {
        const { view, ...f_ } = f;
        return f_;
      }),
    };
  };
  return { fronts, backs, getFronts, getBacks, getFields, getFieldsRaw };
}

export default useFieldsGetter;
