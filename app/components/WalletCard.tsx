"use client";

import { useAccount, useBalance, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { mainnet } from "wagmi/chains";
import { formatUnits } from "viem";
import { useState } from "react";

function hashToHue(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} stroke="currentColor" className="h-3.5 w-3.5">
      <rect x="9" y="9" width="12" height="12" rx="2.5" />
      <path d="M5 15H4.5A2.5 2.5 0 0 1 2 12.5v-8A2.5 2.5 0 0 1 4.5 2h8A2.5 2.5 0 0 1 15 4.5V5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} stroke="currentColor" className="h-3.5 w-3.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5h6v6m0-6-9 9M18 14v4.5a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2H11" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25A2.25 2.25 0 0 1 4.5 6h12a2.25 2.25 0 0 1 2.25 2.25v.75H15a2.5 2.5 0 0 0 0 5h3.75v.75A2.25 2.25 0 0 1 16.5 17h-12a2.25 2.25 0 0 1-2.25-2.25v-6.5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" fill="currentColor" />
    </svg>
  );
}

function PowerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} stroke="currentColor" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v8.25M18 6.5a8.25 8.25 0 1 1-12 0" />
    </svg>
  );
}

export default function WalletCard() {
  const { address, isConnected, chain } = useAccount();
  const { data: balance, isLoading: balanceLoading } = useBalance({ address });
  const { data: ensName } = useEnsName({ address, chainId: mainnet.id });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName ?? undefined, chainId: mainnet.id });
  const { disconnect } = useDisconnect();
  const [copied, setCopied] = useState(false);

  if (!isConnected || !address) {
    return (
      <div className="w-full max-w-sm rounded-3xl border border-dashed border-black/10 bg-black/[0.02] p-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 text-black/40">
          <WalletIcon />
        </div>
        <p className="mt-4 text-sm font-medium text-black/70">No wallet connected</p>
        <p className="mt-1 text-xs text-black/40">Connect a wallet to view your identity card</p>
      </div>
    );
  }

  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
  const hue = hashToHue(address);
  const colorFrom = `hsl(${hue}, 85%, 62%)`;
  const colorTo = `hsl(${(hue + 70) % 360}, 85%, 55%)`;
  const explorerUrl = chain?.blockExplorers?.default?.url;
  const formattedBalance = balance
    ? Number(formatUnits(balance.value, balance.decimals)).toFixed(4)
    : "0.0000";

  const copyAddress = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-sm">
      <div
        className="absolute -inset-1 rounded-[2rem] opacity-60 blur-2xl"
        style={{ background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})` }}
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 p-6 shadow-2xl">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{ background: `radial-gradient(circle at 100% 0%, ${colorFrom}, transparent 55%)` }}
          aria-hidden
        />

        <div className="relative flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/70 ring-1 ring-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {chain?.name ?? "Unknown network"}
          </span>
          <button
            onClick={() => disconnect()}
            title="Disconnect wallet"
            className="flex h-7 w-7 items-center justify-center rounded-full text-white/40 ring-1 ring-white/10 transition hover:text-white hover:ring-white/30"
          >
            <PowerIcon />
          </button>
        </div>

        <div className="relative mt-6 flex items-center gap-4">
          {ensAvatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={ensAvatar}
              alt={ensName ?? "ENS avatar"}
              className="h-14 w-14 rounded-2xl object-cover ring-2 ring-white/10"
            />
          ) : (
            <div
              className="h-14 w-14 shrink-0 rounded-2xl ring-2 ring-white/10"
              style={{ background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})` }}
              aria-hidden
            />
          )}
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-white">{ensName ?? shortAddress}</p>
            <button
              onClick={copyAddress}
              className="mt-1 flex items-center gap-1.5 rounded-md text-xs text-white/50 transition hover:text-white/90"
            >
              <span className="font-mono">{shortAddress}</span>
              {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        </div>

        <div className="relative mt-6 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
          <p className="text-xs font-medium uppercase tracking-wider text-white/40">Balance</p>
          {balanceLoading ? (
            <div className="mt-2 h-7 w-32 animate-pulse rounded bg-white/10" />
          ) : (
            <p className="mt-1 text-2xl font-bold text-white">
              {formattedBalance}{" "}
              <span className="text-base font-medium text-white/50">{balance?.symbol}</span>
            </p>
          )}
        </div>

        {explorerUrl && (
          <a
            href={`${explorerUrl}/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-4 flex items-center justify-center gap-1.5 text-xs font-medium text-white/50 transition hover:text-white"
          >
            View on Explorer
            <ExternalLinkIcon />
          </a>
        )}

        <div
          className={`pointer-events-none absolute inset-x-0 bottom-3 flex justify-center transition-opacity duration-300 ${
            copied ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-900 shadow-lg">
            Address copied
          </span>
        </div>
      </div>
    </div>
  );
}
