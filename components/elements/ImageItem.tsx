import Image from "next/image";
import React, { useState } from "react";
import Modal from "./Modal";

export default function ImageItem({
  css,
  divCss,
  src,
  width = 100,
  height = 100,
  imageViewer,
}: any) {
  const [open, setOpen] = useState(false);
  const checkSrcType = () =>
    src && typeof src === "string" && src.includes("/") ? src : undefined;
  return (
    <div
      className={
        " cursor-pointer mr-auto rounded-md ring-1 ring-slate-300 flex min-w-[100px] " +
        divCss
      }
    >
      <Image
        onClick={(_) => imageViewer && setOpen((p) => !p)}
        className={" " + css}
        src={checkSrcType() || "/img/image.png"}
        width={width}
        height={height}
        alt=""
      />

      <Modal open={open} setOpen={setOpen}>
        {(Icon: any) => (
          <div className=" shadow-xl relative w-4/5 p-10d h-4/5">
            <Icon />
            {checkSrcType() ? (
              <Image
                className="w-full rounded-xl"
                onClick={(_) => setOpen(false)}
                src={src}
                layout="fill"
                width={200}
                height={200}
                alt=""
              />
            ) : (
              <div>
                <p>image source is not a valid image url.</p>
                <small>
                  you might have changed the field type of this field's
                  template.
                </small>
                <div title={src} className="py-3">
                  <p>image source: {src}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
