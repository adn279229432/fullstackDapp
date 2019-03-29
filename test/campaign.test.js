const assert = require("assert");
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const compileFactory = require('../ethereum/build/CampainFactory.json');
const compileCampain = require('../ethereum/build/Campain.json');

var accounts;
var campainAddress;
var campain;
var factory;

beforeEach(async()=>{
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compileFactory.interface)).deploy({data:'0x'+compileFactory.bytecode}).send({from:accounts[0],gas:'1000000'});
  await factory.methods.createCampain('100').send({from:accounts[0],gas:'1000000'});
  [campainAddress] = await factory.methods.getDeployedCampain().call();



// 通过传递合约地址拿到众筹合约的实例
  campain = await new web3.eth.Contract(JSON.parse(compileCampain.interface),campainAddress);
});

describe('campain',()=>{

  it('deploy a factory and campain',()=>{
    assert.ok(factory.options.address);
    assert.ok(campain.options.address);
  })

  it('manager address',async()=>{
    const manager = await campain.methods.manager().call();
    assert.equal(manager,accounts[0]);
  })

  it('allow people contribute',async()=>{
    await campain.methods.contribute().send({
      from:accounts[1],
      value:'200'
    });
    const isContribute = await campain.methods.approvers(accounts[1]).call();
    assert(isContribute);
  })

  it('require a minimum contribute',async()=>{
    try{
      await campain.methods.contribute().send({
        from:accounts[1],
        value:'5'
      });
      const isContribute = await campain.methods.approvers(accounts[1]).call();
      assert(isContribute);
    }catch(err){
      assert(err);
    }
  })

  it('allows a manager to make request',async()=>{
    await campain.methods.createRequest('buy pig','100',accounts[1]).send({
      from:accounts[0],
      gas:'1000000'
    });

    const request = await campain.methods.requests(0).call();
    assert.equal('buy pig',request.description)

  })

});
