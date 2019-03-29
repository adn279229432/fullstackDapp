import web3 from "./web3";

import CampainFactory from './build/CampainFactory';

const instance = new web3.eth.Contract(JSON.parse(CampainFactory.interface),'0xC45D2a816c251DFfaC901fC556c952AD07dAa3b0');

export default instance;
