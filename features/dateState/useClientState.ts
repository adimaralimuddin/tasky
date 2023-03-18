import { useQueryClient } from "@tanstack/react-query";
import { ServerDataType } from "./serverDataSlice";

function useClientState() {
  const client = useQueryClient();

  const initClientState = (serverData: ServerDataType) => {
    const folders = serverData?.folders;
    const classId = serverData?.class_?.id;

    client.setQueryData(["class", classId], () => serverData?.class_);
    client.setQueryData(["folder", classId], () => folders);
    client.setQueryData(["dashboard", classId], () => serverData.dashboard);

    folders.map((folder) => {
      if (folder?.Topic) {
        client.setQueryData(["topics", folder?.id], () => {
          return folder?.Topic?.map((t) => ({
            ...t,
            cards: [...(t?.cards || [])],
          }));
        });

        folder.Topic?.map((topic) => {
          client.setQueryData(["cards", topic?.id], () => topic?.cards);
        }); // folder.topic?.map
      } // if topic?
    });
  };
  return {
    initClientState,
  };
}

export default useClientState;
