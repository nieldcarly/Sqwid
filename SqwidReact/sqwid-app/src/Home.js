import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar, Image, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { AddCreationModal } from './AddCreationModal';
import { Link } from 'react-router-dom';
import style from './site.css';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { creations: [] }
    }

    getEventCreations() {
        fetch('http://localhost:52121/api/creations')
            .then(response => response.json())
            .then(data => {
                this.setState({ creations: data })
                console.log(data)
            });
    }

    componentDidMount() {
        this.getEventCreations();
    }

    // componentDidUpdate() {
    //     this.getEventCreations();
    // }

    render() {
        const { creations } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });

        return (
            <div style={{"width":"100%"}}>
                <div className="headerimagecontainer">
                    <Image src="./header3.jpg" className="headerimage"></Image>
                    <Button className="headerimagetext">Share Art with Friends</Button>
                </div>
                <h2 className="homeheader">Public Creations</h2>
                <div className="carddeck" style={{"width":"100%"}}>
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