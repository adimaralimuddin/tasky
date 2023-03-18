export const _logDbResponse = (
  type: "Error" | "Validate" = "Error",
  path: string,
  msg: string
) => {
  console.log(
    `
${type}:
@${path}
msg: ${msg}
`
  );
};
