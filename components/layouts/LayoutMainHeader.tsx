import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import UserHeaderPop from "../elements/UserHeaderPop";
import { ClassIcon, MenuIcon, TemplateIcon } from "../../lib/icons";
import { FcLightAtTheEndOfTunnel } from "react-icons/fc";
import useWork from "../../features/work/useWork";
import Box from "../elements/Box";

function LayoutMainHeader() {
  const { user } = useUser();
  const { setSize } = useWork();
  const [col, setCol] = useState(false);

  useEffect(() => {
    const w = window.innerWidth;
    if (w < 420) {
      setCol(true);
    } else {
      setCol(false);
    }
    setSize(w);
    window.onresize = () => {
      const w = window.innerWidth;
      if (w < 420) {
        setCol(true);
      } else {
        setCol(false);
      }
      setSize(w);
    };
  }, [setSize]);

  return (
    <div className=" bg-white ">
      <div className="flex items-center justify-between px-5 p-2 max-w-4xl mx-auto flex-wrap">
        <div className="flex items-center cursor-pointer">
          <FcLightAtTheEndOfTunnel className="text-4xl" />
          {!col && <h2>Flasky</h2>}
          {col && <ColMenu />}
        </div>
        {!col && <Menus />}
        <UserHeaderPop />
        {!user && (
          <p className="hover:text-indigo-400">
            <Link href="/api/auth/login">Login</Link>
          </p>
        )}
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
      <div className="flex items-center gap-1 cursor-pointer hover:text-indigo-400 text-lg ">
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
        class
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
      <MenuIcon
        onClick={() => setOpen((p) => !p)}
        className="text-2xl hover:ring-2 rounded-md ring-indigo-400"
      />
      {open && (
        <span className="relative z-20">
          <Box css="absolute top-2 -left-5 ring-1 shadow-xl ring-slate-300 p-3">
            <Menus style="flex-col gap-2" />
          </Box>
        </span>
      )}
    </div>
  );
}