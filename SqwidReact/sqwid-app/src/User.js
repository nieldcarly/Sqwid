import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar, Image, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

import style from './site.css';
    
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

    // componentDidUpdate() {
    //     this.getEventCreations();
    // }

    render() {
        const {creations}=this.state;
        let addModalClose = () => this.setState({ addModalShow: false });

        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr style={{textAlign:"center", fontSize:28}}>
                            <th colspan="5">
                                My Creations
                            </th>
                        </tr>
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
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {creations.map(creation =>
                            <tr key={creation.CreationId}>
                                <td style={{textAlign:"center"}}><Image height="100px" src={'http://localhost:52121/Photos/' + creation.CreationImagePath} className="user-cards"/></td>
                                <td>{creation.CreationTitle}</td>
                                <td>{creation.CreationDescription}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <Link to={`/creationdetails/${creation.CreationId}`}
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
                <div className="carddeck">
                    {creations.map(creation =>
                        <Card>
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