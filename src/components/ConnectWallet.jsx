import React from "react";
import { ethers } from "ethers";

const ConnectWallet = ({ walletAddress, setWalletAddress }) => {
  const handleWalletConnect = async () => {
    if (!walletAddress) {
      if (!window.ethereum) {
        alert("Please install MetaMask Wallet");
        return;
      }
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        // MetaMask requires requesting permission to connect users accounts
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        console.log("wallet connected successfully");
      } catch (error) {
        console.error("An error occurrred", error);
      }
    } else {
      setWalletAddress(null);
      alert("Wallet disconnected successfully");
    }
  };
  return (
    <div className="w-full flex justify-end p-4">
      <button
        onClick={handleWalletConnect}
        className="px-6 py-3 border border-white bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {walletAddress ? (
          <span>Disconnect wallet</span>
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
    </div>
  );
};

export default ConnectWallet;
