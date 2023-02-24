import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { fieldVal } from "../appSlice";

function useFieldsGetter() {
  const fronts = useSelector((s: RootState) => s.app.fronts);
  const backs = useSelector((s: RootState) => s.app.backs);

  const getFronts = () => {
    return fronts || [];
  };
  const getBacks = () => {
    return backs || [];
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
