import Link from "next/link";
import HomeElement0 from "./HomeElement0";
import HomeElement1 from "./HomeElement1";
import HomeElement2 from "./HomeElement2";
import HomeElement3 from "./HomeElement3";

export default function HomeHeroSection({ defClass }: { defClass: string }) {
  if (!defClass) return null;
  return (
    <div className="gap-2 grid grid-cols-1 sm:grid-cols-2  z-20d min-h-[75vh] ring-2d p-6 ">
      <div className="ring-1d z-30 col_ ring-d ring-green-500 self-center whitespace-nowrap ">
        <div className="  ">
          <span className="flex_ justify-center sm:justify-start">
            <h2 className="text-[#756F9B] dark:text-[#B0BCFB] text-[1.6rem]  pl-6 sm:text-[2.5rem] md:text-[3rem] leading-none font-semibold drop-shadow-lg">
              Ultra
            </h2>

            <h1 className="text-black dark:text-slate-200 text-[2rem] sm:text-[3.5rem] md:text-[4rem] leading-none font-bold drop-shadow-lg">
              Fast
            </h1>
          </span>
          <span className="flex_ items-center  justify-center sm:justify-start leading-none sm:-mt-3">
            <h1 className="text-black  dark:text-slate-200  text-[2rem] sm:text-[3.5rem]  md:text-[4rem] leading-none font-bold drop-shadow-lg">
              Flashcard
            </h1>
            <h2 className="text-[#756F9B] dark:text-[#B0BCFB] text-[1.5rem] sm:text-[2.5rem]  md:text-[3rem] leading-none font-semibold drop-shadow-lg">
              Web App
            </h2>
          </span>
          <h2 className="text-[#756F9B] dark:text-[#B0BCFB] text-center sm:text-start mt-1 sm:mt-0 sm:ml-10 md:ml-14   text-[1.4rem] sm:text-[2.3rem]  md:text-[2.8rem] leading-none font-semibold drop-shadow-lg">
            Zero Loading Time!
          </h2>
        </div>
        <div className="col_ sm:block sm:ml-10 items-center mt-3">
          <p className="text-[#756F9B] dark:text-[#B0BCFB] sm:text-[2.8rem]d leading-none font-semibold drop-shadow-lg">
            learn Fast and Effective
          </p>
          <Link href={`/class/${defClass}`}>
            <button className=" text-[1rem] max-w-[210px] sm:text-[1.2rem] font-semibold bg-[#63509A] dark:bg-[#7C60CD] text-white rounded-xl p-2 min-w-[200px]">
              Get Started
            </button>
          </Link>
        </div>
      </div>
      <HeroImages />
      <div className="w-screen bg-gray-400d h-[95vh] absolute top-0 left-0 ring-d1 overflow-hidden">
        <div
          style={{ "--rot": "-12deg", "--skew": "8deg" } as any}
          className="bgg bg-[#F5F8FF]d bg-[#E5E5FB] dark:bg-[#343A56] bottom-0 left-[130px] shadow-md shadow-[rgba(40,87,158,0.1)] shadow-slate-200d dark:shadow-[#2E314B]"
        ></div>
        <div
          style={{ "--rot": "-10deg", "--skew": "5deg" } as any}
          className="bgg bg-[#EDF2FE] bg-[#ECECFF]d dark:bg-[#2E314B]  bottom-10 left-[110px] shadow-lg shadow-[rgba(40,87,158,0.1)] shadow-[#53537636]d  dark:shadow-[#20233a53]"
        ></div>
        <div className=" bg-[#f9faff] dark:bg-[#373B5C] absolute top-[23%] left-[9%] p-8 rounded-2xl"></div>
        <div className=" bg-[#f9faff] dark:bg-[#373B5C] absolute top-[65%] left-[25%] p-8 rounded-2xl"></div>
        <div className=" bg-[#f9faff] dark:bg-[#3E4269] absolute top-[20%] right-[38%] p-10 rounded-2xl"></div>
        <div className=" bg-[#f9faff] dark:bg-[#3E4269] absolute top-[10%] right-[5%] p-12 rounded-2xl"></div>
        <div className=" bg-[#E1E8FB] dark:bg-[#3D3C66]   absolute top-[30%] right-[0%] p-12 h-[150px] rounded-2xl"></div>
        <div className=" bg-[#EDF1FD] dark:bg-[#363A54] absolute bottom-[10%] right-[10%] rotate-[-10deg] p-12 rounded-2xl"></div>
      </div>
    </div>
  );
}

function HeroImages() {
  return (
    <div className="z-10 ring-1d h-auto origin-top  mx-auto max-w-[350px]  sm:h-auto self-end ring-pink-500 relative w-full max-h-[300px] sm:max-w-[500px] aspect-square">
      <HomeElement0 />
      <HomeElement1 />
      <HomeElement2 />
      <HomeElement3 />
    </div>
  );
}
