import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Box from "./Box";

export default function UserHeaderPop() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center z-50">
      <div className="flex items-center" onMouseEnter={() => setOpen(true)}>
        {user?.picture && (
          <Image
            className="rounded-full"
            src={user?.picture}
            width={40}
            height={40}
            alt="user avatar"
          />
        )}
      </div>
      {open && (
        <span className="relative">
          <div
            onMouseLeave={() => setOpen(false)}
            onClick={() => setOpen(false)}
            className="absolute right-0 top-0 pt-10 "
          >
            <Box css="flex flex-col shadow-xl p-2 ring-1 ring-slate-200 ">
              <div className="p-2">
                <p className="whitespace-nowrap">{user?.name}</p>
              </div>
              <hr />
              <button className="m-0">
                <Link href="/api/auth/logout">logout</Link>
              </button>
            </Box>
          </div>
        </span>
      )}
    </div>
  );
}
