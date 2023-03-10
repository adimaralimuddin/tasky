import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { TbLayout } from "react-icons/tb";
import useUserDb from "../../../features/users/useUserDb";
import Menu from "./Menu";

function MenuTemplates({ col }: { col: boolean }) {
  const { userData } = useUserDb();
  const router = useRouter();
  const url = `/templates/${userData?.dbid || ""}`;

  useEffect(() => {
    router.prefetch(url);
  }, [userData]);
  // console.log(`url`, url);

  const onClickHandler = () => {
    if (!userData) {
      // router.push(`/templates`);
      console.log(`no userdata, url:`, url);
    }
    console.log(`userdata`, userData);
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
