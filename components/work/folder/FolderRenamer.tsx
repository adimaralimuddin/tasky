import Box from "../../elements/Box";
import BtnPrime from "../../elements/BtnPrime";
import Input from "../../elements/Input";
import Modal from "../../elements/Modal";
import useFolderMutation from "../../../features/folder/useFolderMutation";

type props = {
  renaming: boolean;
  setOpen: any;
  data: { id: string; name: string };
  classId: string;
};

export default function FolderRenamer({
  renaming,
  setOpen,
  data,
  classId,
}: props) {
  const { renameFolder } = useFolderMutation(classId);

  const onRenameHandler = (e) => {
    e.preventDefault();
    const val = e.target.name?.value;
    renameFolder({ folderId: data?.id, name: val });
    setOpen(false);
  };

  return (
    <Modal open={renaming} setOpen={setOpen}>
      {(Icon: any) => (
        <Box>
          <Icon onClick={(_) => setOpen(false)} />
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
