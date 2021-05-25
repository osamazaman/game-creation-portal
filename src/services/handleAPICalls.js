import React, { Component }  from 'react';
import axiosCalls from './helpers/axiosCalls.js';
import config from '../config';

class handleAPICalls extends Component {
    constructor() {
        super()
        this.state = {

        }
        this.getApi = this.getApi.bind(this);
        this.postApi = this.postApi.bind(this);
    }

    getApi(event) {
        const callRequest = this.props.src;
        fetch(config.apiBaseUrl+callRequest)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({ data })
        });
    }

    postApi(event) {
        const callRequest = this.props.src;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React POST Request Example' })
        };
        fetch(config.apiBaseUrl+callRequest, requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));

    }

    render() {
        return(
            <div>
                API Calls Responses
            </div>
        );
    }
}