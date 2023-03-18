import { handleAuth, handleCallback, handleLogin } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";

const afterCallback = async (req, res, session, state) => {
  const prisma = new PrismaClient();
  const user = session.user;
  const id = user?.sub; // as userId

  const existingUserRecord = await prisma.user.findUnique({ where: { id } });
  if (!existingUserRecord) {
    const createdNewUser = await prisma.user.create({
      data: {
        id,
        email: user.email,
        name: user.name,
      },
    });
    console.log(
      "new user created: [...auth0]/afterCallback : ",
      createdNewUser
    );
  }

  return session;
};

export default handleAuth({
  async login(req, res) {
    await handleLogin(req, res, {
      returnTo: "/classes",
    });
  },
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(error.status || 500).end();
    }
  },
});
