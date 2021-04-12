import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar, Image } from 'react-bootstrap';
import { AddCreationModal } from './AddCreationModal';
import { BrowserRouter, Link, NavLink, Route} from 'react-router-dom';
    
export class CreationDetails extends Component {
    constructor(props) {
        super(props);
        this.creationId = (props.match.params.creationId);
        this.state={creation:[]}
    }

    getCreation() {
        fetch('http://localhost:52121/api/creations/' + this.creationId)
        .then(response=>response.json())
        .then(data=>{
            this.setState({creation:data})
            console.log(data)
        });
    }

    componentDidMount() {
        this.getCreation();
    }

    // componentDidUpdate() {
    //     this.getCreation();
    // }

    render() {
        const {creation}=this.state;
        let addModalClose = () => this.setState({ addModalShow: false });

        return(
            <div >
                <Image height="100px" src={'http://localhost:52121/Photos/' + creation.CreationImagePath}/>
                <span>{creation.CreationTitle}</span>
                <p>{creation.CreationDescription}</p>
                <p>{creation.CreatorId}</p>
                <Link to="/groups" className="btn btn-primary" style={{marginTop: 20}}>Return to Events</Link>
            </div>
        )
    }
}