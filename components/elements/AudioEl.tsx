import { useRef, useState } from "react";
import { Sound, Wave } from "../../lib/icons";

export default function AudioElement({ src, ...props }: any) {
  const ref = useRef<any>();
  const [isPlay, setIsPlay] = useState(false);

  const checkSrc = () =>
    src && typeof src === "string" && src.includes("/") ? src : undefined;

  return checkSrc() ? (
    <div
      onClick={(e) => {
        const au: any = ref.current;
        if (au?.paused) {
          au?.play();
        } else {
          au?.pause();
          au.currentTime = 30;
        }
      }}
      className={
        "p-1 cursor-pointer flex items-center justify-center shadow-md rounded-full ring-1 aspect-square mx-auto transition hover:shadow-lg ring-slate-200 " +
        (isPlay && "animate-spin shadow-none")
      }
    >
      {!isPlay && <Sound className="text-xl" />}
      {isPlay && <Wave className="text-xl" />}
      <audio
        ref={ref}
        src={src}
        onPlay={(_) => setIsPlay(true)}
        onEnded={(_) => setIsPlay(false)}
        onPause={(_) => setIsPlay(false)}
      ></audio>
    </div>
  ) : (
    <div
      title={String(src)}
      className="ring-1 ring-pink-500 dark:ring-orange-500 px-2 rounded-xl max-w-[50px] max-h-[27px] overflow-hidden"
    >
      <small>{String(src)}</small>
    </div>
  );
}
