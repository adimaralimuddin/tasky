import Link from "next/link";
import React, { useState } from "react";
import { Mp3, Sound, Wave } from "../../lib/icons";
import Box from "../elements/Box";
import BtnPrime from "../elements/BtnPrime";
import BtnSec from "../elements/BtnSec";
import LayoutMainHeader from "../layouts/LayoutMainHeader";

function PageMainHome() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <LayoutMainHeader />
      <A />
      <Bubble />
      <Bubble top="10%" left="60%" color="pink-500" w="250px" />
      <Caption />
    </div>
  );
}

export default PageMainHome;

function Caption() {
  return (
    <div className="flex-1 gap-2 flex flex-col items-center justify-center z-20 backdrop-blur-sm">
      <h1 className="text-cyan-500 text-5xl font-bold drop-shadow-lg">
        Online Flash Cards{" "}
      </h1>
      <h3 className="text-3xl text-cyan-500">free</h3>
      <Link href="/class/cl86siwik1391dkjokty3u8na">
        <BtnPrime css="text-2xl rounded-full px-6 py-2">Get Started</BtnPrime>
      </Link>
    </div>
  );
}

function A({ z = "30" }) {
  const [flip, setFlip] = useState(false);
  return (
    <div
      className={`
    fixed 
      bg-slate-50 p-5 rounded-xl shadow-sm opacity-80 skew-x-12d skew-y-12d -rotate-[30deg] 
  scale-75
  z-${z}
  top-[9%] left-[5%]
  hover:skew-x-0d hover:skew-y-0d  
  hover:rotate-0
  hover:shadow-2xl
  hover:translate-x-12
  hover:-translate-y-4
  hover:scale-100
  hover:opacity-100
  blur-smf
  hover:blur-none
  transition
  duration-500
  text-2xl
  `}
    >
      <p className="text-center">1/2</p>
      <Box css="p-3 ">
        {!flip && (
          <div className={""}>
            <p>spanish : hola</p>
            <p className="flex gap-2 items-center">
              audio: <Sound />
            </p>
          </div>
        )}
        {flip && (
          <div className={""}>
            <p>english : hello</p>
            <p className="flex gap-2 items-center">
              audio: <Sound />
            </p>
          </div>
        )}
      </Box>
      <div className="flex items-center gap-2 ">
        <BtnPrime onClick={() => setFlip((p) => !p)}>
          {flip ? "flip" : "flip"}
        </BtnPrime>

        <BtnSec>Quiz</BtnSec>
      </div>
    </div>
  );
}

function Bubble({
  color = "indigo-400",
  opac = 40,
  blur = "md",
  left = "50%",
  top = "50%",
  w = "200px",
}) {
  return (
    <div
      className={`
  aspect-square
  fixed rounded-full p-12
  shadow-xl
  top-[${top}]
  left-[${left}]
  w-[${w}]
  bg-${color} 
  opacity-${opac}
  blur-${blur}
  `}
    ></div>
  );
}
