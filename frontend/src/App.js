import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter as Switch, Route, Link} from 'react-router-dom';
import AddItem from './components/create.js';
import SelectItem from './components/select.js';

import './App.css';
import './components/fridgeItems.css'

const Item = props => (
  <ul>
      <li>{props.item.title}</li>
      <li>{props.item.description}</li>
      <li>{props.item.quantity}</li>
      <li>{props.item.expDate}</li>
      <li>
          <Link to={'/select/' + props.item._id + '/update'}>Update</Link>
      </li>
  </ul>
)

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        items: [],
        item: {}
    };
  }

  componentDidMount(){
    axios.get('http://localhost:9000/items/')
      .then(response => {
          this.setState({items: response.data});
        })
      .catch(err => console.log(err));
  }

  componentDidUpdate(){
    axios.get('http://localhost:9000/items/')
      .then(response => {
		  if(this.state.items !== response.data){
		  	this.setState({items: response.data});
		  }
        })
      .catch(err => console.log(err));
  }


  myItems = () => {this.state.items.map(
      (item, index) => <Item item={item} key={index} />
    );  
  };

  

  render(){
    return (
        <div className="App">
			<span className="landscape background"></span>
			<span className="glass backgrounds"></span>
			{/* <div className="frame"></div> */}
			<Switch>
				<div className='Header'>
					<Link className='Title' to='/'>Fridge Log</Link>
					<Link className='add' to='/create'>+ Add Item</Link>
				</div>
        <Route path='/create' component={AddItem} />
				<Route path='/select/:id' component={SelectItem} />
				<div className='FoodBody'>
					{/* <h3>Fridge</h3> */}
          <br/>
					<div className= "list-group">
						{this.state.items.map(item => (
							<Link to={'/select/'+item._id}
								onClick= {()=>this.myItems()}
								className="list-group-item" key={item._id}
							>
								{item.title}
							</Link>
						))}
					</div>
				</div>


			</Switch>
        </div>
    );
  }
}

