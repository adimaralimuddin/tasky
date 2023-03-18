import { FolderType } from "../../../../features/folder/folderTypes";
import useFolderRenamer from "../../../../features/folder/useFolderRenamer";
import Input from "../../../elements/Input";
import Modal from "../../../elements/Modal";

type props = {
  renaming: boolean;
  setOpen: any;
  data: FolderType;
  classId: string;
};

export default function FolderRenamer({
  renaming,
  setOpen,
  data,
  classId,
}: props) {
  const { renameFolder } = useFolderRenamer(classId);

  // console.log(`folder`, data);

  const onRenameHandler = (e: any) => {
    const val = e.target.name?.value;
    if (data?.sample) {
      alert(
        "sample folder will not be renamed. you can always create, rename and delete your own folder."
      );
      return;
    }

    renameFolder({
      folderId: data?.id,
      classId: data.classId,
      name: val,
    });
  };

  return (
    <Modal className="max-w-md" open={renaming} setOpen={setOpen}>
      {(closePop) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            closePop(() => {
              onRenameHandler(e);
            });
          }}
        >
          <h3 className="text-sec">Rename folder</h3>
          <Input
            text="name"
            inputClass=""
            autoFocus
            defaultValue={data?.name}
            placeHolder={data?.name}
            onReset_={() => data?.name}
          />
          <button className="btn-prime" type="submit">
            save
          </button>
        </form>
      )}
    </Modal>
  );
}
