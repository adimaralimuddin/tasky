import { useUser } from "@auth0/nextjs-auth0";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  classApiCreateClass,
  classApiSampleClass,
  classApiUserClass,
} from "../features/class/classApi";

export default function useClassHooks() {
  const { user } = useUser();
  const qClient = useQueryClient();

  const classes = useQuery(["classes", user], () =>
    classApiUserClass(user?.sub)
  );

  const sampleClasses = useQuery(["sampleClasses"], classApiSampleClass);

  const classAdder = useMutation(classApiCreateClass, {
    onSuccess: (addedClass) => {
      qClient.setQueryData(["classes", user], (classes: any) => {
        return [...classes, addedClass];
      });
    },
  });

  return {
    classAdder,
    addClass: classAdder.mutate,
    classes,
    sampleClasses,
  };
}
