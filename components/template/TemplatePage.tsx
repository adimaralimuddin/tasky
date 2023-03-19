import { UserProfile, useUser } from "@auth0/nextjs-auth0";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
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
      <div className="col_ gap-0 container max-w-4xl mx-auto flex-1 p-[3%] content-center">
        <div>
          {!user && (
            <h2 className="pt-3 text-sec">
              Login to see or create your own templates.
            </h2>
          )}
        </div>
        {user && (
          <>
            <div className="flex_ justify-end">
              <TemplateAdder myTemplates={myTemplates} />
            </div>
            <br />
            <TemplatesGroup title="my templates">
              {myTemplates?.map((template: TemplateType) => (
                <TemplateItem template={template} key={template?.id} />
              ))}
            </TemplatesGroup>
          </>
        )}
        <br />
        <TemplatesGroup title="Sample Templates">
          {sampleTemplates?.map((template: TemplateType) => (
            <TemplateItem
              template={template}
              editable={false}
              key={template?.id}
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
      <h3 className=" text-accent font-semibold pb-2 px-3">{title}</h3>
      <div className="flex_ flex-wrap gap-6">{children}</div>
    </div>
  );
}
