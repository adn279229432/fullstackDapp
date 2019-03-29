pragma solidity ^0.4.24;

contract CampainFactory {
  address[] public deployedCampain;
  function createCampain(uint _minimunContribute) public{
    address newCampain = new Campain(_minimunContribute,msg.sender);
    deployedCampain.push(newCampain);
  }
  function getDeployedCampain()public view returns (address[]) {
      return deployedCampain;
  }
}

contract Campain {

  struct Request{
    string description;//请求的描述
    uint value;//请求的金额
    address recipients;//受益人的地址
    bool complete;//项目完成情况，如果完成则为true
    uint  approveCount ;//同意请求的投资人总数
    mapping (address => bool) approvers;//判断有多少个人投过票
  }

  Request[] public requests;//存储请求
  address public manager; //管理者
  uint public minimunContribute;//最小贡献量
  mapping(address=>bool) public approvers;//存储投资人
  uint public approversCount;//投资人总数

  modifier restricted(){
    require(msg.sender==manager);
    _;
  }

  constructor(uint _minimunContribute,address _address)public{
    manager = _address;
    minimunContribute = _minimunContribute;
  }

  // 投资人投资
  function contribute() public payable{
    require(msg.value>minimunContribute);
    approvers[msg.sender]=true;
    approversCount++;
  }

  // 管理者创建请求
  function createRequest(string _description,uint _value,address _recipients)public restricted{
    Request memory req = Request({
      description:_description,
      value:_value,
      recipients:_recipients,
      complete:false,
      approveCount:0
      });
      requests.push(req);
  }

  // 投资人同意请求
  function approveRequest(uint index)public {
    Request storage req = requests[index];
    require(approvers[msg.sender]);
    require(!req.approvers[msg.sender]);
    req.approvers[msg.sender] = true;
    req.approveCount++;

  }

  // 管理者判断项目是否成功
  function finalizeRequest(uint index)public restricted payable{
    Request storage req = requests[index];
    require(req.approveCount>approversCount/2);

    req.recipients.transfer(req.value);
    req.complete=true;
  }

  function getSummary()public view returns(uint,uint,uint,uint,address){
    return(minimunContribute,address(this).balance,requests.length,approversCount,manager);
  }

  function getRequestCount()public view returns(uint){
    return requests.length;
  }

}
