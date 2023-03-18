import Link from "next/link";
import React, { useState } from "react";
import AppLogo from "../elements/AppLogo";
import DarkMode_ from "../elements/DarkMode";
import UserHeaderPop from "../elements/UserHeaderPop";
import HomeElement0 from "./HomeElement0";
import HomeElement1 from "./HomeElement1";
import HomeElement2 from "./HomeElement2";
import HomeElement3 from "./HomeElement3";
import HomeHeroSection from "./HomeHeroSection";

function PageMainHome({ defClass: _ }: { defClass: string }) {
  const defClass = "clf578ifn2517esu9bxr9d8yj";
  return (
    <div className="flex flex-col  min-h-screen bg-whited bg-[#F9FBFF] dark:bg-slate-800 overflow-x-hidden ">
      <header className="flex_ justify-between  max-w-6xl container w-full mx-auto p-2 z-[800]">
        <AppLogo className="text-[1.5rem] " />
        <nav className="flex_ dark:text-slate-300 px-6">
          <Link href="/case-study">
            <h3 className="text-[1.1rem] font-semibold cursor-pointer hover:text-indigo-400 dark:hover:text-pink-300">
              Case Study
            </h3>
          </Link>
          {/* <h3 className="text-[1rem] font-semibold">EXPLORE</h3> */}
          <UserHeaderPop />
          <DarkMode_ />
        </nav>
      </header>
      <div className="container max-w-6xl mx-auto w-full">
        <HomeHeroSection defClass={defClass} />
      </div>
    </div>
  );
}

export default PageMainHome;

// function A({ z = "30" }) {
//   const [flip, setFlip] = useState(false);

//   const playAudio = () => {
//     const au = new Audio("./hola.mp3");
//     if (flip) {
//       au.src = "./hello.mp3";
//     } else {
//       au.src = "./hola.mp3";
//     }
//     au?.play();
//   };
//   return (
//     <div
//       className={`
//   bg-slate-50
//   dark:bg-slate-700
//     fixed
//     blur-smd
//     opacity-30
//   p-5 rounded-xl shadow-sm skew-x-12d skew-y-12d
//   rotate-[30deg]
//   scale-75d
//   z-${z}
//   top-[30%] right-[20%]
//   hover:z-50
//   hover:skew-x-0d hover:skew-y-0d
//   hover:rotate-0
//   hover:shadow-2xl
//   hover:right-[30%]
//   hover:top-[20%]
//   hover:scale-100
//   hover:opacity-100
//   blur-smf
//   hover:blur-none
//   transition-all
//   duration-500
//   text-3xl
//   `}
//     >
//       <p className="text-center dark:text-white">1/2</p>
//       <Box css="p-3 ">
//         {!flip && (
//           <div className={""}>
//             <p>spanish : hola</p>
//             <p className="flex gap-2 items-center ">
//               audio:
//               <Sound
//                 onClick={playAudio}
//                 className="cursor-pointer text-4xl hover:scale-110 transition"
//               />
//             </p>
//           </div>
//         )}
//         {flip && (
//           <div className={""}>
//             <p>english : hello</p>
//             <p className="flex gap-2 items-center">
//               audio:{" "}
//               <Sound
//                 onClick={playAudio}
//                 className="cursor-pointer text-4xl hover:scale-110 transition"
//               />
//             </p>
//           </div>
//         )}
//       </Box>
//       <div className="flex items-center gap-2 ">
//         <BtnPrime css="p-2 px-5 flex-1" onClick={() => setFlip((p) => !p)}>
//           {flip ? "flip" : "flip"}
//         </BtnPrime>

//         <BtnSec css="p-2 px-5 flex-1">Quiz</BtnSec>
//       </div>
//     </div>
//   );
// }
