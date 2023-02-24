import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { TemplateType } from "../template/templateType";

import {
  ServerDataType,
  setClass,
  setDashboard,
  setFolders,
  setTemplate,
} from "./serverDataSlice";

function useServerState() {
  const patch = useDispatch();
  const { class_, dashboard, folders, template } = useSelector(
    (state: RootState) => state.server
  );

  const initServerState = ({ class_, dashboard, folders }: ServerDataType) => {
    patch(setClass(class_));
    patch(setDashboard(dashboard));
    patch(setFolders(folders));
  };

  return {
    initServerState,
    class_,
    dashboard,
    folders,
    template,
    setTemplate: (template: TemplateType) => patch(setTemplate(template)),
  };
}

export default useServerState;
