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