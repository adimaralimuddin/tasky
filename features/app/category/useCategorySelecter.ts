import { useDispatch } from "react-redux";
import { CategoryType, selectCategory } from "../appSlice";

function useCategorySelecter() {
  const patch = useDispatch();

  const selectCategory_ = (category: CategoryType) => {
    if (!category)
      return console.log(
        `Validate: useCategory selectCategory: category is undefined `,
        category
      );
    patch(selectCategory(category));
  };
  return {
    selectCategory: selectCategory_,
  };
}

export default useCategorySelecter;
