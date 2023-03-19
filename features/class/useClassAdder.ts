import { useUser } from "@auth0/nextjs-auth0";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { nanoid } from "nanoid";
import { ClassLimit } from "../../lib/public";
import { ClassUrl } from "./classApi";
import { ClassCreateType, ClassType } from "./classTypes";

export default function useClassAdder() {
  const { user } = useUser();
  const client = useQueryClient();

  const checkIfReachedMaxLimit = () => {
    const classes = client.getQueryData(["classes", user?.sub]) as ClassType[];
    return classes?.length >= ClassLimit ? true : false;
  };

  const classAdder = useMutation(classApiCreateClass, {
    onMutate(classPayload) {
      // Ui check if user had reach the limit to create more class
      if (checkIfReachedMaxLimit()) {
        console.log(`Validate:
        @useCardAdder
        msg: you have reach the limit to create class!`);
        alert(
          `i am limiting the creation of classes to only five for security reason!
          every entity will be limited accordingly. 
          `
        );
        return null;
      }
      try {
        //   return classPayload if user is allowed to create more class
        client.setQueryData(["classes", user?.sub], (classes: any) => {
          const newClass = { ...classPayload, preview: true };
          if (!classes || !classes?.length) return [newClass];
          return [...classes, newClass];
        });
      } catch (err) {
        console.log(
          `
        Error:
        @useClassAdder/onMutate
        msg: `,
          err
        );
      }
    },
    onSuccess(addedClass) {
      try {
        client.setQueryData(["classes", user?.sub], (classes: any) => {
          if (classes?.length) {
            return classes.map((c: ClassType) => {
              if (c?.id === addedClass?.id) {
                return addedClass;
              }
              return c;
            });
          }
          return [addedClass];
        });
      } catch (error) {
        console.log(
          `Error:
        @useClassAdder/onSuccess/setQueryData
        msg: `,
          error
        );
      }
    },
    onError(err) {
      console.log(
        `Error:
      @useClassAdder/onError
      msg: `,
        err
      );
    },
  });

  const addClass = (data: { name: string; description: string }) => {
    classAdder.mutate({ userId: user?.sub, ...data, id: nanoid() });
  };

  return {
    ...classAdder,
    addClass,
    checkLimit: checkIfReachedMaxLimit,
  };
}

export const classApiCreateClass = async (args: ClassCreateType) => {
  const q = gql`
    mutation Mutation(
      $id: String!
      $name: String!
      $userId: String
      $description: String
    ) {
      createClass(
        id: $id
        name: $name
        userId: $userId
        description: $description
      ) {
        description
        id
        name
        sample
        userId
      }
    }
  `;
  const ret = await request(ClassUrl, q, args);

  return ret?.createClass;
};
