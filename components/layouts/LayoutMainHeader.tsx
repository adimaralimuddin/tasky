// import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TbLayout } from "react-icons/tb";
import { VscSymbolClass } from "react-icons/vsc";
import useWindowResize from "../../lib/utils/_useWindowResize";
// import {  MenuIcon, TemplateIcon, XIcon } from "../../lib/icons";
import { defUser } from "../../lib/public";
import AppLogo from "../elements/AppLogo";
import Box from "../elements/Box";
import DarkMode from "../elements/DarkMode";
// import UserHeaderPop from "../elements/UserHeaderPop";

import dynamic from "next/dynamic";
// import { MdOutlineAddAlert } from "react-icons/md";

const DynamicUserMenu = dynamic(() => import("../elements/UserHeaderPop"), {
  ssr: false,
});

interface LayoutMainProps {
  showTitle?: boolean;
  className?: string;
}
function LayoutMainHeader({ showTitle = true, className }: LayoutMainProps) {
  const { collapsed } = useWindowResize(470);

  useEffect(() => {
    defUser();
  }, []);

  return (
    <div className={" bg-white dark:bg-slate-800 " + className}>
      <div className="flex items-center justify-between px-5 max-w-4xl mx-auto flex-wrap">
        <div className="flex items-center cursor-pointer">
          {showTitle ? (
            <Link href="/">
              <div className="flex items-center justif-center gap-1">
                <AppLogo />
                {!collapsed ? (
                  <h2 className=" text-xl font-bold">Tasky</h2>
                ) : null}
              </div>
            </Link>
          ) : null}
          {collapsed ? <ColMenu /> : null}
        </div>
        {!collapsed ? <MainMenus /> : null}
        <span className="flex items-center gap-2">
          <DarkMode />
          <DynamicUserMenu />
        </span>
      </div>
    </div>
  );
}

const Menu = ({
  href,
  children,
  Icon,
  col,
}: {
  href: string;
  children: any;
  Icon?: any;
  col?: boolean;
}) => {
  return (
    <Link href={href}>
      <div className="dark:text-slate-100 flex items-center gap-1 cursor-pointer hover:text-indigo-400 dark:hover:text-white text-md ">
        {Icon && <Icon className="text-xl" />}
        {!col && children}
      </div>
    </Link>
  );
};

export default LayoutMainHeader;

function MainMenus({ css, style = "flex items-center gap-5 " }: any) {
  return (
    <nav className={style + css}>
      <Menu Icon={VscSymbolClass} href="/class">
        classes
      </Menu>
      <Menu Icon={TbLayout} href="/templates">
        templates
      </Menu>
    </nav>
  );
}

function ColMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div
        onClick={() => setOpen((p) => !p)}
        className=" p-1 mx-1 text-2xl hover:ring-2 rounded-md ring-indigo-400"
      >
        {/* {open ? <XIcon /> : <MenuIcon />} */}
      </div>
      {open && (
        <span className="relative z-20">
          <Box css="absolute top-2 -left-5 ring-1 shadow-xl ring-slate-300 p-3 dark:bg-slate-600 dark:ring-slate-600 dark:shadow-2xl">
            <MainMenus style="flex-col gap-2" />
          </Box>
        </span>
      )}
    </div>
  );
}
