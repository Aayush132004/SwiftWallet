"use client";
import {useBalance,useAppDispatch} from "@repo/store/hooks";
import {setBalance} from "@repo/store/balanceSlices";

import { useRouter } from "next/navigation";
export default  function Home() {
  const router=useRouter();
  const balance=useBalance();
  console.log("balance",balance);
  const dispatch=useAppDispatch();
  return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl text-amber-500 font-bold">Welcome to the User App</h1>
      <p className="mt-4 text-lg">This is the user application for managing your wallet.</p>
      <p>CurrentBalance:balance is{balance}</p>
      <button onClick={()=>dispatch(setBalance(200))} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Set Balance to 100</button>
    </div>
  )
}