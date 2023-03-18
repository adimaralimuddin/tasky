import { useState } from "react";
import { GoSettings } from "react-icons/go";
import { MdOutlineAppRegistration } from "react-icons/md";
import useFieldsGetter from "../../../features/app/fields/useFieldsGetter";
import useFieldsSetter from "../../../features/app/fields/useFieldsSetter";
import { FieldType } from "../../../features/card/CardType";
import { ViewIcon } from "../../../lib/icons";
import Divider from "../../elements/Divider";
import Popy from "../../elements/Popy";
import CardEditormodeToggler from "../card/cardEditor/CardEditormodeToggler";
import ViewerFieldsSides from "./ViewerFieldsSides";
import ViewerFieldSizes from "./ViewerFieldsSizes";
import ViewerFieldsVisibilities from "./ViewerFieldsVisibilities";
import ViewerOtherOptionsA from "./ViewerOtherOptionsA";

export default function CardQueryView({ right = true }: { right?: boolean }) {
  const [open, setOpen] = useState(false);

  const { getFields } = useFieldsGetter();
  const [tab, setTab] = useState<0 | 1>(0);
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
    <div className={"" + (open && " z-[200] ")}>
      <Popy
        open={open}
        setOpen={setOpen}
        header={
          <div
            className={
              "flex text-prime bg-white bg-sec shadow-sm select-none cursor-pointer items-center px-2 py-[.2rem] gap-1  rounded-lg transition  " +
              (open && " ring-2 ring-slate-300 dark:ring-[#606f9a] ")
            }
            title="card's field viewer"
            onClick={(_) => setOpen((p) => !p)}
          >
            <ViewIcon className="text-xl" />
            view
          </div>
        }
      >
        <div
          style={{
            left: right ? "" : 2,
            right: right ? -80 : "",
          }}
          className="card-all col_ absolute z-[200]"
        >
          <header className="flex_ text-xl text-slate-500">
            <IconTab onClick={() => setTab(0)} active={tab === 0}>
              <GoSettings />
            </IconTab>
            <IconTab onClick={() => setTab(1)} active={tab === 1}>
              <MdOutlineAppRegistration />
            </IconTab>
          </header>
          {tab === 0 && (
            <section>
              <div className="flex flex-col flex-1 gap-3 ">
                <ViewerFieldSizes />
                <Divider />
                <ViewerFieldsVisibilities />
                <Divider />
                <ViewerOtherOptionsA />
                <CardEditormodeToggler />
              </div>
            </section>
          )}

          {tab == 1 && (
            <div className="flex-[2] flex flex-col min-w-[200px]">
              <p className="pb-1 text-[.9rem] text-center text-accent">
                Properties Visibility.
              </p>
              <div className="grid grid-cols-1">
                <ViewerFieldsSides
                  side="fronts"
                  fields={fields.fronts}
                  setSides={setFronts}
                  setView={setView}
                />
                <ViewerFieldsSides
                  side="backs"
                  fields={fields.backs}
                  setSides={setBacks}
                  setView={setView}
                />
              </div>
            </div>
          )}
          {/* <CardEditormodeToggler /> */}
        </div>
      </Popy>
    </div>
  );
}

const IconTab = ({
  children,
  active,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: any;
}) => {
  return (
    <div
      onClick={onClick}
      className={
        "cursor-pointer text-xl hover:text-primary hover:scale-[1.05] p-1 text-sec " +
        (active &&
          " text-primary-light dark:text-slate-200 bg-indigo-50 bg-sec  rounded-md  ")
      }
    >
      {children && children}
    </div>
  );
};
