import React, { useState } from "react";
import { BsLayoutSidebar } from "react-icons/bs";
import { VscSettings } from "react-icons/vsc";
import usePlay from "../../../features/play/usePlay";
import Select from "../../elements/Select";
import Toggle from "../../elements/Toggle";

function PlayOptions() {
  const [open, setOpen] = useState(false);
  const { muted, side, setMuted, setSide } = usePlay();
  return (
    <div>
      <p
        onClick={() => setOpen((p) => !p)}
        className="cursor-pointer select-none flex_ text-prime font-normal"
      >
        <VscSettings className="text-lg" />
        play options
      </p>
      {open && (
        <span className="relative">
          <div className="card-all absolute top-3 col_ animate-pop">
            <section className="col_">
              <Toggle
                value={muted}
                onToggle={setMuted}
                text="sound"
                className="justify-between"
                defaultValue={muted}
              />
              <Select
                onInput={setSide}
                value={[side]}
                defaultValue={[side]}
                text="starting side"
                options={[
                  ["fronts", "fronts"],
                  ["backs", "backs"],
                ]}
              />
            </section>
          </div>
        </span>
      )}
    </div>
  );
}

export default PlayOptions;
