import { useRouter } from "next/router";
import { CardTypes } from "../card/CardType";
import { TemplateType } from "../template/templateType";
import { TopicType } from "../topic/topicType";
import { CategoryType, ContentType } from "./appSlice";

function useUrlState() {
  const router = useRouter();
  const { query } = router;

  const setUrlState = ({
    pathname,
    topic,
    cards,
    template,

    ...otherQueries
  }: StateUrlType) => {

    const returnQueries: { query: StateUrlType; pathname: string } = {
      pathname: pathname || `/class/${query?.classId}`,
      query: { ...query, ...otherQueries },
    };

    if (topic) {
      returnQueries.query.topic = JSON.stringify(topic);
    }
    if (cards) {
      returnQueries.query.cards = JSON.stringify(cards);
    }
    if (template) {
      returnQueries.query.template = JSON.stringify(template);
    }
    router.replace(returnQueries as any, undefined, { shallow: true });
  };
  return { router, query, setUrlState };
}

export default useUrlState;

type StateUrlType = {
  topic?: TopicType | string;
  cards?: CardTypes[] | string;
  fronts?: string;
  backs?: string;
  template?: TemplateType | string | undefined;
  pathname?: string;
  topicId?: string;
  topicName?: string;
  content: ContentType;
  category?: CategoryType;
};
