"use client";

import { useAccount, useBalance } from "wagmi";

export default function Balance() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  if (!isConnected) return <p>No wallet connected</p>;

  return (
    <div>
      <p>Address: {address}</p>
      <p>
        Balance: {balance?.formatted} {balance?.symbol}
      </p>
    </div>
  );
}
