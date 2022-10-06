import Link from "next/link";
import React, { useState } from "react";
import { Mp3, Sound, Wave } from "../../lib/icons";
import Box from "../elements/Box";
import BtnPrime from "../elements/BtnPrime";
import BtnSec from "../elements/BtnSec";
import LayoutMainHeader from "../layouts/LayoutMainHeader";

function PageMainHome({ defClass }: { defClass: string }) {
  console.log("def ", defClass);
  return (
    <div className="flex dark:bg-green-500d flex-col min-h-screen bg-slate-100 dark:bg-slate-800 ">
      <LayoutMainHeader />
      <A />

      <Caption defClass={defClass} />
    </div>
  );
}

export default PageMainHome;

function Caption({ defClass }: { defClass: string }) {
  return (
    <div className="m-auto gap-2 flex flex-col items-center justify-center z-20 text-center">
      <h1 className="text-cyan-500 text-5xl font-bold drop-shadow-lg">
        Online Flash Cards{" "}
      </h1>
      <h3 className="text-3xl text-cyan-500">free</h3>
      <Link href={`/class/${defClass}`}>
        <BtnPrime css="text-2xl rounded-full px-6 py-2">Get Started</BtnPrime>
      </Link>
      {/* <Link href={`/class/${process.env.NEXT_PUBLIC_DEF_CLASS}`}>
        <BtnPrime css="text-2xl rounded-full px-6 py-2">Get Started</BtnPrime>
      </Link> */}
    </div>
  );
}

function A({ z = "30" }) {
  const [flip, setFlip] = useState(false);

  const playAudio = () => {
    const au = new Audio("./hola.mp3");
    if (flip) {
      au.src = "./hello.mp3";
    } else {
      au.src = "./hola.mp3";
    }
    au?.play();
  };
  return (
    <div
      className={`
  bg-slate-50 
  dark:bg-slate-700 
    fixed 
    blur-smd
    opacity-30
  p-5 rounded-xl shadow-sm skew-x-12d skew-y-12d 
  rotate-[30deg] 
  scale-75d
  z-${z}
  top-[30%] right-[20%]
  hover:z-50
  hover:skew-x-0d hover:skew-y-0d  
  hover:rotate-0
  hover:shadow-2xl
  hover:right-[30%]
  hover:top-[20%]
  hover:scale-100
  hover:opacity-100
  blur-smf
  hover:blur-none
  transition-all
  duration-500
  text-3xl
  `}
    >
      <p className="text-center dark:text-white">1/2</p>
      <Box css="p-3 ">
        {!flip && (
          <div className={""}>
            <p>spanish : hola</p>
            <p className="flex gap-2 items-center ">
              audio:
              <Sound
                onClick={playAudio}
                className="cursor-pointer text-4xl hover:scale-110 transition"
              />
            </p>
          </div>
        )}
        {flip && (
          <div className={""}>
            <p>english : hello</p>
            <p className="flex gap-2 items-center">
              audio:{" "}
              <Sound
                onClick={playAudio}
                className="cursor-pointer text-4xl hover:scale-110 transition"
              />
            </p>
          </div>
        )}
      </Box>
      <div className="flex items-center gap-2 ">
        <BtnPrime css="p-2 px-5 flex-1" onClick={() => setFlip((p) => !p)}>
          {flip ? "flip" : "flip"}
        </BtnPrime>

        <BtnSec css="p-2 px-5 flex-1">Quiz</BtnSec>
      </div>
    </div>
  );
}
