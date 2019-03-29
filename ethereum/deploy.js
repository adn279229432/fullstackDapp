const HDWalletProvider = require('truffle-hdwallet-provider');

const Web3 = require('web3');

// const {interface,bytecode} = require('./compile.js');

const compileFactory = require('./build/CampainFactory.json');

// 第一个参数是12个助记词可以在metamask中找到，第二个参数是您注册的infura网站中的ENDPOINT中的网址，
//主网和kovan等网络都有自己的网址，如果网址没有https://，需要手动加上
const provider = new HDWalletProvider(
'certain girl evil rebuild ridge amateur february churn phone surround script dash',
'https://kovan.infura.io/v3/b070f665de96464b83b276eb6397abb7'

);

const web3 = new Web3(provider);

// 记住web3中的库都是异步调用的，我们要适时选择同步调用（await）
const deploy = async()=>{

  console.log(compileFactory.interface);

  const accounts = await web3.eth.getAccounts();
  // console.log('Attemp to deploy contract',accounts[0]);

  //data后面的0x一定不要忘记，这是比较坑的一个bug
  const result = await  new web3.eth.Contract(JSON.parse(compileFactory.interface)).deploy({data:'0x'+compileFactory.bytecode}).send({from:accounts[0],gas:'1000000'});

  console.log('contract deploy to ',result.options.address);
}

deploy();
