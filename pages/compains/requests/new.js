import React,{Component} from 'react';
import {Form,Input,Button,Message} from 'semantic-ui-react';
import Layout from '../../../components/Layout'
import web3 from '../../../ethereum/web3';
import Compain from '../../../ethereum/compain';
import {Router,Link} from '../../../routes';
class CompainRequestNew extends Component{

  static async getInitialProps(props){
    const {address} = props.query;
    return {address};
  }

state={
  description:'',
  errMessage:'',
  value:'',
  recipientAddress:''
};

onSubmit=async()=>{
  event.preventDefault();
  // console.log(1111);
  //   console.log(this.props.address);
  //   console.log(2222);
  const compain = Compain(this.props.address);

  const accounts = await web3.eth.getAccounts();
  const {description,value,recipientAddress} = this.state;
  // console.log(compain.methods.);
  this.setState({loading:true})

try{

  await compain.methods.createRequest(description,web3.utils.toWei(value,'ether'),recipientAddress).send(
    {
      from:accounts[0],
    }
  );

  Router.pushRoute(`/compains/${this.props.address}/requests`);

}catch(error){
  this.setState({errMessage:error.message});
}
this.setState({loading:false});
}


  render(){
    return (
      <Layout>

      <Link route={`/compains/${this.props.address}/requests`}>
返回
      </Link>
<Form onSubmit={this.onSubmit} error={!!this.state.errMessage}>
<Form.Field>
  <label>请求描述</label>
  <Input
  value={this.state.description}
  onChange ={event=>this.setState({description:event.target.value})}
  />
  </Form.Field>

  <Form.Field>
    <label>请求金额（ether）</label>
    <Input
    value={this.state.value}
    onChange ={event=>this.setState({value:event.target.value})}
    />
    </Form.Field>

    <Form.Field>
      <label>受益人地址</label>
      <Input
      value={this.state.recipientAddress}
      onChange ={event=>this.setState({recipientAddress:event.target.value})}
      />
      </Form.Field>

    <Message error header="错误提示" content={this.state.errMessage}/>
    <Button loading={this.state.loading} primary>增加请求</Button>
</Form>
      </Layout>
    );
  }
}
export default CompainRequestNew;
