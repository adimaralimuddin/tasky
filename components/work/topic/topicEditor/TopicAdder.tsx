import { useUser } from "@auth0/nextjs-auth0";
import React, { useState } from "react";
import { TemplateType } from "../../../../features/template/templateType";
import useTemplates from "../../../../features/template/useTemplates";
import { TopicType } from "../../../../features/topic/topicType";
import useTopic from "../../../../features/topic/useTopic";
import { DEF_USER } from "../../../../lib/public";
import Box from "../../../elements/Box";
import BtnPrime from "../../../elements/BtnPrime";
import Input from "../../../elements/Input";
import Modal from "../../../elements/Modal";
import Select from "../../../elements/Select";

export default function TopicAdder() {
  const { user } = useUser();
  const { createTopic, setOpenTopicAdder, topicAdderOpenState } = useTopic();

  const { myTemplates, sampleTemplates } = useTemplates();

  const templates = sampleTemplates?.data?.concat(myTemplates?.data || []);
  const options = templates?.map((temp: TemplateType) => [
    temp?.name,
    temp?.id,
  ]);

  const [templateId_, setTemplateId] = useState(options?.[0]?.[1]);
  const template_ =
    templates?.find((t) => t.id == templateId_) || templates?.[0];

  const onCreateHandler = (e: any) => {
    e.preventDefault();

    try {
      const formData = Object.fromEntries(new FormData(e.target));
      if (!formData?.name) return alert("you must enter a topic name");

      const templateId = templateId_ || options?.[0]?.[1];
      const template = template_;
      const name = String(formData?.name);
      const description = String(formData?.description) || "";

      const preTopicData: Partial<TopicType> = {
        templateId,
        name,
        description,
        template,
      };

      if (!templateId || !template || !name)
        return console.log("topic data missing some properties ", preTopicData);

      createTopic(preTopicData as TopicType);
    } catch (error) {
      console.log(`Error: topicAdder onCreateTopic`, error);
    }
  };

  return (
    <Modal
      open={topicAdderOpenState}
      setOpen={setOpenTopicAdder}
      css={`overflow-auto px-2`}
    >
      {(Icon: any) => (
        <Box css="p-2">
          <Icon />
          <header>
            <h2>create new topic</h2>
          </header>
          <form onSubmit={onCreateHandler}>
            topic adder -
            <Input autoFocus={true} text="name" />
            <Input text="description" />
            <Select
              onInput={(val: any) => setTemplateId(val)}
              defaultValue={options?.[0]}
              options={options || []}
              text="templateId"
            />
            <BtnPrime type="submit">create</BtnPrime>
          </form>
        </Box>
      )}
    </Modal>
  );
}
