import { useDispatch } from "react-redux";
import { CategoryType, selectCategory } from "../appSlice";
import useUrlState from "../useUrlState";

function useCategorySelecter() {
  const patch = useDispatch();
  const { setUrlState } = useUrlState();

  const selectCategory_ = (category: CategoryType) => {
    if (!category)
      return console.log(
        `Validate:
        @useCategorySelecter
        msg: category is undefined `,
        category
      );
    patch(selectCategory(category));
    setUrlState({ content: "category", category });
  };
  return {
    selectCategory: selectCategory_,
  };
}

export default useCategorySelecter;
