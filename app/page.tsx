"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Balance from "./components/Balance";
import WalletCard from "./components/WalletCard";

export default function Home() {
  return (
    <div>
      <ConnectButton />
      <WalletCard />
      <Balance />
    </div>
  );
}
