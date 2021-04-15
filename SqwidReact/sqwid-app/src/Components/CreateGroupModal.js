import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class CreateGroupModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        const userId = userToken?.token;
        fetch(process.env.REACT_APP_API + 'groups/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                GroupName:event.target.GroupName.value,
                GroupDescription:event.target.GroupDescription.value,
                GroupAdminId:userId,
                GroupAdmin: null,
                Events: []
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result.GroupName + ' added!');
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
            Add Group
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="GroupAdminId">
                        <Form.Label>Group Name</Form.Label>
                        <Form.Control type="text" name="GroupName" required 
                        placeholder="Group Name"/>
                        <Form.Label>Group Description</Form.Label>
                        <Form.Control type="text" name="GroupDescription" required 
                        placeholder="Group Description"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Add Group
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