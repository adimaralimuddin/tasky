import { _logDbResponse } from "../utilsLogger/_logDb";

export type ApiUnsuccessfulResponseType = {
  isSuccess: boolean;
  type: "Error" | "Validate";
  path: string;
  msg: string;
  meta?: any;
};
export function _unsuccessfulResponse(args: ApiUnsuccessfulResponseType): any {
  const { type, path, msg } = args;
  _logDbResponse(type, path, msg);
  throw new Error(msg);
  return {
    ...args,
  };
}
