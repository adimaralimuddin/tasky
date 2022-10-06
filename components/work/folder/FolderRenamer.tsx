import Box from "../../elements/Box";
import BtnPrime from "../../elements/BtnPrime";
import Input from "../../elements/Input";
import Modal from "../../elements/Modal";
import useFolderMutation from "../../../features/folder/useFolderMutation";
import { FolderType } from "./folderTypes";

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
  const { renameFolder } = useFolderMutation(classId);

  const onRenameHandler = (e: any) => {
    e.preventDefault();
    const val = e.target.name?.value;
    if (data?.sample) {
      return alert(
        "sample folder will not be renamed. you can always create, rename and delete your own folder."
      );
    }
    renameFolder({ folderId: data?.id, name: val });
    setOpen(false);
  };

  return (
    <Modal open={renaming} setOpen={setOpen}>
      {(Icon: any) => (
        <Box>
          <Icon onClick={() => setOpen(false)} />
          <h2>Rename folder</h2>
          <form onSubmit={onRenameHandler}>
            <Input
              text="name"
              inputClass=""
              autoFocus
              defaultValue={data?.name}
              placeHolder={data?.name}
            />
            <BtnPrime type="submit">save</BtnPrime>
          </form>
        </Box>
      )}
    </Modal>
  );
}
