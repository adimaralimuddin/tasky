import { Source } from "graphql";
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
        " cursor-pointer mr-auto rounded-md ring-1d ring-slate-300d flex min-w-[100px] " +
        divCss
      }
    >
      <Image
        onClick={(_) => imageViewer && setOpen((p) => !p)}
        className={" " + css}
        src={checkSrcType() || "/img/image.png"}
        objectFit="contain"
        width={width}
        height={height}
        alt=""
      />

      <Modal className=" h-[90vh] w-[90vw] p-0 " open={open} setOpen={setOpen}>
        {(closePop) => (
          <div className=" shadow-xl relative  h-full m-0 ">
            {checkSrcType() ? (
              <Image
                className=" rounded-xl"
                onClick={(_) => setOpen(false)}
                src={src}
                layout="fill"
                objectFit="contain"
                width={"100%"}
                height={"100%"}
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
