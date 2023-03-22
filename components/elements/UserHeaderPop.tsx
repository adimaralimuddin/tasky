import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import React, { useState } from "react";
import Popy from "./Popy";

export default function UserHeaderPop() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  if (!user) {
    return (
      <Popy
        setOpen={setOpenLogin}
        open={openLogin}
        right={true}
        header={
          <p className="hover:text-indigo-400 cursor-pointer font-medium">
            LOGIN
          </p>
        }
        className=""
      >
        <div className="card-all col_ gap-1 min-w-[200px]">
          <Link prefetch={false} href="/api/auth/login" target="_blank">
            <button className="btn-prime">Login</button>
          </Link>
          <h3 className="text-accent text-center">or use demo users</h3>
          <div>
            <div>
              <div className="col_ gap-1 ring-1d bg-layer-1 rounded-lg p-2">
                <p className="text-center">user1</p>
                <small>email: </small>
                <p className="p-[2px] bg-sec rounded-md px-2 cursor-pointer hover:ring-indigo-400 hover:ring-2">
                  user1@test.com
                </p>
                <small>password: </small>
                <p className="p-[2px] bg-sec rounded-md px-2 cursor-pointer hover:ring-indigo-400 hover:ring-2">
                  User123!
                </p>
              </div>
            </div>
          </div>
        </div>
      </Popy>
    );
  }

  return (
    <Popy
      className="right-10"
      open={open}
      setOpen={setOpen}
      header={
        <div className="flex items-center cursor-pointer rounded-full">
          {user?.picture && (
            <img
              className="rounded-full w-[clamp(35px,35px,35px)]"
              src={user?.picture}
              alt=""
            />
          )}
        </div>
      }
    >
      <div className="card-all col_ gap-0 ">
        <div className="p-2 text-center text-sec">
          <h3 className="whitespace-nowrap font-medium">{user?.name}</h3>
          <p className="whitespace-nowrap ">{user?.email}</p>
        </div>
        <button className="m-0 text-value">
          <Link prefetch={false} href="/api/auth/logout">
            logout
          </Link>
        </button>
      </div>
    </Popy>
  );
}
