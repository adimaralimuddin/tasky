import { useState } from "react";
import { FieldType } from "../../../features/card/CardType";
import { TemplateType } from "../../../features/template/templateType";
import useWork from "../../../features/work/useWork";
import { ViewIcon } from "../../../lib/icons";
import Box from "../../elements/Box";
import Input from "../../elements/Input";
import Select from "../../elements/Select";
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
        className="flex hover:text-indigo-400 cursor-pointer items-center px-2 gap-1  rounded-lg transition  dark:bg-slate-600 "
        title="view"
        onClick={(_) => setOpen((p) => !p)}
      >
        <ViewIcon className="text-xl" />
        view
      </div>
      {open && (
        <div className="relative z-50">
          <div className="absolute top-0 right-0 z-20">
            <Box css="z-20 shadow-xl ring-1 ring-slate-200 pr-3 dark:bg-slate-600 dark:shadow-2xl gap-2 flex flex-col">
              <p className="text-center text-sm py-2 text-slate-500">
                Fields Sizes
              </p>
              <Select
                text="Font Size"
                onInput={setTextSize}
                options={[
                  ["normal", ""],
                  ["small", "text-sm"],
                  ["large", "text-xl"],
                ]}
              />
              <Select
                text="Image Size"
                onInput={setImageSize}
                options={[
                  ["normal", 110],
                  ["small", 80],
                  ["large", 150],
                  ["xl", 180],
                ]}
              />

              <div className="py-1  text-slate-500">
                <Divider>Show Fields</Divider>
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
              <div className="py-1">
                <Divider>View Fronts</Divider>
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
              <div className="py-1">
                <Divider>View Backs</Divider>

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

const Divider = (props: any) => {
  return (
    <>
      <hr />
      <p
        className={
          "text-center text-sm pt-2 text-slate-500 " + props?.className
        }
      >
        {props?.children}
      </p>
    </>
  );
};
