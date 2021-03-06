import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { BrowserRouter, Link, NavLink, Route} from 'react-router-dom';

export class UserEvents extends Component {

    constructor(props) {
        super(props);
        this.state = { activeEvents: [], pastEvents: [] }
    }

    getActiveUserEvents() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        const userId = userToken?.token;
        fetch(process.env.REACT_APP_API + 'events/active/user/' + userId) //process.env.REACT_APP_API
            .then(response => response.json())
            .then(data => {
                this.setState({ activeEvents: data })
            });
    }

    getPastUserEvents() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        const userId = userToken?.token;
        fetch(process.env.REACT_APP_API + 'events/past/user/' + userId) //process.env.REACT_APP_API
            .then(response => response.json())
            .then(data => {
                this.setState({ pastEvents: data })
            });
    }

    componentDidMount() {
        this.getActiveUserEvents();
        this.getPastUserEvents();
    }

    // componentDidUpdate() {
    //     this.getUsersGroups();
    // }

    render() {
        const { activeEvents } = this.state;
        const { pastEvents } = this.state;

        return (
            <div className="fade-in">
                <h2 style={{width:"100%", display:"flex"}} className="subheadings">Active Events</h2>
                <Table className="mt-4 mytable" striped bordered hover size="sm">
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
                                Event End Date Date
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeEvents.map(event =>
                            <tr key={event.EventId}>
                                <td>{event.EventName}</td>
                                <td>{event.EventDescription}</td>
                                <td>{event.EventCategory}</td>
                                <td>{event.EventStartDate}</td>
                                <td>{event.EventDueDate}</td>

                                <td style={{ textAlign: 'center' }}>
                                    <Link to={`/creations/${event.EventId}`}
                                        style={{ marginRight: 30 }}
                                        className="btn btn-primary"
                                    >
                                        View Creations
                                    </Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <h2 className="subheadings">Past Events</h2>
                <Table className="mt-4 mytable" striped bordered hover size="sm">
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
                                Event End Date Date
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {pastEvents.map(event =>
                            <tr key={event.EventId}>
                                <td>{event.EventName}</td>
                                <td>{event.EventDescription}</td>
                                <td>{event.EventCategory}</td>
                                <td>{event.EventStartDate}</td>
                                <td>{event.EventDueDate}</td>

                                <td style={{ textAlign: 'center' }}>
                                    <Link to={`/creations/${event.EventId}`}
                                        style={{ marginRight: 30 }}
                                        className="btn btn-primary"
                                    >
                                        View Creations
                                    </Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        )
    }
}