"use client"
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { Connection, PublicKey } from "@solana/web3.js";

const Signin = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [solanaBalance, setSolanaBalance] = useState(0);

  useEffect(
    () => {
      if (walletAddress) {
        fetchingSolanaBalance()
      }
    }, [walletAddress]
  )

  const fetchingSolanaBalance = async () => {
    const connection = new Connection("https://api.devnet.solana.com");
    const balance = await connection.getBalance(
      new PublicKey(walletAddress)
    )
    setSolanaBalance(balance / 10 ** 9)
  }

  const connectPhantomWallet = async () => {
    try {
      const newAdapter = new PhantomWalletAdapter();
      await newAdapter.connect()
      setWalletAddress(
        newAdapter.publicKey.toString()
      )
    } catch (error) {
      alert("Install phantom wallet")
    }
  }

  const disConnectWallet = () => {
    setWalletAddress(null)
    setSolanaBalance(0)
  }

  const renderConnectButton = () => {
    if (!walletAddress) {
      return (
        <button
          onClick={connectPhantomWallet}
          className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
        >
          Connect Phantom Wallet
        </button>
      )
    }
    return (
      <button
        onClick={disConnectWallet}
        className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
      >
        Disconnect
      </button>
    )
  }

  const renderSignInTitle = () => {
    if (!walletAddress) {
      return (
        <Breadcrumb title={"Signin"} pages={["Signin"]} />
      )
    }
    return (
      <Breadcrumb title={"You connected to this page"} pages={["Signin"]} />
    )
  }

  const renderSolanaBalance = () => {
    if (!walletAddress) {
      return null
    }
    return (
      <div>
        You solana balance: {
          solanaBalance
        }
      </div>
    )
  }

  return (
    <>
      {
        renderSignInTitle()
      }
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            {
              renderConnectButton()
            }
            {
              renderSolanaBalance()
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
