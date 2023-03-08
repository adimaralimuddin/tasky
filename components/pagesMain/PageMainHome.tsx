import Link from "next/link";
import React, { useState } from "react";
import AppLogo from "../elements/AppLogo";

function PageMainHome({ defClass: _ }: { defClass: string }) {
  const defClass = "clejsg24f0002u93o2inbp2k2";
  return (
    <div className="flex flex-col  min-h-screen bg-whited bg-[#F9FBFF] dark:bg-slate-800 overflow-x-hidden ">
      {/* <div className="z-40">
        <LayoutMainHeader />
      </div> */}
      <header className="flex_ justify-between z-10 max-w-6xl container w-full mx-auto p-2">
        <AppLogo className="text-[1.5rem] " />
        <nav>
          <h3 className="text-[1rem] font-semibold">EXPLORE</h3>
        </nav>
      </header>
      <div className="container max-w-6xl mx-auto w-full">
        <HeroSection defClass={defClass} />
      </div>
      <div className="py-2">
        <h1 className="text-[#63509A] text-[1.6rem] text-center font-bold">
          Features
        </h1>
        <div className="flex_  justify-center p-1">
          <span className="p-1.5 rounded-md bg-[#C5D0EB] min-w-[50px]"></span>
          <span className="p-1.5 rounded-md bg-[#C5D0EB] min-w-[10px]"></span>
          <span className="p-1.5 rounded-md bg-[#C5D0EB] min-w-[10px]"></span>
          <span className="p-1.5 rounded-md bg-[#C5D0EB] min-w-[10px]"></span>
        </div>
        <div className="min-h-[500px]"></div>
      </div>
      {/* <LayoutMainHeader /> */}
      {/* <div className="container ring-1d w-full max-w-6xld mx-auto h-full flex-1 col_ gap-0 "></div> */}
    </div>
  );
}

export default PageMainHome;

function HeroSection({ defClass }: { defClass: string }) {
  if (!defClass) return null;
  return (
    <div className="gap-2 grid grid-cols-1 sm:grid-cols-2  z-20d min-h-[75vh] ring-2d p-6 ">
      <div className="ring-1d z-30 col_ ring-d ring-green-500 self-center whitespace-nowrap ">
        <div className="  ">
          <span className="flex_ justify-center sm:justify-start">
            <h2 className="text-[#756F9B] text-[1.6rem]  pl-6 sm:text-[2.5rem] md:text-[3rem] leading-none font-semibold drop-shadow-lg">
              Ultra
            </h2>

            <h1 className="text-black text-[2rem] sm:text-[3.5rem] md:text-[4rem] leading-none font-bold drop-shadow-lg">
              Fast
            </h1>
          </span>
          <span className="flex_ items-center  justify-center sm:justify-start leading-none sm:-mt-3">
            <h1 className="text-black text-[2rem] sm:text-[3.5rem]  md:text-[4rem] leading-none font-bold drop-shadow-lg">
              Flashcard
            </h1>
            <h2 className="text-[#756F9B]  text-[1.5rem] sm:text-[2.5rem]  md:text-[3rem] leading-none font-semibold drop-shadow-lg">
              Web App
            </h2>
          </span>
          <h2 className="text-[#756F9B] text-center sm:text-start mt-1 sm:mt-0 sm:ml-10 md:ml-14   text-[1.4rem] sm:text-[2.3rem]  md:text-[2.8rem] leading-none font-semibold drop-shadow-lg">
            Zero Loading Time!
          </h2>
        </div>
        <div className="col_ sm:block sm:ml-10 items-center mt-3">
          <p className="text-[#756F9B] sm:text-[2.8rem]d leading-none font-semibold drop-shadow-lg">
            learn Fast and Effective
          </p>
          <Link href={`/class/${defClass}`}>
            <button className=" text-[1rem] max-w-[210px] sm:text-[1.2rem] font-semibold bg-[#63509A] text-white rounded-xl p-2 min-w-[200px]">
              Get Started
            </button>
          </Link>
        </div>
      </div>
      <HeroImages />
      <div className="w-screen bg-gray-400d h-[95vh] absolute top-0 left-0 ring-d1 overflow-hidden">
        <div
          style={{ "--rot": "-14deg", "--skew": "10deg" } as any}
          className="bgg bg-[#F5F8FF] bottom-0 left-[130px]"
        ></div>
        <div
          style={{ "--rot": "-12deg", "--skew": "5deg" } as any}
          className="bgg bg-[#EDF2FE]  bottom-10 left-[110px]"
        ></div>
        {/* <div className="bgg  bg-[#EDF2FE] shadow-slate-200"></div> */}
      </div>
      {/* <img
        className=" absolute left-0 -top-[100px] bg-contain w-full"
        src="/homepage/homebg.svg"
        alt=""
      /> */}
    </div>
  );
}

function HeroImages() {
  return (
    <div className="z-10 ring-d1 h-auto origin-top  mx-auto max-w-[350px]  sm:h-auto self-end ring-pink-500 relative w-full max-h-[400px] sm:max-w-[500px] aspect-square">
      <img
        className="absolute max-w-[80%] bottom-[-15%] left-5  w-full hover:scale-[1.01] transition hover:drop-shadow-xl"
        src="/homepage/element0.svg"
      />
      <img
        className="absolute max-w-[55%] bottom-[10%] -left-8   w-full hover:scale-[1.01] transition hover:drop-shadow-xl"
        src="/homepage/element1.svg"
      />
      <img
        className="absolute max-w-[55%] bottom-[20%] -right-8   w-full hover:scale-[1.01] transition hover:drop-shadow-xl"
        src="/homepage/element2.svg"
      />
      <img
        className="absolute max-w-[55%] bottom-[50%] right-8   w-full hover:scale-[1.01] transition hover:drop-shadow-xl"
        src="/homepage/element3.svg"
      />
    </div>
  );
}

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
