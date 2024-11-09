import { ethers } from "ethers";
import { contractAddress, contractAbi } from "./contractRefs";

export let signer = null;
export let provider;

export async function requestTokens(user) {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);

        // Attempt to send the transaction
        const tx = await contract.claim(user);
        console.log("User claimed token", tx);

        // Return success if the transaction completes
        return {
            tx: tx,
            tokenSent: true
        };
    } catch (error) {
        console.error("Error claiming tokens:", error);

        // Return false if there was an error
        return {
            tx: null,
            tokenSent: false
        };
    }
}

export async function checkTimeLeftToClaim(user) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress,contractAbi,provider);
    const timeLeft = await contract.checkTimeLeftToClaim(user);
    console.log("Time left:",timeLeft);
    return {
        timeLeft: timeLeft.toString(),
    }
}

export function convertSeconds(durationInSeconds) {
    const hours = Math.floor(durationInSeconds / 3600); // 1 hour = 3600 seconds
    const minutes = Math.floor((durationInSeconds % 3600) / 60); // 1 minute = 60 seconds
    const seconds = durationInSeconds % 60;

    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}