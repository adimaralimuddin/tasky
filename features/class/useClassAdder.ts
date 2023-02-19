import { useUser } from "@auth0/nextjs-auth0";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { ClassType } from "../../components/class/classTypes";
import { ClassLimit, DEF_USER } from "../../lib/public";
import { ClassUrl } from "./classApi";
import { ClassCreate } from "./classTypes";

export default function useClassAdder() {
  const { user } = useUser();
  const client = useQueryClient();

  const checkLimit = () => {
    const classes = client.getQueryData(["classes", user?.sub]) as ClassType[];
    return classes?.length >= ClassLimit ? false : true;
  };

  const classAdder = useMutation(classApiCreateClass, {
    onMutate(classPayload) {
      // Ui check if user had reach the limit to create more class
      if (!checkLimit()) {
        console.log(`you have reach the limit to create class!`);
        alert("you have reach the limit to create class!");
        return null;
      }
      //   return classPayload if user is allowed to create more class
      client.setQueryData(["classes", user], (classes: any) => {
        return [...classes, classPayload];
      });
    },
    onSuccess(addedClass) {
      client.setQueryData(["classes", user], (classes: any) => {
        return classes.map((c: ClassType) => {
          if (!c.id && c?.name === addedClass?.name) {
            return addedClass;
          }
          return c;
        });
      });
    },
  });

  const addClass = (data: { name: string; description: string }) => {
    classAdder.mutate({ userId: user?.sub || DEF_USER, ...data });
  };

  return {
    ...classAdder,
    addClass,
    checkLimit,
  };
}

export const classApiCreateClass = async ({
  userId,
  name,
  description,
}: ClassCreate) => {
  const q = gql`
    mutation CreateClass(
      $name: String!
      $userId: String
      $description: String
    ) {
      createClass(name: $name, userId: $userId, description: $description) {
        id
        name
        description
      }
    }
  `;
  const ret = await request(ClassUrl, q, { userId, name, description });
  return ret?.createClass;
};
