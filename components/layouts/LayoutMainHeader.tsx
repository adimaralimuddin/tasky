import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import UserHeaderPop from "../elements/UserHeaderPop";
import { ClassIcon, MenuIcon, TemplateIcon, XIcon } from "../../lib/icons";
import useWork from "../../features/work/useWork";
import Box from "../elements/Box";
import DarkMode from "../elements/DarkMode";
import AppLogo from "../elements/AppLogo";
import { defUser } from "../../lib/public";

function LayoutMainHeader() {
  const { user } = useUser();
  const { setSize } = useWork();
  const [col, setCol] = useState(false);
  const minW: number = 470;
  let x: any;

  useEffect(() => {
    defUser();
  }, []);

  useEffect(() => {
    const w = window.innerWidth;
    if (w < minW) {
      setCol(true);
    } else {
      setCol(false);
    }
    setSize(w);
    window.onresize = () => {
      const w = window.innerWidth;
      if (w < minW) {
        setCol(true);
      } else {
        setCol(false);
      }
      setSize(w);
    };
  }, [setSize]);

  return (
    <div className=" bg-white dark:bg-slate-800">
      <small>{x}</small>
      <div className="flex items-center justify-between px-5 p-2 max-w-4xl mx-auto flex-wrap">
        <div className="flex items-center cursor-pointer">
          <Link href="/">
            <div className="flex items-center justif-center gap-1">
              <AppLogo />
              {!col && <h2>Flasky</h2>}
            </div>
          </Link>
          {col && <ColMenu />}
        </div>
        {!col && <Menus />}
        <span className="flex items-center gap-2">
          <DarkMode />
          <UserHeaderPop />
          {!user && (
            <p className="hover:text-indigo-400">
              <Link href="/api/auth/login">Login</Link>
            </p>
          )}
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
      <div className="dark:text-slate-100 flex items-center gap-1 cursor-pointer hover:text-indigo-400 dark:hover:text-white text-lg ">
        {Icon && <Icon className="text-xl" />}
        {!col && children}
      </div>
    </Link>
  );
};

export default LayoutMainHeader;

function Menus({ css, style = "flex items-center gap-5 " }: any) {
  return (
    <nav className={style + css}>
      <Menu Icon={ClassIcon} href="/class">
        classes
      </Menu>
      <Menu Icon={TemplateIcon} href="/templates">
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
        {open ? <XIcon /> : <MenuIcon />}
      </div>
      {open && (
        <span className="relative z-20">
          <Box css="absolute top-2 -left-5 ring-1 shadow-xl ring-slate-300 p-3 dark:bg-slate-600 dark:ring-slate-600 dark:shadow-2xl">
            <Menus style="flex-col gap-2" />
          </Box>
        </span>
      )}
    </div>
  );
}
