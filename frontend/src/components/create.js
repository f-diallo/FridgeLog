//create/add new item
import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './fridgeItems.css'

export default class AddItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: '',
            description: '',
            quantity: '',
            expDate: ''
        }
    }

    // componentDidMount(){
    //     axios.get('http://localhost:9000/items/')
    //     .then(response => {
    //         this.setState({items: response.data});
    //       })
    //     .catch(err => console.log(err));
    // }

    handleSubmit = event => {
        event.preventDefault();

        console.log('Form submitted:');
        console.log(`Item Title: ${this.state.title}`);
        console.log(`Item Description: ${this.state.description}`);
        console.log(`Item Quantity: ${this.state.quantity}`);
        console.log(`Item Expiration: ${this.state.expDate}`);


        const newItem = {
            title: this.state.title,
            description: this.state.description,
            quantity: this.state.quantity,
            expDate: this.state.expDate
        };

        axios.post('http://localhost:9000/items/', newItem);


        this.setState({
            title: 'test',
            description: '',
            quantity: '',
            expDate: ''
        });

        this.props.history.push('/');

    };

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


    render() {
        return (
            <div className='create update'>
                <h3>Add New Item</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-body'>
                        <div className='form-group'>
                            <label>Title: </label>
                            <input type="text"
                                className='form-input'
                                placeholder='Enter item name'
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                autoFocus/>
                        </div>
                        <div className='form-group'>
                            <label>Description: </label>
                            <input type="text"
                                className='form-input'
                                placeholder='Enter item description (optional)'
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                />
                        </div>
                        <div className='form-group'>
                            <label>Quantity: </label>
                            <input type="text"
                                className='form-input'
                                placeholder='Enter item quantity'
                                value={this.state.quantity}
                                onChange={this.onChangeQuantity}
                                />
                        </div>
                        <div className='form-group'>
                            <label>Expiration Date: </label>
                            <input type="date"
                                className='form-input'
                                placeholder='Enter item expiration date'
                                value={this.state.expDate}
                                onChange={this.onChangeExpDate}
                                />
                        </div>
                    </div>
                    <div className='btns'>
                        <Link to='/' className="btn" type='button'>
                            Cancel
                        </Link>
                        <input type="submit" value='Save' className='btn'/>
                    </div>
                </form>
            </div>
        );
    }
}