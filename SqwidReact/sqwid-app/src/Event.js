import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

export class Event extends Component {

    constructor(props) {
        super(props);
        this.state={groups:[]}
    }

    getGroupEvents() {
        // const tokenString = sessionStorage.getItem('token');
        // const userToken = JSON.parse(tokenString);
        // const userId = userToken?.token
        let urlString = 'http://localhost:52121/api/events/groups/' + eventId; //process.env.REACT_APP_API
        console.log(urlString);
        fetch('http://localhost:52121/api/events/groups/' + eventId)
        .then(response=>response.json())
        .then(data=>{
            this.setState({events:data})
        });
    }

    componentDidMount() {
        this.getGroupEvents();
    }

    componentDidUpdate() {
        this.getGroupEvents();
    }

    render() {
        const {events, eventname, eventdescription, eventadmin}=this.state;
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
                        {groups.map(event =>
                            <tr key={event.EventId}>
                                <td>{event.EventName}</td>
                                <td>{event.EventDescription}</td>
                                <td>{event.EventCategory}</td>
                                <td>{event.EventStartDate}</td>
                                <td>{event.EventDueDate}</td>
                                <td>{event.AdminId}</td>
                                <td>End Event</td>
                            </tr>
                            )}
                    </tbody>
                </Table>
            </div>
        )
    }
}