import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form, Table} from 'react-bootstrap';

export class AddUsersToGroupModal extends Component{
    constructor(props){
        super(props);
        this.groupId = props.groupid;
        this.state = { users: [], usersuserName: '', groupId: props.groupid };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    getUsers() {
        fetch(process.env.REACT_APP_API +'groups/users/' + this.state.groupId)
            .then(response => response.json())
            .then(data => {
                this.setState({ users: data })
            });
    }

    componentDidMount() {
        this.getUsers();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ groupId: nextProps.groupid });
        this.getUsers();
      }

    addUser (e) {
        this.setState({userName: e.target.value});
        this.getUsers();
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'groups/addusers/' + this.state.groupId,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: `"${this.state.userName}"`
        })
        .then(res=>res.json())
        .then(()=>{
            alert('Failed');
        },
        (error)=>{
            alert('User added!');
            this.getUsers();
        })
    }
    render(){
        return (
            <div className="container">
                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            View/Add Users
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Table className="mt-4 mytable" striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>
                                                Members
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.users.map(user =>
                                            <tr key={'user'+user.UserId.toString()}>
                                                <td>{user.UserFirstName + ' ' + user.UserLastName}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Col>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="GroupAdminId">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" name="UserName" onChange={this.addUser}
                                        placeholder="Username"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add User
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    }

}