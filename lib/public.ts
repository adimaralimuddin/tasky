export const DEF_USER = "defuserid";
export const URL = "/api/graphql";
export const SAMPLE = false;

export function defUser() {
  const val = "" + Math.random() * 10;
  let def: any = localStorage.getItem("defUser");
  if (!def) {
    const x = localStorage.setItem("defUser", "" + Math.random() * 10);
    def = x;
  }
  return def;
  // let def: any = (document.cookie = "defuser=" + val);
  // if (!def) {
  //   def = document.cookie = "defuser=" + val;
  // }
  // console.log("def ", def?.replace("defuser=", ""));
  // return def;
}
