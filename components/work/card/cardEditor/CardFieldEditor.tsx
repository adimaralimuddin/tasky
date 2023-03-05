import { CardTypes, FieldType } from "../../../../features/card/CardType";
import Input from "../../../elements/Input";

type Side = "front" | "back";

export default function CardFieldEditor({
  data,
  setter,
  view,
  card,
  side,
}: {
  data: FieldType;
  setter: any;
  view: FieldType;
  card: CardTypes;
  side: Side;
}) {
  const onInputHandler = (value: string | File | undefined) => {
    setter((p: FieldType[]) => {
      const n = p?.map((f) => {
        if (f.id == data?.id) {
          return { ...f, type: view.type, text: view.text, newValue: value };
        }
        return f;
      });
      return n;
    });
  };

  const onReset = () => {
    const field_ = card?.[side === "front" ? "fronts" : "backs"]?.find(
      (f) => f?.id == data?.id
    );
    return field_?.value;
  };

  return (
    <div className=" p-2 relative">
      <Input
        onReset_={onReset}
        onChange_={(v: string | File | undefined) => {
          onInputHandler(v);
        }}
        defaultValue={data?.value}
        text={view?.text}
        type={view?.type || "text"}
      />
    </div>
  );
}
