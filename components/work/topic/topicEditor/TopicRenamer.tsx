import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import { TopicType } from "../../../../features/topic/topicType";
import useTopicRenamer from "../../../../features/topic/useTopicRenamer";
import { DEF_USER } from "../../../../lib/public";
import BtnPrime from "../../../elements/BtnPrime";
import Input from "../../../elements/Input";
import Modal from "../../../elements/Modal";

type props = {
  open: boolean;
  setOpen: any;
  data: TopicType;
};

function TopicRenamer({ open, setOpen, data }: props) {
  const { renameTopic } = useTopicRenamer(data?.folderId);
  const { user } = useUser();

  const onSaveHandler = (e: any) => {
    const name = e.target.name.value;
    if (data?.sample) {
      alert(
        "sample topic will not be renamed. you can always create, edit and delete your own topic"
      );
      return;
    }

    renameTopic({
      ...data,
      userId: user?.sub || DEF_USER,
      name,
    });
  };

  return (
    <Modal className="max-w-md " open={open} setOpen={setOpen}>
      {(closePop) => (
        <form
          className="py-3"
          onSubmit={(e) => {
            e.preventDefault();
            closePop(() => {
              onSaveHandler(e);
            });
          }}
        >
          <Input
            onLoad={(e: any) => e.target?.select()}
            autoFocus
            autoSelect
            defaultValue={data?.name}
            text="name"
            onReset_={() => data?.name}
          />
          <BtnPrime type="submit">save</BtnPrime>
        </form>
      )}
    </Modal>
  );
}

export default TopicRenamer;
