import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { CategoryType } from "../appSlice";

function useCategoryGetter() {
  const router = useRouter();
  const selectedCategory = useSelector(
    (s: RootState) => s.app.selectedCategory
  );

  const getSelectedCategory = (): CategoryType => {
    return (
      selectedCategory || (String(router?.query?.category) as CategoryType)
    );
  };

  return {
    router,
    selectedCategory,
    getSelectedCategory,
  };
}

export default useCategoryGetter;
