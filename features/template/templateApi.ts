import request, { gql } from "graphql-request";
import { TemplateType } from "./templateType";
const url = "/api/graphql";

export async function templateApiCreate(data: {
  name: string;
  userId: string;
  fronts: string;
  backs: string;
}) {
  const q = gql`
    mutation CreateTemplate(
      $name: String!
      $userId: String!
      $fronts: [FieldListInputType]
      $backs: [FieldListInputType]
    ) {
      createTemplate(
        name: $name
        userId: $userId
        fronts: $fronts
        backs: $backs
      ) {
        id
        name
        userId
        fronts
        backs
      }
    }
  `;
  const ret = await request(url, q, data);
  return ret.createTemplate;
}

export async function templateApiSampleTemplate(): Promise<TemplateType[]> {
  const q = gql`
    query SampleTemplates {
      sampleTemplates {
        id
        name
        userId
        deleted
        fronts
        backs
        sample
        userId
      }
    }
  `;
  const ret = await request(url, q);
  return ret?.sampleTemplates;
}

export async function templateApiTemplates({
  userId,
}: {
  userId?: string | null;
}): Promise<TemplateType[]> {
  const q = gql`
    query Templates($userId: String!) {
      templates(userId: $userId) {
        name
        id
        fronts
        backs
        sample
        userId
      }
    }
  `;
  const ret = await request(url, q, { userId });
  return ret.templates;
}

export async function templateApiTemplate(templateId?: string) {
  const q = gql`
    query Template($templateId: String!) {
      template(id: $templateId) {
        id
        name
        userId
        fronts
        backs
      }
    }
  `;
  const ret = await request(url, q, { templateId });
  return ret.template;
}
