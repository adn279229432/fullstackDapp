import Web3 from 'web3';

var web3;
if(typeof window !='undefined' && window.web3!='undefined'){
  web3 = new Web3(window.web3.currentProvider);
}else{
  const provider = new Web3.providers.HttpProvider(
    "https://kovan.infura.io/v3/b070f665de96464b83b276eb6397abb7'"
  );
  web3 = new Web3(provider);
}

export default web3;
