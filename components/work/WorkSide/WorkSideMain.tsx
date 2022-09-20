import React, { useEffect, useState } from "react";
import useClass from "../../../features/class/useClass";
import useFolder from "../../../features/folder/useFolder";
import useWork from "../../../features/work/useWork";
import { OptionIcon, UndoIcon } from "../../../lib/icons";
import ClassItem from "../../class/ClassItem";
import ClassMenu from "../../class/ClassMenu";
import Box from "../../elements/Box";
import FolderAdder from "../folder/FolderAdder";
import FolderItem from "../folder/FolderItem";
import TopicAdder from "../topic/TopicAdder";

type props = {
  classId: string;
};

export default function WorkSide<Type>({ classId }: props) {
  const {
    userClass: { data },
  } = useClass(classId);

  const { folder } = useFolder(classId);
  const { setContent } = useWork();
  const [collapse, setCollapse] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    work: { size },
  } = useWork();
  useEffect(() => {
    const w = size;
    if (w < 670) {
      setCollapse(true);
      setOpen(false);
    } else {
      setCollapse(false);
      setOpen(true);
    }
  }, [size]);

  const onSideBarClose = () => {
    if (collapse) {
      setOpen(false);
    }
  };

  const Content = (
    <div
      className={
        "bg-white rounded-xl flex-1 max-w-xs m-0 w-[200px]d p-0 pb-2 px-1 py-1 " +
        (!open && " hidden")
      }
    >
      <header>
        {collapse && (
          <button
            className="ring-1f m-0"
            onClick={() => {
              setOpen((p) => !p);
            }}
          >
            <UndoIcon />
            back
          </button>
        )}
        <div className=" pb-2">
          <ClassMenu data={data} />
          <h3
            className="text-cyan-500 cursor-pointer hover:bg-slate-100 hover:text-cyan-600 px-3 self-start rounded-lg"
            onClick={(_) => setContent("dashboard")}
          >
            Dashboard
          </h3>
        </div>
        <hr />
        <FolderAdder classId={classId} />
      </header>
      <main>
        {folder?.data?.map((folder) => (
          <FolderItem
            data={folder}
            key={folder?.id}
            classId={classId}
            setSideBar={onSideBarClose}
          />
        ))}
      </main>
      <footer></footer>
      <TopicAdder />
    </div>
  );

  const isCol = (a: any, b: any) => (collapse ? a : b);
  return (
    <div
      className={
        "z-50 py-4  bg-white rounded-xl " +
        isCol("relative", " px-[2%] flex-1 mr-3 m-1 shadow-sm")
      }
    >
      {collapse && !open && (
        <Box
          css="absolute top-0 -left-4 shadow-xl ring-slate-200 cursor-pointer ring-1 w-min m-0 hover:scale-[1.1] hover:pl-6 hover:shadow-xl hover:ring-slate-300 transition-all "
          onClick={() => setOpen((p) => !p)}
        >
          <OptionIcon className="ml-1" />
        </Box>
      )}
      {!collapse && !open && <Box onClick={() => setOpen((p) => !p)}>opt</Box>}
      <div
        className={isCol(
          open &&
            "ring-1 ring-red-500 fixed top-0 left-0 w-screen h-screen bg-slate-600 p-2 bg-opacity-60 backdrop-blur-sm",
          "flex-1 "
        )}
      >
        {Content}
      </div>
    </div>
  );
}
