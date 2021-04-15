import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class LeaveGroupModal extends Component{
    constructor(props){
        super(props);
        console.log('hello world')
        console.log(props);
        this.groupId = props.groupId;
        this.state = { userName: '' };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    addUser (e) {
        this.setState({userName: e.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        const userId = userToken?.token;
        fetch('http://localhost:52121/api/groups/leavegroup/' + this.groupId +'/' + userId,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
        })
        .then(res=>res.json())
        .then(()=>{
            alert('Failed');
        },
        (error)=>{
            alert('You have been successfully removed from the group.');
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
                                    <Form.Group>
                                        <Form.Label>Are you sure you want to leave the group?</Form.Label>
                                        <Button variant="primary" type="submit">
                                            Yes, Leave Group
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