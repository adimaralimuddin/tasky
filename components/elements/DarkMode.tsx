import React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "../../lib/icons";

export default function DarkMode() {
  const { theme, systemTheme, setTheme } = useTheme();

  function IconItem({ val, Icon }: { val: string; Icon: any }) {
    return (
      <div
        className="p-1 m-3 flex items-center gap-2 justify-center rounded-3xl cursor-pointer  hover:ring-2 ring-slate-300 dark:ring-indigo-500"
        onClick={() => setTheme(val)}
      >
        <Icon className="text-3xl dark:text-white" />
        <h3>{val}</h3>
      </div>
    );
  }

  const themer = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return <IconItem val="light" Icon={Sun} />;
    } else {
      return <IconItem val="dark" Icon={Moon} />;
    }
  };

  return <div>{themer()}</div>;
}
