import React,{Component} from 'react';
import {Form,Input,Button,Message} from 'semantic-ui-react';
import Compain from '../ethereum/compain';
import web3 from '../ethereum/web3';
import {Router} from '../routes';
class ContributeFrom extends Component{

state={
  value:'',
  errMessage:'',
  loading:false

}

onSubmit=async()=>{
  event.preventDefault();
  const compain = Compain(this.props.address);
  const accounts = await web3.eth.getAccounts();
  this.setState({loading:true});
try{
  await compain.methods.contribute().send({
    from:accounts[0],
    value:web3.utils.toWei(this.state.value,'ether')
  });

  Router.replaceRoute(`/compains/${this.props.address}`);

}catch(error){
  this.setState({errMessage:error.message})
}
this.setState({loading:false});
}

  render(){


    return(
      <Form onSubmit={this.onSubmit} error={!!this.state.errMessage}>
        <Form.Field>
          <label>总的投资额度</label>
          <Input
          value={this.state.value}
          onChange ={event=>this.setState({value:event.target.value})}
          label="ether"
          labelPosition="right"
          />
          </Form.Field>
          <Message error header="错误提示" content={this.state.errMessage}/>
          <Button loading={this.state.loading} primary>投资</Button>
      </Form>
    );


  }


}
export default ContributeFrom;
