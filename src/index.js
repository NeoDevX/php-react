import React, { Component } from 'react';
import ReactDom from 'react-dom';
const $ = require('jquery/src/core');
require('jquery/src/core/init');
require('jquery/src/ajax');
require('jquery/src/ajax/xhr');

const root = document.querySelector('#root');

class App extends Component {

    state = {
        data: []
    };

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevState) {
        if (prevState.data !== this.state.data) {
            this.getData();
        }
    }

    sendAjaxForm = async (url, e) => {
        e.preventDefault();
        const target = document.querySelector('.labelInput')
        const text = target.value.trim();

        $.ajax({
            url,
            type: "POST", 
            dataType: "text",
            data: {todo_text: text}, 
            success: function(response) {    
            },
            error: function(err) {
            }
        });

        target.value = '';
    }

    getData = () => {
        fetch('http://testdb/todoList.php', {
            method: 'GET',
        })
        .then((res) => {
            return res.text();
        })
        .then((response) => {
            const data = response.trim().split('\t');
            this.setState({ data });
        });
    }

    render() {

        const { data } = this.state;
        const { sendAjaxForm } = this;

        const todos = data.map((todo, id) => {
            return (
                <li className="list-group-item" key={id}>
                    { todo }
                </li>
            );
        });

        return (
            <div className="container ml-5 text-center">
                <h1 className="f">Todo List</h1>
                <ul className="list-group mt-3">
                    { todos }
                </ul>
                <form className="form d-flex flex-column align-items-center">
                    <input className="m-3 p-1 w-25 text-center labelInput" 
                        type="text"
                        name="todo" />
                    <button className="btn btn-danger mt-3 w-25 h-25"
                        onClick={ (e) => {
                            sendAjaxForm('http://testdb/addItem.php', e) 
                        }}>
                        Add
                    </button>
                </form>
            </div>
        );
    }
};

ReactDom.render(<App />, root);