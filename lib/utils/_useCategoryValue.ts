import { CategoryType } from "../../features/app/appSlice";
import { CATEGORY_LEFT, CATEGORY_NEW, CATEGORY_PASSED } from "../public";

export default function _useCategoryValue(category: CategoryType) {
  switch (category) {
    case "new":
      return CATEGORY_NEW;
    case "passed":
      return CATEGORY_PASSED;
    case "left":
      return CATEGORY_LEFT;
    default:
      return "";
  }
}
