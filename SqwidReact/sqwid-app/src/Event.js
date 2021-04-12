import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CreateEventModal } from './CreateEventModal';
    
export class Event extends Component {
    constructor(props) {
        super(props);
        this.groupId = (props.match.params.groupId);
        this.state={events:[]}
    }

    getGroupEvents() {
        fetch('http://localhost:52121/api/events/groups/' + this.groupId)
        .then(response=>response.json())
        .then(data=>{
            this.setState({events:data})
            console.log(data)
        });
    }

    componentDidMount() {
        this.getGroupEvents();
    }

    // componentDidUpdate() {
    //     this.getGroupEvents();
    // }

    render() {
        const {events}=this.state;
        let addModalClose = () => this.setState({ addModalShow: false });

        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>
                                Event Name
                            </th>
                            <th>
                                Event Description
                            </th>
                            <th>
                                Event Category
                            </th>
                            <th>
                                Event Start Date
                            </th>
                            <th>
                                Event End Date
                            </th>
                            <th>
                                Event Admin
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event =>
                            <tr key={event.EventId}>
                                <td>{event.EventName}</td>
                                <td>{event.EventDescription}</td>
                                <td>{event.EventCategory}</td>
                                <td>{event.EventStartDate}</td>
                                <td>{event.EventDueDate}</td>
                                <td>{event.EventAdmin}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <Link to={`/creations/${event.EventId}`}
                                        style={{ marginRight: 30 }}
                                        className="btn btn-primary"
                                        activeclassName="is-active"
                                    >
                                        View Creations
                                    </Link>
                                    <Button variant="danger">End Event</Button>
                                </td>
                            </tr>
                            )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary" onClick={() => this.setState({ addModalShow: true })}>
                        Create Event
                    </Button>
                    <CreateEventModal show={this.state.addModalShow} onHide={addModalClose} groupId={this.groupId}></CreateEventModal>
                </ButtonToolbar>
                <Link to="/groups" className="btn btn-primary" style={{marginTop: 20}}>Return to Groups</Link>
            </div>
        )
    }
}