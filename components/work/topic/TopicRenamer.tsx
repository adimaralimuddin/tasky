import React from "react";
import useTopic from "../../../features/topic/useTopic";
import useWork from "../../../features/work/useWork";
import Box from "../../elements/Box";
import BtnPrime from "../../elements/BtnPrime";
import Input from "../../elements/Input";
import Modal from "../../elements/Modal";

function TopicRenamer({ open, setOpen, data }) {
  const { renameTopic } = useTopic(data?.folderId);
  const onSaveHandler = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    await renameTopic({ name, topicId: data?.id });
    setOpen(false);
  };
  return (
    <div>
      <Modal open={open} setOpen={setOpen}>
        {(Icon: any) => (
          <Box>
            <Icon />
            <form onSubmit={onSaveHandler}>
              <Input defaultValue={data?.name} text="name" />
              <BtnPrime type="submit">save</BtnPrime>
            </form>
          </Box>
        )}
      </Modal>
    </div>
  );
}

export default TopicRenamer;
