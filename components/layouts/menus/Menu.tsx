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
    <div className="flex items-center gap-1 font-medium cursor-pointer  text-md text-prime hover:text-indigo-800 dark:hover:text-indigo-100 ">
      {Icon && <Icon className="text-xl" />}
      {!col && children}
    </div>
  );
};

export default Menu;
