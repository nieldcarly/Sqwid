import React, { Component } from 'react';
import { Button, ButtonToolbar, Image, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

import style from '../site.css';
    
export class User extends Component {
    constructor(props) {
        super(props);
        this.state={creations:[]}
    }

    getEventCreations() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        const userId = userToken?.token;
        fetch('http://localhost:52121/api/creations/user/' + userId)
        .then(response=>response.json())
        .then(data=>{
            this.setState({creations:data})
            console.log(data)
        });
    }

    componentDidMount() {
        this.getEventCreations();
    }

    componentDidUpdate() {
        this.getEventCreations();
    }

    render() {
        const {creations}=this.state;
        let addModalClose = () => this.setState({ addModalShow: false });

        return(
            <div className="generalbackground">
                <div className="carddeck" style={{width: "100%"}}>
                    {creations.map(creation =>
                        <Card key={creation.CreationId}>
                            <Card.Img variant="top" src={'http://localhost:52121/Photos/' + creation.CreationImagePath} />
                            <Card.Body>
                                <Card.Title>{creation.CreationTitle}</Card.Title>
                                <Card.Text>
                                    {creation.CreationDescription}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>{creation.CreationCreatorFirstName + ' ' + creation.CreationCreatorLastName}</ListGroupItem>
                            </ListGroup>
                            <Card.Body>
                                <Card.Link href={`/creationdetails/${creation.CreationId}`} className="btn btn-primary" style={{"width":"min-content"}}>View Creation</Card.Link>
                                <Card.Link href="#" className="btn btn-danger" style={{"width":"min-content"}}>Delete Creation</Card.Link>
                            </Card.Body>
                        </Card>
                        )}
                </div>
            </div>
        )
    }
}