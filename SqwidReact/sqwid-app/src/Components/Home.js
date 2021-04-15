import React, { Component } from 'react';
import { Button, ButtonToolbar, Image, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import style from '../site.css';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { creations: [] }
    }

    getEventCreations() {
        fetch(process.env.REACT_APP_API + 'creations')
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

        return (
            <div style={{"width":"100%"}} className="homebackground">
                <div className="headerimagecontainer">
                    <Image src="./option3.jpg" className="headerimage"></Image>
                    <h1 className="headerimagetext">Share Art With Friends</h1>
                    <Button className="headerimagebutton" href="/group">Create a Group</Button>
                </div>
                <h2 className="homeheader">Public Creations</h2>
                <div className="carddeck" style={{"width":"100%"}}>
                    {creations.map(creation =>
                    <Card key={creation.CreationId}>
                        <Card.Img variant="top" src={REACT_APP_PHOTOPATH + creation.CreationImagePath} />
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