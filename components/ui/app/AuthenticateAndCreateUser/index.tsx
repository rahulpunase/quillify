"use client";

import useUserStore from "@/store/user";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import React, { useEffect } from "react";

const OnSignOut = () => {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (user) {
      setUser(null);
    }
  }, [user]);
  return null;
};

const CreateUser = () => {
  const { user, setUser } = useUserStore();
  useEffect(() => {
    const create = async () => {
      const url = new URL(window.location.href);
      const origin = url.origin;
      const response = await fetch(origin + "/api/create-user", {
        method: "post",
      });
      const user = await response.json();
      setUser(user);
    };
    if (!user) {
      create();
    }
  }, [user]);
  return null;
};

const AuthenticateAndCreateUser = () => {
  return (
    <>
      <SignedIn key="once">
        <CreateUser />
      </SignedIn>
      <SignedOut>
        <OnSignOut />
      </SignedOut>
    </>
  );
};

export default AuthenticateAndCreateUser;
