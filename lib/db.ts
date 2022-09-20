import * as filestack from "filestack-js";

export function useDb() {
  const client = filestack.init("AIHAbZR60TPqorjUPR87Gz");
  return client;
}
