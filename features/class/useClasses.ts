import { useUser } from "@auth0/nextjs-auth0";
import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { ClassUrl } from "./classApi";

export default function useClasses() {
  const { user } = useUser();
  const classes = useQuery(["classes", user?.sub], () =>
    classApiUserClass(user?.sub)
  );
  return { ...classes };
}

export const classApiUserClass = async (userId?: string | any) => {
  const q = gql`
    query Query($userId: String!) {
      userClasses(userId: $userId) {
        id
        name
        userId
        description
      }
    }
  `;
  const res = await request(ClassUrl, q, { userId });
  return res?.userClasses;
};
