import React,{Component} from 'react';
import factory from '../ethereum/factory';
import { Card } from 'semantic-ui-react'

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
    const item = this.props.campain.map(address=>{
        return {
          header:address,
          description:<a>查看众筹</a>,
          fluid:true
        }
    });
      return <Card.Group items={items} />;
  }
  render(){
    return(
        <div>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"/>
        {this.renderCampain()}
        </div>

    );

  }
}

export default CompainIndex;
