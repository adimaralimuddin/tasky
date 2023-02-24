import { useUser } from "@auth0/nextjs-auth0";
import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { ClassUrl } from "./classApi";
import { ClassType } from "./classTypes";

export default function useClasses(initialData: ClassType[] = []) {
  const { user } = useUser();
  const classes = useQuery(
    ["classes", user?.sub],
    () => classApiUserClass(user?.sub),
    { initialData }
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
