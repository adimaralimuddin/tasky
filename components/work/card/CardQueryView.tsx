import { useState } from "react";
import { FieldType } from "../../../features/card/CardType";
import { TemplateType } from "../../../features/template/templateType";
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
    side: "fronts" | "backs" = "fronts",
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
        className="flex hover:shadow-lg cursor-pointer hover:-translate-y-[2px]d items-center px-2 gap-1 ring-1 ring-slate-300 dark:ring-slate-500 rounded-lg transition m-1 dark:bg-slate-600"
        title="view"
        onClick={(_) => setOpen((p) => !p)}
      >
        <ViewIcon className="text-2xl text-slate-600 dark:text-slate-300 " />{" "}
        view
      </div>
      {open && (
        <div className="relative z-50">
          <div className="absolute top-0 right-0 z-20">
            <Box css="z-20 shadow-xl ring-1 ring-slate-200 pr-3 dark:bg-slate-600 dark:shadow-2xl">
              <SelectSimple
                text="Font size"
                onInput={(e: any) => setTextSize(e.target.value)}
                defaultValue={work.textSize}
                value={work.textSize}
              >
                <option value="">normal</option>
                <option value="text-sm">small</option>
                <option value="text-xl">large</option>
              </SelectSimple>
              <SelectSimple
                text="Image size"
                onInput={(e: any) => setImageSize(e.target.value)}
                defaultValue={work?.imageSize}
              >
                <option value={150}>normal</option>
                <option value={100}>small</option>
                <option value={200}>large</option>
              </SelectSimple>
              <div className="py-2 text-slate-500">
                <Input
                  text="lebel"
                  onInput={(e: any) => setViewLebel(e.target.checked)}
                  defaultChecked={work.viewLebel}
                  type="checkbox"
                />
                <Input
                  text="level"
                  defaultChecked={work.viewLevel}
                  onInput={(e: any) => setViewLevel(e.target.checked)}
                  type="checkbox"
                />

                <Input
                  text="category"
                  defaultChecked={work.viewCategory}
                  onInput={(e: any) => setviewCategory(e.target.checked)}
                  type="checkbox"
                />
              </div>
              <p>View Fronts</p>
              <div className="ring-1 ring-slate-200 rounded-lg mx-1 py-1d text-slate-500">
                {work?.fronts?.map((f: any) => (
                  <Input
                    onInput={(e: any) =>
                      setView(e.target.checked, f, "fronts", setFronts)
                    }
                    text={f?.text}
                    type="checkbox"
                    defaultChecked={f?.view}
                    key={"" + f?.text + f?.type}
                  />
                ))}
              </div>
              <p>View Backs</p>
              <div className="ring-1 ring-slate-200 rounded-lg mx-1 py-1d text-slate-500">
                {work?.backs?.map((f: any) => (
                  <Input
                    onInput={(e: any) =>
                      setView(e.target.checked, f, "backs", setBacks)
                    }
                    text={f?.text}
                    type="checkbox"
                    key={"" + f?.text + f?.type}
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

export function templateFields(template: { data: TemplateType }) {
  if (!template?.data) return;
  const fronts = JSON?.parse(template?.data?.fronts)?.map((f: FieldType) => ({
    ...f,
    view: true,
  }));
  const backs = JSON?.parse(template?.data?.backs)?.map((f: FieldType) => ({
    ...f,
    view: true,
  }));
  return {
    fronts,
    backs,
  };
}
