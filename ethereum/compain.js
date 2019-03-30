import web3 from './web3';
import Campain from './build/Campain.json';

export default (address)=>{
  return new web3.eth.Contract(JSON.parse(Campain.interface),address);
}
