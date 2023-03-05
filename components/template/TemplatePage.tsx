import { UserProfile, useUser } from "@auth0/nextjs-auth0";
import { useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useEffect } from "react";
import { TemplateType } from "../../features/template/templateType";
import useTemplates from "../../features/template/useTemplates";
import LayoutMainHeader from "../layouts/LayoutMainHeader";
import TemplateItem from "./TemplateItem";

export interface TemplatesProps {
  myServerTemplates: TemplateType[];
  sampleServerTemplates: TemplateType[];
  user: UserProfile;
}

const TemplateAdder = dynamic(() => import("./templateEditor/TemplateAdder"));

export default function TemplatePage(props: TemplatesProps) {
  const { user } = useUser();
  const client = useQueryClient();
  const userId = props?.user?.id || user?.sub;

  useEffect(() => {
    // client.setQueryData(["templates", userId], () => {
    //   return props.myServerTemplates;
    // });
    // client.setQueryData(["sampleTemplates"], () => {
    //   return props.sampleServerTemplates;
    // });
  }, [props]);

  const queryTemplates = useTemplates();
  const myTemplates =
    queryTemplates?.myTemplatesData || props.myServerTemplates;
  const sampleTemplates =
    queryTemplates?.sampleTemplatesData || props.sampleServerTemplates;

  return (
    <div>
      <Head>
        <title>templates</title>
      </Head>
      <LayoutMainHeader />
      <div className="col_ gap-0 container max-w-4xl mx-auto flex-1 py-[3%]">
        <div className="flex_ justify-end">
          <TemplateAdder />
        </div>
        <br />
        <TemplatesGroup title="my templates">
          {myTemplates?.map((template: TemplateType) => (
            <TemplateItem template={template} key={template.id} />
          ))}
        </TemplatesGroup>
        <br />
        <TemplatesGroup title="Sample Templates">
          {sampleTemplates?.map((template: TemplateType) => (
            <TemplateItem
              template={template}
              editable={false}
              key={template.id}
            />
          ))}
        </TemplatesGroup>
      </div>
    </div>
  );
}

function TemplatesGroup({
  children,
  title,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <h4 className=" text-sec pb-2 px-3">{title}</h4>
      <div className="flex_ flex-wrap gap-6">{children}</div>
    </div>
  );
}
