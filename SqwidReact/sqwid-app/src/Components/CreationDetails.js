import React, { Component } from 'react';
import { Button, ButtonToolbar, Image } from 'react-bootstrap';
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

        return(
            <div className="creationdetails">
                <Image height="100px" src={'http://localhost:52121/Photos/' + creation.CreationImagePath} className="creationdetailsimage"/>
                <h2 className="creationsubheading">{creation.CreationTitle}</h2>
                <h3 className="creationdetailsname">{creation.CreationCreatorFirstName + ' ' + creation.CreationCreatorLastName}</h3>
                <h4 className="creationdetailsdescription">{creation.CreationDescription}</h4>
                <Link to="/groups" className="btn btn-primary" style={{marginTop: 20, marginBottom:50}}>Return to Events</Link>
            </div>
        )
    }
}