import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';
import AddItem from './create.js';
import SelectItem from './select.js';
import './fridgeItems.css'

// import {format} from 'date-fns';
//import { render } from 'react-dom';

const Item = props => ( //was Fridge
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

export default class FridgeItems extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            item: {}
        };
        //this,bind
        //console.log(this.props);
    }

    componentDidMount(){
        axios.get('http://localhost:9000/items/')
        .then(response => {
            this.setState({items: response.data});
          })
        .catch(err => console.log(err));

    }

    // componentDidUpdate(){
    //     axios.get('http://localhost:9000/items/')
    //     .then(response => {
    //         this.setState({items: response.data});
    //       })
    //     .catch(err => console.log(err));
    // }

    myItems = () => {this.state.items.map(
        (item, index) => <Item item={item} key={index} />
     );  //  this.props.history.push('/select/'+this.props.match.params.id);
}
    ;

    // showFood = id => {
    //     axios.get(`http://localhost:9000/items/${id}`)
    //       .then(response => {
    //         this.setState({item: response.data});
    //       });
    //     this
    // };
      

    render() {
        return (
            <Router>
            <div className='Items'>
                {/* <Link to='/'><h1>This is home (Frontend)</h1></Link>
                <br/> 
                <Link className='add' to='/create'>Add Item</Link>
                <br/>*/}
                <div className= "list-group">
                    <h3>Fridge</h3>
                    {this.state.items.map(item => (
                    <div
                        onClick= {()=>this.myItems()}
                        className="list-group-item" key={item._id}
                    ><Link to={'/select/'+item._id}>{/*Does '/:' matter for id */}
                        {item.title}
                        {/* {this.fridgeItems} */}
                    </Link></div>
                    ))}
                </div>
                <Route path='/create' component={AddItem} />
                <Route path='/select/:id' component={SelectItem} />
            </div>
            </Router>
        )
    }
}