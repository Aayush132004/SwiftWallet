"use client";
import { useBalance, useAppDispatch } from "@repo/store/hooks";
import { setBalance } from "@repo/store/balanceSlices";

export default function test() {
  const balance = useBalance(); // Reads balance state
  const dispatch = useAppDispatch();
  console.log("balance", balance); 

  return (
    <div>
      <p>Current Balance: {balance}</p>
      <button onClick={() => dispatch(setBalance(100))}>
        Set Balance to 100
      </button>
    </div>
  );
}