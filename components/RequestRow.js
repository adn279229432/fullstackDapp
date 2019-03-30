import React from 'react';
import web3 from '../ethereum/web3';
import { Table,Button } from 'semantic-ui-react';
import Compain from '../ethereum/compain';
class RequestRow extends React.Component{

onApprove=async()=>{
  const compain = Compain(this.props.address);
  const accounts = await web3.eth.getAccounts();
  await compain.methods.approveRequest(this.props.id).send({
    from:accounts[0]
  });
}

onFinalize=async()=>{
  const compain = Compain(this.props.address);
  const accounts = await web3.eth.getAccounts();
  await compain.methods.finalizeRequest(this.props.id).send({
    from:accounts[0]
  });
}


render(){
const {Row,Cell} = Table;
console.log(this.props);
const {id,request,approversCount}= this.props;
console.log(approversCount);
  return (
    <Row disabled ={request.complete}>
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value,'ether')}</Cell>
        <Cell>{request.recipients}</Cell>
        <Cell>{request.approveCount}/{approversCount}</Cell>
        <Cell>
          {
            request.complete?null:(<Button color="green" onClick={this.onApprove}>同意</Button>)
          }

        </Cell>

        <Cell>

        {
          request.complete?null:(<Button color="teal" onClick={this.onFinalize}>完成</Button>)
        }


        </Cell>

    </Row>
  );
}

}
export default RequestRow;
