import Image from "next/image";
import React, { useState } from "react";
import Modal from "./Modal";

export default function ImageItem({
  css,
  divCss,
  src,
  width = 130,
  height = 130,
  imageViewer,
}: any) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={
        " cursor-pointer mr-auto rounded-md ring-1 ring-slate-300 flex " +
        divCss
      }
    >
      <Image
        onClick={(_) => imageViewer && setOpen((p) => !p)}
        className={" " + css}
        src={src ? src : "/img/image.png"}
        width={width}
        height={height}
      />

      <Modal open={open} setOpen={setOpen}>
        {(Icon) => (
          <div className=" shadow-xl relative w-4/5 p-10d h-4/5">
            <Icon />
            <Image
              className="w-full rounded-xl"
              onClick={(_) => setOpen(false)}
              src={src}
              layout="fill"
              width={200}
              height={200}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
