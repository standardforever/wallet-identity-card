# Wallet Identity Card

A minimal onchain identity card built with **Next.js**, **wagmi**, **viem**, and **RainbowKit**. Connect a wallet and see your ENS name/avatar, active network, and live balance rendered on a single glassy, color-personalized card.

## Features

- **One-click wallet connection** via RainbowKit's `ConnectButton`, supporting any injected/WalletConnect-compatible wallet.
- **ENS resolution** — shows your ENS name and avatar when available (resolved against Ethereum mainnet regardless of the connected chain), falling back to a shortened address and a deterministic gradient avatar generated from your address.
- **Live balance** — native token balance for the connected account, formatted with `viem`'s `formatUnits`.
- **Network awareness** — displays the currently connected chain with a live status indicator.
- **Copy-to-clipboard address** with inline confirmation feedback.
- **Block explorer link** — jumps straight to the connected chain's explorer for the current address.
- **Disconnect control** built into the card.
- **Polished UI** — glowing gradient card, glass-morphism surface, skeleton loading state for the balance, and a matching empty state when no wallet is connected.

## Tech stack

| Layer | Library |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) 16 (App Router) |
| UI | [React](https://react.dev) 19 + [Tailwind CSS](https://tailwindcss.com) 4 |
| Wallet connection | [RainbowKit](https://www.rainbowkit.com) |
| Ethereum interactions | [wagmi](https://wagmi.sh) + [viem](https://viem.sh) |
| Data/async state | [TanStack Query](https://tanstack.com/query) |

## Getting started

### Prerequisites

- Node.js 18.18+ (or a compatible LTS)
- A package manager: `npm`, `yarn`, `pnpm`, or `bun`

### Install

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), click **Connect Wallet**, and approve the connection in your wallet to see your identity card populate.

### Other scripts

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # run ESLint
```

## Configuration

Wallet connection is configured in [app/providers.tsx](app/providers.tsx) via RainbowKit's `getDefaultConfig`:

```ts
const config = getDefaultConfig({
  appName: "standeva",
  projectId: "f5da682f9fcdcac69e929027e8997a2f",
  chains: [mainnet, baseSepolia],
  ssr: true,
});
```

- **`projectId`** — a [WalletConnect Cloud](https://cloud.walletconnect.com) project ID. Swap in your own before deploying to production.
- **`chains`** — the networks users can connect to. Add or remove chains from `wagmi/chains` as needed; the identity card automatically reflects whichever chain is active.

## Project structure

```
app/
├── layout.tsx              # Root layout, fonts, metadata, providers
├── page.tsx                # Landing page: header, hero copy, wallet card
├── providers.tsx           # Wagmi + RainbowKit + React Query setup
├── globals.css             # Tailwind entry + base theme tokens
└── components/
    └── WalletCard.tsx      # The identity card (avatar, ENS, balance, address, explorer link)
```

## How the identity card works

- `useAccount` provides the connected `address` and active `chain`.
- `useEnsName` / `useEnsAvatar` resolve ENS data against mainnet (`chainId: mainnet.id`) so identities resolve correctly even when connected to a testnet like Base Sepolia.
- `useBalance` returns the native balance as `{ value, decimals }`; the card formats it with `viem`'s `formatUnits` rather than the deprecated `formatted` field.
- When no ENS avatar is available, a unique gradient avatar is derived deterministically from the wallet address, so each address always gets the same recognizable color.
- Disconnecting is handled with wagmi's `useDisconnect`, and address copying uses the Clipboard API with a brief inline "Address copied" confirmation.

## Notes

This project uses **Tailwind CSS v4**, which is configured entirely via CSS (`@import "tailwindcss"` + `@theme` in [app/globals.css](app/globals.css)) — there is no `tailwind.config.js`.
