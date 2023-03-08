import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import React, { useState } from "react";
import Popy from "./Popy";

export default function UserHeaderPop() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <p className="hover:text-indigo-400">
        <Link prefetch={false} href="/api/auth/login">
          Login
        </Link>
      </p>
    );
  }

  return (
    <Popy
      className="right-10"
      open={open}
      setOpen={setOpen}
      header={
        <div className="flex items-center">
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
          {/* <small>{user?.sub}</small> */}
          <p className="whitespace-nowrap">{user?.name}</p>
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
