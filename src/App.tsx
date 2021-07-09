import { request } from "graphql-request";
import './App.css';
import { useEffect, useState } from 'react';
import { Gotchi, QueryResponse, Collateral } from './types';
import { GotchiListing } from './components/GotchiListing';
import { SelectedGotchi } from './components/SelectedGotchi';
import Web3 from 'web3';
import diamondABI from './abi/diamondABI.json';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils/types'

const diamondAddress = '0x86935F11C86623deC8a25696E1C19a8659CbF95d';
const uri = 'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-core-matic';

function App() {
  const [selectedGotchi, setSelectedGotchi] = useState<number>(0);
  const [gotchis, setGotchis] = useState<Array<Gotchi>>([]);
  const [contract, setContract] = useState<Contract | null>(null);
  const connectToWeb3 = () => {
    const web3 = new Web3(Web3.givenProvider);
    const aavegotchiContract = new web3.eth.Contract(diamondABI as AbiItem[], diamondAddress);
    setContract(aavegotchiContract);
  }
  const fetchListings = async () => {
    const query = `
    {
      erc1155Listings(first: 500, where: {erc1155TypeId: "138"}, orderBy: timeCreated) {
        id
        timeCreated
        timeLastPurchased
        priceInWei
        sold
      }
    }
  `
    const response = await request<QueryResponse>(uri, query);
    console.log({ response })
  }

  useEffect(() => {
    fetchListings();
    connectToWeb3();
  }, [])

  return (
    <div className="App">
      hai
    </div>
  );
}

export default App;