import React from 'react';
import Layout from '../../components/Layout';
import ContributeFrom from '../../components/contributeForm';
import Campain from '../../ethereum/compain';
import { Card,Grid,Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import {Link} from '../../routes'

class CompainShow extends React.Component{

  static async getInitialProps(props){
    // console.log(props.query.address);
    const campain = Campain(props.query.address);
  const summary =  await campain.methods.getSummary().call();

// console.log(summary);
    return {
      address:props.query.address,
      minimunContribute:summary[0],
      balance:summary[1],
      requestCount:summary[2],
      approveCount:summary[3],
      manager:summary[4]
    };
  }

renderCards(){
  const {
    address,
    minimunContribute,
    balance,
    requestCount,
    approveCount,
    manager
  }=this.props;
  const items = [
    {
      header:manager,
      meta:'管理者地址',
      description:'当前管理者创建了众筹列表，并且是众筹的受益人',
      style:{oveflowWrap:'break-word'}
    },
    {
      header:minimunContribute,
      meta:'最小贡献量',
      description:'如果你想对此众筹投资，你就需要至少大于当前金额',
      style:{oveflowWrap:'break-word'}
    },
    {
      header:requestCount,
      meta:'请求数量',
      description:'当前管理者创建请求从合约中提钱，必须有超过一半的投资人同意',
      style:{oveflowWrap:'break-word'}
    },
    {
      header:approveCount,
      meta:'投资人的数量',
      description:'已经为当前众筹投资的投资人的数量',
      style:{oveflowWrap:'break-word'}
    },
    {
      header:web3.utils.fromWei(balance,'ether'),
      meta:'众筹总金额(ether)',
      description:'当前众筹中剩余的总金额',
      style:{oveflowWrap:'break-word'}
    }
  ];
  return <Card.Group items={items} />
}

  render(){

    const summary = this.props.summary;




    return (

      <Layout>
      <h1>众筹显示 </h1>

      <Grid>
      <Grid.Row>
      <Grid.Column width={10}>

        {this.renderCards()}

      </Grid.Column>
      <Grid.Column width={6}>
        <ContributeFrom address={this.props.address}/>
      </Grid.Column>

      </Grid.Row>
      <Grid.Row>
      <Grid.Column>
      <Link route={`/compains/${this.props.address}/requests`}>
        <a>
            <Button primary>查看请求</Button>
        </a>
      </Link>
      </Grid.Column>
      </Grid.Row>
      </Grid>




      </Layout>


    );
  }
}

export default CompainShow;
