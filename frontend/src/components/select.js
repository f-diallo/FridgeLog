//update or delete selected item
import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './fridgeItems.css'


export default class SelectItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: '',
            description: '',
            quantity: '',
            expDate: '',
            food: true,
            update: false,
            deletE: false
        }
        
    }

    componentDidMount(){
        axios.get('http://localhost:9000/items/' + this.props.match.params.id)
    
        .then(response => {
            this.setState({
                title: response.data.title,
                description: response.data.description,
                quantity: response.data.quantity,
                expDate: response.data.expDate
            });
          })
        .catch(err => console.log(err));
    }

    componentDidUpdate(){
        axios.get('http://localhost:9000/items/' + this.props.match.params.id)
    
        .then(response => {
            if(this.state.title !== response.data.title){
                this.setState({
                    title: response.data.title,
                    description: response.data.description,
                    quantity: response.data.quantity,
                    expDate: response.data.expDate
                });
            }
          })
        .catch(err => console.log(err));
        
    }

    
    onChangeTitle = event => {
        this.setState({title: event.target.value});
    };

    onChangeDescription = event => {
        this.setState({description: event.target.value});
    };

    onChangeQuantity = event => {
        this.setState({quantity: event.target.value});
    };

    onChangeExpDate = event => {
        this.setState({expDate: event.target.value});
    };

    
    showFood = id => {
        axios.get(`http://localhost:9000/items/${id}`)
        .then(response => {
            this.setState({
                item: response.data,
                food: true,
                update: false,
                deletE: false
            });
        });
    };

    handleUpdate = () => {
        //event.preventDefault();

        const obj = {
            title: this.state.title,
            description: this.state.description,
            quantity: this.state.quantity,
            expDate: this.state.expDate
        };

        axios.patch('http://localhost:9000/items/' + this.props.match.params.id, obj)
        .then(response => {
            this.setState({
                food:false,
                update: true,
                deletE: false
            })
        });

        this.props.history.push('/select/' + this.props.match.params.id);
    }

    askDelete = () => {
        axios.patch('http://localhost:9000/items/' + this.props.match.params.id)
        .then(response => {
            this.setState({
                item: response.data,
                food:false,
                update: false,
                deletE: true
            });
        })
    }

    handleDelete = () => {

        axios.delete('http://localhost:9000/items/' + this.props.match.params.id);

        this.props.history.push('/');
    }

    render() {
        return(
            <div className='Select'>
                {this.state.food ? (
                <div className= "food">
                    <div className="food-body">
                        <h4 className="food-title">{this.state.title}</h4>
                        <p className="food-text">({this.state.description})</p>
                        <p className="food-text">Quantity: {this.state.quantity}</p>
                        <p className="food-text">Expiration Date: {this.state.expDate}</p>
                        <br/>
                        <Link to='/'>
                        <div className="btn">
                        Close
                        </div></Link>
                        <Link to={'/select/'+ this.props.match.params.id+'/update'}>
                        <div className="btn" onClick={() => this.handleUpdate()}>
                        Update
                        </div></Link>
                        <Link to={'/select/'+ this.props.match.params.id+'/delete'}>
                        <div className="btn" onClick={() => this.askDelete()}>
                        Delete
                        </div></Link>
                    </div>
                </div>
                ):null}
                {this.state.update ? (        
                <div className='update'>
                    <h3>Update Item</h3>
                    <form onSubmit={this.handleUpdate}>
                        <div className='form-body'>
                            <div className='form-group'>
                                <label>Title: </label>
                                <input type="text"
                                    className='form-input'
                                    placeholder={this.state.title}
                                    value={this.state.title}
                                    onChange={this.onChangeTitle}
                                    autoFocus/>
                            </div>
                            <div className='form-group'>
                                <label>Description: </label>
                                <input type="text"
                                    className='form-input'
                                    placeholder='optional'
                                    value={this.state.description}
                                    onChange={this.onChangeDescription}
                                    />
                            </div>
                            <div className='form-group'>
                                <label>Quantity: </label>
                                <input type="text"
                                    className='form-input'
                                    placeholder={this.state.quantity}
                                    value={this.state.quantity}
                                    onChange={this.onChangeQuantity}
                                    />
                            </div>
                            <div className='form-group'>
                                <label>Expiration Date: </label>
                                <input type="date"
                                    className='form-input'
                                    placeholder={this.state.expDate}
                                    value={this.state.expDate}
                                    onChange={this.onChangeExpDate}
                                    />
                            </div>
                        </div>
                        <div className='btns'>
                            <Link className="btn" to={'/select/'+ this.props.match.params.id} 
                                onClick={()=>this.showFood(this.props.match.params.id)}>
                                Cancel
                            </Link>
                            <input type="submit" value='Save' className='btn'/>
                        </div>
                    </form>
                </div>
                ):null}
                {this.state.deletE ? (//asks "Are You Sure?" before deleting
                <div className= "delete">
                    <h3>Are you sure?</h3>
                    <div className="food-body">
                        <h4 className="food-title">{this.state.title}</h4>
                        <p className="food-text">({this.state.description})</p>
                        <p className="food-text">Quantity: {this.state.quantity}</p>
                        <p className="food-text">Expiration Date: {this.state.expDate}</p>
                        <br/>
                        <Link to={'/select/'+this.props.match.params.id}>
                        <div className="btn" onClick={()=>this.showFood(this.props.match.params.id)}>
                        Cancel
                        </div></Link>
                        <Link to={'/'}>
                        <div className="btn" onClick={() => this.handleDelete()}>
                        Delete
                        </div></Link>
                    </div>
                </div>
                ):null}
            </div>
        )
    }
}
