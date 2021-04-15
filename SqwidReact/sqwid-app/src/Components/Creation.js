import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar, Image, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { AddCreationModal } from './AddCreationModal';
import { Link } from 'react-router-dom';
import style from '../site.css';

export class Creation extends Component {
    constructor(props) {
        super(props);
        this.eventId = (props.match.params.eventId);
        this.state = { creations: [] }
    }

    getEventCreations() {
        fetch('http://localhost:52121/api/creations/event/' + this.eventId)
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
            <div style={{width:"100%"}}>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>
                                Preview
                            </th>
                            <th>
                                Title
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                                Creator
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {creations.map(creation =>
                            <tr key={creation.CreationId}>
                                <td><Image height="100px" src={'http://localhost:52121/Photos/' + creation.CreationImagePath} /></td>
                                {/* <td>{creation.ImagePath}</td> */}
                                <td>{creation.CreationTitle}</td>
                                <td>{creation.CreationDescription}</td>
                                <td>{creation.CreationCreatorFirstName + ' ' + creation.CreationCreatorLastName}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <Link to={`/creations/${creation.CreationId}`}
                                        style={{ marginRight: 30 }}
                                        className="btn btn-primary"
                                        activeclassName="is-active"
                                    >
                                        View Creation
                                    </Link>
                                    <Button variant="danger">Delete Creation</Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                {creations.map(creation =>
                <Card style={{ width: '18rem' }}>
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
                <ButtonToolbar>
                    <Button variant="primary" onClick={() => this.setState({ addModalShow: true })}>
                        Add Creation
                    </Button>
                    <AddCreationModal show={this.state.addModalShow} onHide={addModalClose} eventId={this.eventId}></AddCreationModal>
                </ButtonToolbar>
                <Link to="/groups" className="btn btn-primary" style={{ marginTop: 20 }}>Return to Events</Link>
            </div>
        )
    }
}