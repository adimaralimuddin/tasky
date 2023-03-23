import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { DBURL } from "../../lib/public";
import { CategoryType, LevelType } from "../app/appSlice";
import useServerState from "../dateState/useServerState";
import { CardTypes } from "./CardType";

function useCardsByFields(args: Args) {
  const { folders } = useServerState();

  const cards_ = folders?.reduce<CardTypes[]>((cards, fol) => {
    fol.Topic?.map((t) => {
      t?.cards?.map((c) => {
        cards?.push(c);
      });
    });
    return cards;
  }, []);

  const filteredCards = cards_?.filter((c) => c[args.field] == args.value);

  const cards = useQuery(
    ["cardsbyfields", args],
    () => cardsByFieldsApi(args),
    {
      initialData: filteredCards,
      onSuccess(gotCards) {},
    }
  );
  return {
    ...cards,
  };
}

export default useCardsByFields;

type Args = {
  field: "level" | "category";
  value: LevelType | CategoryType;
  classId: string;
};
const cardsByFieldsApi = async (args: Args): Promise<CardTypes[]> => {
  const q = gql`
    query CardsByField($classId: String!, $field: String!, $value: String!) {
      cardsByField(classId: $classId, field: $field, value: $value) {
        classId
        userId
        topicId
        sample
        name
        level
        id
        ind
        description
        category
        backs {
          viewId
          value
          type
          text
          ind
          id
          frontId
          backId
        }
        fronts {
          id
          viewId
          text
          type
          ind
          value
          frontId
          backId
        }
      }
    }
  `;

  const res = await request(DBURL, q, args);
  return res.cardsByField;
};
