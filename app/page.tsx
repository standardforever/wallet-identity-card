"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import WalletCard from "./components/WalletCard";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-slate-50 via-white to-indigo-50">
      <div
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle,#00000008_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden
      />

      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-900 text-sm font-bold text-white">
            W
          </div>
          <span className="text-sm font-semibold text-neutral-800">Wallet Identity Card</span>
        </div>
        <ConnectButton />
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center gap-8 px-6 pb-24 text-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Your onchain identity, at a glance
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-neutral-500">
            Connect a wallet to see your ENS profile, network, and balance on a single card.
          </p>
        </div>

        <WalletCard />
      </main>
    </div>
  );
}
