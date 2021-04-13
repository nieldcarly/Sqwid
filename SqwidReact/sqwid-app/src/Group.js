import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { CreateGroupModal } from './CreateGroupModal';
import { BrowserRouter, Link, NavLink, Route} from 'react-router-dom';
import { AddUsersToGroupModal } from './AddUsersToGroupModal';

export class Group extends Component {

    constructor(props) {
        super(props);
        this.state = { groups: [], addModalShow: false }
    }

    getUsersGroups() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        const userId = userToken?.token;
        fetch('http://localhost:52121/api/users/groups/' + userId) //process.env.REACT_APP_API
            .then(response => response.json())
            .then(data => {
                this.setState({ groups: data })
            });
    }

    componentDidMount() {
        this.getUsersGroups();
    }

    // componentDidUpdate() {
    //     this.getUsersGroups();
    // }

    render() {
        const { groups } = this.state;
        let addUserGroupModalClose = () => this.setState({ addUserGroupModalShow: false });
        let addModalClose = () => this.setState({ addModalShow: false });
        return (
            <div >
                <Table className="mt-4 mytable" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>
                                Group Name
                            </th>
                            <th>
                                Group Description
                            </th>
                            <th>
                                Group Admin
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map(group =>
                            <tr key={group.GroupId}>
                                <td>{group.GroupName}</td>
                                <td>{group.GroupDescription}</td>
                                <td>{group.GroupAdmin.UserFirstName + ' ' + group.GroupAdmin.UserLastName}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <Link to={`/event/${group.GroupId}`}
                                        style={{ marginRight: 30 }}
                                        className="btn btn-primary"
                                        activeclassName="is-active"
                                    >
                                        View Events
                                    </Link>
                                    <Button className="yellowbtn" style={{ marginRight: 30 }} onClick={() => this.setState({ addUserGroupModalShow: true })}>
                                        Add Users to Group
                                    </Button>
                                    <Button variant="danger">Leave Group</Button>
                                </td>
                                {console.log(group.GroupId)}
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary" onClick={() => this.setState({ addModalShow: true })}>
                        Create Group
                    </Button>
                    <CreateGroupModal show={this.state.addModalShow} onHide={addModalClose}></CreateGroupModal>
                    <AddUsersToGroupModal show={this.state.addUserGroupModalShow} onHide={addUserGroupModalClose}></AddUsersToGroupModal>
                </ButtonToolbar>
            </div>
        )
    }
}