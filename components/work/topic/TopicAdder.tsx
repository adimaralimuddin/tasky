import { useUser } from "@auth0/nextjs-auth0";
import React, { useState } from "react";
import useTemplates from "../../../features/template/useTemplates";
import useTopic from "../../../features/topic/useTopic";
import useWork from "../../../features/work/useWork";
import { DEF_USER } from "../../../lib/public";
import Box from "../../elements/Box";
import BtnPrime from "../../elements/BtnPrime";
import Input from "../../elements/Input";
import Loader from "../../elements/Loader";
import Modal from "../../elements/Modal";
import Select from "../../elements/Select";

export default function TopicAdder() {
  const { user } = useUser();
  const { templates } = useTemplates(user?.sub || DEF_USER);
  const options = templates?.data?.map((temp: any) => [temp?.name, temp?.id]);
  const [templateId, setTemplateId] = useState(options?.[0]?.[1]);
  const { work, setOpenTopicAdder } = useWork();
  const { createTopic, topicAdder } = useTopic(work?.selectedFolder);

  const onCreateHandler = (e: any) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    const topicData: any = {
      folderId: work?.selectedFolder,
      userId: user?.sub || DEF_USER,
      templateId: templateId || options?.[0]?.[1],
      ...data,
    };
    createTopic(topicData);
    setOpenTopicAdder(false);
  };

  if (topicAdder.isLoading) {
    return <Loader message="adding topic ... " open={topicAdder.isLoading} />;
  }

  return (
    <Modal open={work.openTopicAdder} setOpen={setOpenTopicAdder}>
      {(Icon: any) => (
        <Box css="p-2">
          <Icon />
          <header>
            <h2>create new topic</h2>
          </header>
          <form onSubmit={onCreateHandler}>
            <Input text="name" />
            <Input text="description" />
            <Select
              onInput={(val: any) => setTemplateId(val)}
              defaultValue={options?.[0]}
              options={options}
              text="templateId"
            />
            <BtnPrime type="submit">create</BtnPrime>
          </form>
        </Box>
      )}
    </Modal>
  );
}
