import { useState } from "react";
import useFieldsGetter from "../../../features/app/fields/useFieldsGetter";
import useFieldsSetter from "../../../features/app/fields/useFieldsSetter";
import { FieldType } from "../../../features/card/CardType";
import useViewer from "../../../features/viewer/useViewer";
import { ViewIcon } from "../../../lib/icons";
import Box from "../../elements/Box";
import Input from "../../elements/Input";
import Select from "../../elements/Select";

export default function CardQueryView() {
  const [open, setOpen] = useState(false);

  const viewer = useViewer();

  const { getFields } = useFieldsGetter();
  const { setFronts, setBacks } = useFieldsSetter();
  const fields = getFields();

  const setView = (
    view: boolean,
    field: FieldType,
    side: "fronts" | "backs" = "fronts",
    setter: any
  ) => {
    const newView = fields?.[side]?.map((x) => {
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
        className="flex hover:text-indigo-400 cursor-pointer items-center px-2 py-[.2rem] gap-1  rounded-lg transition  dark:bg-slate-600 "
        title="card's field viewer"
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
                // value={work.textSize}
                value={viewer.textSize}
                onInput={viewer.setTextSize}
                options={[
                  ["normal", 2],
                  ["small", 1],
                  ["large", 3],
                  ["xs", "0"],
                  ["xl", 4],
                ]}
              />
              <Select
                text="Image Size"
                onInput={viewer.setImageSize}
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
                  onInput={(e: any) => viewer.setViewLebel(e.target.checked)}
                  defaultChecked={viewer.viewLebel}
                  type="checkbox"
                />
                <Input
                  text="level"
                  defaultChecked={viewer.viewLevel}
                  onInput={(e: any) => viewer.setViewLevel(e.target.checked)}
                  type="checkbox"
                />
                <Input
                  text="category"
                  defaultChecked={viewer.viewCategory}
                  onInput={(e: any) => viewer.setviewCategory(e.target.checked)}
                  type="checkbox"
                />
              </div>
              <div className="py-1">
                <Divider>View Fronts</Divider>
                {fields?.fronts?.map((f: any) => (
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

                {fields?.backs?.map((f: any) => (
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
