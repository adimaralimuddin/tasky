import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TbLayout } from "react-icons/tb";
import { defUser } from "../../lib/public";
import useWindowResize from "../../lib/utils/_useWindowResize";
import AppLogo from "../elements/AppLogo";
import DarkMode from "../elements/DarkMode";

import dynamic from "next/dynamic";
import { FaBars, FaTimes } from "react-icons/fa";
import Menu from "./menus/Menu";
import MenuClasses from "./menus/MenuClasses";

const DynamicUserMenu = dynamic(() => import("../elements/UserHeaderPop"), {
  ssr: false,
});

interface LayoutMainProps {
  showTitle?: boolean;
  className?: string;
}
function LayoutMainHeader({ showTitle = true, className }: LayoutMainProps) {
  const { collapsed } = useWindowResize(740);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    defUser();
  }, []);

  useEffect(() => {
    setOpenMenu(collapsed);
  }, []);

  return (
    <div className={" bg-white dark:bg-slate-800 relative " + className}>
      <div className="flex p-2 items-center justify-between px-5 max-w-5xl mx-auto flex-wrap">
        <div className="flex items-center cursor-pointer">
          {showTitle ? (
            <Link prefetch={false} href="/">
              <div className="flex items-center justif-center gap-1">
                <AppLogo showTitle={!collapsed} />
              </div>
            </Link>
          ) : null}
          {collapsed ? (
            <MenuBurger open={openMenu} setOpen={setOpenMenu} />
          ) : null}
        </div>
        {!collapsed ? (
          <div>
            <MainMenus col={collapsed} />
          </div>
        ) : null}
        <span className="flex items-center gap-2">
          <DarkMode />
          <DynamicUserMenu />
        </span>
      </div>
      {openMenu && collapsed ? (
        <div className=" fixed top-[50px] animate-fadein flex_ justify-center p-3 min-h-[200px] card-shadow left-0 w-screen bg-white dark:bg-layer-50 z-50 ">
          <MainMenus css=" bg-red-400d flex flex-wrap " />
        </div>
      ) : null}
    </div>
  );
}

export default LayoutMainHeader;

function MainMenus({ css, style = "flex items-center gap-5 ", col }: any) {
  return (
    <div className={style + " " + css}>
      <MenuClasses col={col} />
      <Link href="/templates">
        <div>
          <Menu col={col} Icon={TbLayout}>
            templates
          </Menu>
        </div>
      </Link>
    </div>
  );
}

function MenuBurger({ open, setOpen }: any) {
  return (
    <div
      onClick={() => setOpen((p: boolean) => !p)}
      className=" p-1 mx-1 text-xl hover:ring-2 rounded-md ring-indigo-400"
    >
      {open ? <FaTimes /> : <FaBars />}
    </div>
  );
}
