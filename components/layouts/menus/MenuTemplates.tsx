import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { TbLayout } from "react-icons/tb";
import useUserById from "../../../features/users/useUserById";
import Menu from "./Menu";

function MenuTemplates({ col }: { col: boolean }) {
  const { userData } = useUserById();
  const router = useRouter();
  const url = `/templates/${userData?.dbid || ""}`;

  useEffect(() => {
    router.prefetch(url);
  }, [userData]);

  const onClickHandler = () => {
    if (!userData) {
      console.log(`no userdata, url:`, url);
    }
    router.push(url);
  };

  return (
    <div onClick={onClickHandler}>
      <Menu Icon={TbLayout} col={col}>
        templates
      </Menu>
    </div>
  );
}

export default MenuTemplates;
