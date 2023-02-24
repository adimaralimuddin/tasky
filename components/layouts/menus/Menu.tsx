// import Link from "next/link";

const Menu = ({
  children,
  Icon,
  col,
}: {
  children: any;
  Icon?: any;
  col: boolean;
}) => {
  return (
    <div className="dark:text-slate-100 flex items-center gap-1 cursor-pointer hover:text-indigo-400 dark:hover:text-white text-md ">
      {Icon && <Icon className="text-xl" />}
      {!col && children}
    </div>
  );
};

export default Menu;
