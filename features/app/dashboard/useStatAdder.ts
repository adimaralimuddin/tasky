import { useUser } from "@auth0/nextjs-auth0";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { DBURL } from "../../../lib/public";
import _useCategoryValue from "../../../lib/utils/_useCategoryValue";
import _usePercentage from "../../../lib/utils/_usePercentage";
import { CardTypes } from "../../card/CardType";
import useDashboard from "../../card/useDashboard";
import useServerState from "../../dateState/useServerState";
import { LevelType } from "../appSlice";
import { StatsType } from "./StatTypes";

function useStatAdder() {
  const { class_ } = useServerState();
  const { user } = useUser();
  const client = useQueryClient();

  const statAdder = useMutation(addStatApi);
  const { dashboard, getTotal } = useDashboard();

  const addStat = async (cards: CardTypes[]) => {
    const classId = class_?.id;
    if (!classId) return console.log(`usePlayFinish: finishPlay no classId.`);

    const time = new Date(Date.now()).toLocaleDateString();
    const total = getTotal();
    const { data: dashboardData } = await dashboard.refetch();

    const reducedCards = (level: LevelType) =>
      dashboardData?.find((d) => d.level === level)?._count.id || 0;

    const easyCards = reducedCards("easy");
    const normalCards = reducedCards("normal");
    const hardCards = reducedCards("hard");

    const easy = _usePercentage(easyCards, total);
    const normal = _usePercentage(normalCards, total);
    const hard = _usePercentage(hardCards, total);

    const data: StatsType = {
      time,
      classId,
      easy,
      normal,
      hard,
      easyCards: new Array(easyCards).fill(""),
      normalCards: new Array(normalCards).fill(""),
      hardCards: new Array(hardCards).fill(""),
      // easy: _usePercentage(easyCards?.length, cards?.length),
      // normal: _usePercentage(normalCards?.length, cards?.length),
      // hard: _usePercentage(hardCards?.length, cards?.length),
      // easyCards: easyCards.map((c) => c?.id),
      // normalCards: normalCards.map((c) => c?.id),
      // hardCards: hardCards.map((c) => c?.id),
    };

    statAdder.mutate(data, {
      onSuccess(statAdded) {
        client.invalidateQueries(["dashboard", classId]);
        client.invalidateQueries(["stats", classId]);
      },
      onError(error) {
        console.log(
          `Error: 
        @useStatAdder/statAddermutate 
        msg: `,
          error
        );
      },
    });
  };
  return { addStat };
}

export default useStatAdder;

const addStatApi = async (data: StatsType) => {
  const q = gql`
    mutation CreateFieldFront(
      $time: String!
      $classId: String!
      $easy: Int!
      $normal: Int!
      $hard: Int!
      $hardCards: [String]
      $normalCards: [String]
      $easyCards: [String]
    ) {
      addStat(
        time: $time
        classId: $classId
        easy: $easy
        normal: $normal
        hard: $hard
        hardCards: $hardCards
        normalCards: $normalCards
        easyCards: $easyCards
      ) {
        normalCards
        normal
        time
        hardCards
        hard
        easyCards
        easy
        classId
      }
    }
  `;

  const res = await request(DBURL, q, data);
  return res?.addStat;
};
