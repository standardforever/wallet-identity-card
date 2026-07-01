"use client";

import { useAccount, useBalance } from "wagmi";
import { useEnsName } from "wagmi";

export default function WalletCard() {
  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({ address });
  const { data: ensName } = useEnsName({ address });

  if (!isConnected) return <p>Connect your wallet</p>;

  const shortAddress = `${address?.slice(0, 6)}...${address?.slice(-4)}`;

  return (
    <div className="border rounded-2xl p-6 w-80 shadow-lg bg-white">
      <p className="text-sm text-gray-400">Network: {chain?.name}</p>
      <p className="text-xl font-bold mt-2">{ensName ?? shortAddress}</p>
      <p className="text-gray-600 mt-1">
        {balance?.formatted?.slice(0, 6)} {balance?.symbol}
      </p>
    </div>
  );
}
