import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { VscSymbolClass } from "react-icons/vsc";
import useUserDb from "../../../features/users/useUserDb";
import Menu from "./Menu";

function MenuClasses({ col }: { col: boolean }) {
  const { userData } = useUserDb();
  const router = useRouter();
  const url = `/classes/${userData?.dbid || ""}`;

  useEffect(() => {
    router.prefetch(url);
  }, [userData]);
  // console.log(`url`, url);

  const onClickHandler = () => {
    if (!userData) {
      // router.push(`/classes`);
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
