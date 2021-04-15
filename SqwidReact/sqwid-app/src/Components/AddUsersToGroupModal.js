import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddUsersToGroupModal extends Component{
    constructor(props){
        super(props);
        // this.groupId = props.groupId;
        this.state = { userName: '' };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    addUser (e) {
        this.setState({userName: e.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'groups/addusers/5',{
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
                            Add Users
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="GroupAdminId">
                                        <Form.Label>UserName</Form.Label>
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