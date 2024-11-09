import { useEffect, useState } from "react";
import "./App.css";
import ConnectWallet from "./components/ConnectWallet";
import { requestTokens,checkTimeLeftToClaim,convertSeconds } from "./utils/utils";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);

  useEffect(() => {
    const savedWalletAddress = localStorage.getItem("walletAddress");
    if (savedWalletAddress) {
      setWalletAddress(savedWalletAddress);
    }
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(captcha);
    setCaptchaInput("");
    setCaptchaVerified(false);
  };

  const handleCaptchaInput = (e) => {
    setCaptchaInput(e.target.value);
    setCaptchaVerified(e.target.value === captcha);
  };

  const handleRequestTokens = async () => {
    if (!captchaVerified) {
      alert("Please enter the correct captcha before proceeding.");
      return;
    }
    setIsRequesting(true);

    // Handle the token request process here
    const { tx, tokenSent } = await requestTokens(walletAddress);
    if (!tokenSent) {
      const {timeLeft} = await checkTimeLeftToClaim(walletAddress);
      alert(`Tokens claim failed. Please try again after ${convertSeconds(timeLeft)}.`);
    } else {
      alert(`Tokens sent to ${walletAddress}`);
    }
    setIsRequesting(false);
    generateCaptcha();
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
            CodeToken Faucet
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

          <div className="mb-6 text-center">
            <span className="font-mono text-lg">Captcha: {captcha}</span>
          </div>
          <input
            type="text"
            placeholder="Enter Captcha"
            value={captchaInput}
            onChange={handleCaptchaInput}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          />

          <button
            onClick={handleRequestTokens}
            disabled={!walletAddress || isRequesting}
            className={`w-full text-white py-3 rounded-lg font-semibold transition-all duration-200 ${
              isRequesting
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isRequesting ? "Requesting..." : "Request Tokens"}
          </button>

          <div className="text-center text-sm text-gray-500 mt-6">
            Connect your wallet to earn free CodeTokens. EVM compatible wallets
            only.
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
