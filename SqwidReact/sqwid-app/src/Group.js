import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {CreateGroupModal} from './CreateGroupModal';

export class Group extends Component {

    constructor(props) {
        super(props);
        this.state={groups:[], addModalShow: false}
    }

    getUsersGroups() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        const userId = userToken?.token;
        let urlString = 'http://localhost:52121/api/users/groups/' + userId; //process.env.REACT_APP_API
        console.log(urlString);
        fetch('http://localhost:52121/api/users/groups/' + userId)
        .then(response=>response.json())
        .then(data=>{
            this.setState({groups:data})
        });
    }

    componentDidMount() {
        this.getUsersGroups();
    }

    componentDidUpdate() {
        this.getUsersGroups();
    }

    render() {
        const {groups, groupname, groupdescription, adminid}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
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
                                <td>{group.AdminId}</td>
                                <td>Leave Group</td>
                            </tr>
                            )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary" onClick={()=>this.setState({addModalShow:true})}>
                        Create Group

                        <CreateGroupModal show={this.state.addModalShow} onHide={addModalClose}></CreateGroupModal>
                    </Button>
                </ButtonToolbar>
            </div>
        )
    }
}