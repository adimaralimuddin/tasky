import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { ClassUrl } from "./classApi";

export default function useSampleClasses() {
  const sampleClasses = useQuery(["sampleClasses"], classApiSampleClass);
  return { ...sampleClasses };
}

export const classApiSampleClass = async () => {
  const q = gql`
    query SampleClasses {
      sampleClasses {
        id
        name
        userId
        description
      }
    }
  `;
  const res = await request(ClassUrl, q);
  return res?.sampleClasses;
};
