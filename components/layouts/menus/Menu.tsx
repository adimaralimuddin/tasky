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
    <div className="text-prime dark:text-slate-100d flex items-center gap-1 cursor-pointer hover:text-indigo-400  dark:hover:text-white text-md ">
      {Icon && <Icon className="text-xl" />}
      {!col && children}
    </div>
  );
};

export default Menu;
