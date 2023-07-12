import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Contract from '@truffle/contract';
import ActionTriggerArtifact from '../../contracts/artifacts/ActionTrigger.json'; // This is the compiled contract artifact

function TransferArea() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function loadWeb3AndContract() {
      // Check if MetaMask is available
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(window.web3);
        const accounts = await window.web3.eth.getAccounts();
        setAccount(accounts[0]);

        const actionTrigger = Contract(ActionTriggerArtifact);
        actionTrigger.setProvider(window.web3.currentProvider);
        const instance = await actionTrigger.deployed();
        setContract(instance);
      } else {
        alert('MetaMask is not installed. Please consider installing it.');
      }
    }

    loadWeb3AndContract();
  }, []);

  async function triggerAction() {
    if (!contract || !account) return;
    await contract.triggerAction(account, { from: account });
  }

  return (
    <div>
      <button onClick={triggerAction}>Trigger Action</button>
    </div>
  );
}

export default TransferArea;
