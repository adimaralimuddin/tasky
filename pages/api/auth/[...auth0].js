import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export default handleAuth({
  async login(req, res) {
    console.log(req);
    await handleLogin(req, res, {
      returnTo: "/home",
    });
  },
});

