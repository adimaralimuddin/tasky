import { useState } from "react";
import useWork from "../../../features/work/useWork";
import { ViewIcon } from "../../../lib/icons";
import Box from "../../elements/Box";
import Input from "../../elements/Input";
import SelectSimple from "../../elements/SelectSimple";

export default function CardQueryView() {
  const [open, setOpen] = useState(false);
  const {
    work,
    setBacks,
    setFronts,
    setTextSize,
    setImageSize,
    setViewLebel,
    setViewLevel,
    setviewCategory,
  } = useWork();

  const setView = (
    view: boolean,
    field: FieldType,
    side = "fronts",
    setter: any
  ) => {
    const newView = work?.[side]?.map((x) => {
      if (x.text == field.text) {
        return { ...x, view };
      }
      return x;
    });
    setter(newView);
  };

  return (
    <div>
      <div
        className="flex hover:shadow-lg cursor-pointer hover:-translate-y-[2px]d items-center px-2 gap-1 ring-1 ring-slate-300 rounded-lg transition m-1"
        title="view"
        onClick={(_) => setOpen((p) => !p)}
      >
        <ViewIcon className="text-2xl text-slate-600 " /> view
      </div>
      {open && (
        <div className="relative">
          <div className="absolute top-0 right-0 z-20">
            <Box css="z-20 shadow-xl ring-1 ring-slate-200 pr-3">
              <SelectSimple
                text="Font size"
                onInput={(e) => setTextSize(e.target.value)}
                defaultValue={work.textSize}
                value={work.textSize}
              >
                <option value="">normal</option>
                <option value="text-sm">small</option>
                <option value="text-xl">large</option>
              </SelectSimple>
              <SelectSimple
                text="Image size"
                onInput={(e) => setImageSize(e.target.value)}
                defaultValue={work?.imageSize}
              >
                <option value={150}>normal</option>
                <option value={100}>small</option>
                <option value={200}>large</option>
              </SelectSimple>
              <div className="py-2 text-slate-500">
                <Input
                  text="lebel"
                  onInput={(e) => setViewLebel(e.target.checked)}
                  defaultChecked={work.viewLebel}
                  type="checkbox"
                />
                <Input
                  text="level"
                  defaultChecked={work.viewLevel}
                  onInput={(e) => setViewLevel(e.target.checked)}
                  type="checkbox"
                />

                <Input
                  text="category"
                  defaultChecked={work.viewCategory}
                  onInput={(e) => setviewCategory(e.target.checked)}
                  type="checkbox"
                />
              </div>
              <p>View Fronts</p>
              <div className="ring-1 ring-slate-200 rounded-lg mx-1 py-1d text-slate-500">
                {work?.fronts?.map((f) => (
                  <Input
                    onInput={(e) =>
                      setView(e.target.checked, f, "fronts", setFronts)
                    }
                    text={f?.text}
                    type="checkbox"
                    defaultChecked={f?.view}
                  />
                ))}
              </div>
              <p>View Backs</p>
              <div className="ring-1 ring-slate-200 rounded-lg mx-1 py-1d text-slate-500">
                {work?.backs?.map((f) => (
                  <Input
                    onInput={(e) =>
                      setView(e.target.checked, f, "backs", setBacks)
                    }
                    text={f?.text}
                    type="checkbox"
                    defaultChecked={f?.view}
                  />
                ))}
              </div>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
}

export function templateFields(template) {
  if (!template?.data) return;
  const fronts = JSON?.parse(template?.data?.fronts)?.map((f) => ({
    ...f,
    view: true,
  }));
  const backs = JSON?.parse(template?.data?.backs)?.map((f) => ({
    ...f,
    view: true,
  }));
  return {
    fronts,
    backs,
  };
}
