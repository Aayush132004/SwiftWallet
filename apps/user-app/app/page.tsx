'use client'
import { signIn,signOut, useSession } from "next-auth/react";
import {Appbar} from "@repo/ui/appbar";

export default function Page():any {
  const session=useSession();
  return(
    <div>

    </div>
  )
}