import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class CreateEventModal extends Component{
    constructor(props){
        super(props);
        this.groupId = props.groupId;
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        const userId = userToken?.token;
        fetch('http://localhost:52121/api/events/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EventName:event.target.EventName.value,
                EventDescription:event.target.EventDescription.value,
                EventGroupId:this.groupId,
                EventAdmin: userId,
                EventStartDate: null,
                EventDueDate: null,
                EventPublicVoting: false,
                EventCategory: event.target.EventCategory.value,
                EventAdminNavigation: null,
                EventGroup: null
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result.EventName + ' added!');
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
            Add Event
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="GroupAdminId">
                        <Form.Label>EventName</Form.Label>
                        <Form.Control type="text" name="EventName" required 
                        placeholder="Event Name"/>
                        <Form.Label>EventDescription</Form.Label>
                        <Form.Control type="text" name="EventDescription" required 
                        placeholder="Event Description"/>
                        <Form.Label>EventCategory</Form.Label>
                        <Form.Control type="text" name="EventCategory" required 
                        placeholder="Event Category"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Add Event
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