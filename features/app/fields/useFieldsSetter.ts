import { useDispatch } from "react-redux";
import { FieldType } from "../../card/CardType";
import { setBacks, setFronts } from "../appSlice";

function useFieldsSetter() {
  const patch = useDispatch();

  const setFronts_ = (frontFields: FieldType[]) => {
    patch(setFronts(frontFields));
  };
  const setBacks_ = (frontFields: FieldType[]) => {
    patch(setBacks(frontFields));
  };

  return { setFronts: setFronts_, setBacks: setBacks_ };
}

export default useFieldsSetter;
