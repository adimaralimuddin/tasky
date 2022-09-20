import { useRouter } from "next/router";
import PlaymainPage from "../../../components/play/PlaymainPage";

export default function Compony() {
  const router = useRouter();
  const { classId, topicId } = router.query;
  return <PlaymainPage classId={classId} topicId={topicId} />;
}
