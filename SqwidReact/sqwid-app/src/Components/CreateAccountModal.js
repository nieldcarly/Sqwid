import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class CreateAccountModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'users',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                UserFirstName:event.target.UserFirstName.value,
                UserLastName:event.target.UserLastName.value,
                UserEmail:event.target.UserLastName.value,
                UserUserName: event.target.UserUserName.value,
                UserPassword: event.target.UserPassword.value,
                Comments: [],
                Creations: [],
                Events: [],
                Groups: [],
                UserGroups: []
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result.UserUserName + ' added!');
        },
        (error)=>{
            alert('Failed');
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
            Create Account
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="UserFirstName" required 
                        placeholder="First Name"/>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="UserLastName" required 
                        placeholder="Last Name"/>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="UserEmail" required 
                        placeholder="Email"/>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="UserUserName" required 
                        placeholder="Username"/>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="UserPassword" required 
                        placeholder="Password"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Create Account
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