import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

const PaymentForm = () => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    const initializeProvider = async () => {
      const detectedProvider = await detectEthereumProvider();
      if (detectedProvider) {
        setProvider(new ethers.providers.Web3Provider(detectedProvider));
      }
    };

    initializeProvider();
  }, []);

  const handlePaymentAmountChange = (e) => {
    setPaymentAmount(e.target.value);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (provider) {
      try {
        await provider.send('eth_requestAccounts', []);
        const accounts = await provider.listAccounts();
        const signer = provider.getSigner(accounts[0]);
        setSigner(signer);

        const transactionResponse = await signer.sendTransaction({
          to: '0x5027e86D40f6D57032760Ea44F0d681AE9A3d0A7',
          value: ethers.utils.parseEther(paymentAmount),
        });

        await transactionResponse.wait();

        console.log('Payment transaction successful:', transactionResponse);
      } catch (error) {
        console.error('Payment transaction error:', error);
      }
    } else {
      console.error('MetaMask provider not available');
    }
  };

  return (
    <form onSubmit={handlePaymentSubmit}>
      <div>
        <label>Payment Amount (ETH)</label>
        <input type="text" value={paymentAmount} onChange={handlePaymentAmountChange} />
      </div>
      <button type="submit">Submit Payment</button>
    </form>
  );
};

export default PaymentForm;
