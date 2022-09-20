import request, { gql } from "graphql-request";
const url = "http://localhost:3000/api/graphql";

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

export async function templateApiTemplates({ userId }: { userId: string }) {
  const q = gql`
    query Templates($userId: String!) {
      templates(userId: $userId) {
        name
        id
        fronts
        backs
      }
    }
  `;
  const ret = await request(url, q, { userId });
  return ret.templates;
}

export async function templateApiTemplate(templateId: string) {
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

export async function templateApiDeleteTemplate(templateId: string) {
  const q = gql`
    mutation DeleteTemplate($templateId: String!) {
      deleteTemplate(templateId: $templateId) {
        id
        name
        userId
        fronts
        backs
      }
    }
  `;
  const ret = await request(url, q, { templateId });
  return ret?.deleteTemplate;
}

export async function templateApiUpdateTemplate({
  id,
  name,
  fronts,
  backs,
}: {
  id: string;
  name: string;
  fronts: any[];
  backs: any[];
}) {
  console.log("pre ", { id, name, fronts, backs });
  const q = gql`
    mutation UpdateTemplate(
      $id: String!
      $name: String!
      $fronts: [FieldListInputType]
      $backs: [FieldListInputType]
    ) {
      updateTemplate(id: $id, name: $name, fronts: $fronts, backs: $backs) {
        id
        name
        userId
        fronts
        backs
      }
    }
  `;

  const ret = await request(url, q, { id, name, fronts, backs });
  console.log("success ", ret);
  return ret.updateTemplate;
}
