import React from "react";
import { TopicType } from "../../../features/topic/topicType";
import useTopic from "../../../features/topic/useTopic";
import Box from "../../elements/Box";
import BtnPrime from "../../elements/BtnPrime";
import Input from "../../elements/Input";
import Modal from "../../elements/Modal";

type props = {
  open: boolean;
  setOpen: any;
  data: TopicType;
};

function TopicRenamer({ open, setOpen, data }: props) {
  const { renameTopic } = useTopic(data?.folderId);
  const onSaveHandler = (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    if (data?.sample) {
      alert(
        "sample topic will not be renamed. you can always create, edit and delete your own topic"
      );
      return setOpen(false);
    }
    renameTopic({ name, topicId: data?.id });
    setOpen(false);
  };

  return (
    <div>
      <Modal open={open} setOpen={setOpen}>
        {(Icon: any) => (
          <Box>
            <Icon />
            <form onSubmit={onSaveHandler}>
              <Input
                onLoad={(e) => e.target?.select()}
                autoFocus
                autoSelect
                defaultValue={data?.name}
                text="name"
              />
              <BtnPrime type="submit">save</BtnPrime>
            </form>
          </Box>
        )}
      </Modal>
    </div>
  );
}

export default TopicRenamer;
