import React,{Component} from 'react';
import factory from '../ethereum/factory';
import { Card } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import {Link} from '../routes';
// export default ()=>{
//
//   return <h1>hello index!</h1>;
// }

class CompainIndex extends Component{


  static async getInitialProps(){
    const campain = await factory.methods.getDeployedCampain().call();
    return {campain};
  }
  // async componentDidMount(){
  //   const compain = await factory.methods.getDeployedCampain().call();
  //   console.log(campain);\
  // }
  renderCampain(){
    const items = this.props.campain.map(address=>{
        return {
          header:address,
          description:<Link route={`/compains/${address}`}><a>查看众筹</a></Link>,
          fluid:true
        }
    });
      return <Card.Group items={items} />;
  }
  render(){
    return(
      <Layout>
        <div>
        <h3>众筹列表</h3>

        <Link route="/compains/new">

        <Button floated='right' content='创建众筹' icon='add' labelPosition='left' primary/>
        </Link>
  {this.renderCampain()}
        </div>
</Layout>
    );

  }
}

export default CompainIndex;
