import React,{Component} from 'react';
import Layout from '../../components/Layout';
import { Button, Form ,Input} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import { Message } from 'semantic-ui-react';
import {Router} from '../../routes';
class CompainNew extends Component{
  state={
    minimum:'',
    errMessage:'',
    loading:''
  };

  onSubmit = async()=>{
    this.setState({errMessage:''});
    this.setState({loading:true});
    try{
    event.preventDefault();//阻止浏览器帮我们默认提交
    const accounts = await web3.eth.getAccounts();
    await factory.methods.createCampain(this.state.minimum).send({from:accounts[0]});
    Router.pushRoute('/');
  }catch(err){
    this.setState({errMessage:err.message});

  }
    this.setState({loading:false});
  }




  render(){
    // console.log(this.state.minimum);
    return (
      <Layout>
      <h3>创建众筹项目</h3>
      <Form onSubmit={this.onSubmit} error={!!this.state.errMessage}>
      <Form.Field>
            <label>请输入最小贡献量</label>
            <Input label='wei' placeholder='最小100' labelPosition='right'
            value={this.state.minimum}
            onChange={event=>this.setState({minimum:event.target.value})}/>
            <Button type='submit' loading={this.state.loading} primary>创建众筹</Button>
          </Form.Field>
          <Message
    error
    header='错误'
    list={[
      this.state.errMessage
    ]}
  />
      </Form>
      </Layout>
    );
  }
}
export default CompainNew;
