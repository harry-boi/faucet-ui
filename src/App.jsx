import { useState } from "react";
import "./App.css";
import ConnectWallet from "./components/ConnectWallet";
import {requestTokens} from "./utils/utils";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);

  const handleRequestTokens = async () => {
    setIsRequesting(true);
    // Handle the token request process here. I used a set timeout as a placeholder
    const { tx, tokenSent } = await requestTokens(walletAddress);
    if (!tokenSent) {
      alert(`Tokens claim failed,You should try again after 24 hours`);
    } else {
      alert(`Tokens sent to ${walletAddress}`);
    }
    setWalletAddress("");
    setIsRequesting(false);
  };

  return (
    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <ConnectWallet
        setWalletAddress={setWalletAddress}
        walletAddress={walletAddress}
      />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-gray-800">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Token Faucet
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Enter your wallet address below to receive test tokens.
          </p>

          <input
            type="text"
            placeholder="Your Wallet Address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          />

          <button
            onClick={handleRequestTokens}
            disabled={!walletAddress || isRequesting}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
              isRequesting
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isRequesting ? "Requesting..." : "Request Tokens"}
          </button>

          <div className="text-center text-sm text-gray-500 mt-6">
            This faucet is for test purposes only. Please ensure your address is
            correct.
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
