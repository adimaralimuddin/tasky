import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { VscSymbolClass } from "react-icons/vsc";
import useUserById from "../../../features/users/useUserById";
import Menu from "./Menu";

function MenuClasses({ col }: { col: boolean }) {
  const { userData } = useUserById();
  const router = useRouter();
  const url = `/classes/${userData?.dbid || ""}`;

  useEffect(() => {
    router.prefetch(url);
  }, [userData]);
  // console.log(`url`, url);

  const onClickHandler = () => {
    if (!userData) {
      console.log(`no userdata, url:`, url);
    }
    console.log(`userdata`, userData);
    router.push(url);
  };

  return (
    <div onClick={onClickHandler}>
      <Menu Icon={VscSymbolClass} col={col}>
        classes
      </Menu>
    </div>
  );
}

export default MenuClasses;
