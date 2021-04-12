import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form, Image} from 'react-bootstrap';

export class AddCreationModal extends Component{
    constructor(props){
        super(props);
        this.eventId = props.eventId;
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photoFileName = "anonymous.png";
    imageSource = 'http://localhost:52121/Photos/' + this.photoFileName;

    componentDidMount(){
        fetch('http://localhost:52121/api/creations')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        const userId = userToken?.token;
        fetch('http://localhost:52121/api/creations/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                CreationImagePath: this.photoFileName,
                CreationTitle:event.target.CreationTitle.value,
                CreationDescription:event.target.CreationDescription.value,
                CreationCreatorId:userId,
                CreationNumFavorites: null,
                CreationIsPublic: true,
                CreationRating: null,
                CreationEventId:this.eventId,
                CreationGroupId: null,
                CreationCreator: null,
                CreationEvent: null,
                CreationGroup: null,
                Comments: []
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result.CreationTitle + ' added!');
        },
        (error)=>{
            alert('Failed');
        })
    }

    handleFileSelected(event){
        event.preventDefault();
        this.photoFileName=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch('http://localhost:52121/api/creations/savefile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imageSource = 'http://localhost:52121/Photos/'+result;
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
                            Add Creation
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="CreationId">
                                        <Form.Label>Creation Title</Form.Label>
                                        <Form.Control type="text" name="CreationTitle" required 
                                        placeholder="Creation Title"/>
                                        <Form.Label>Creation Description</Form.Label>
                                        <Form.Control type="text" name="CreationDescription" required 
                                        placeholder="Creation Description"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Creation
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col sm={6}>
                                <Image height="200px" src={this.imageSource}/>
                                <input onChange={this.handleFileSelected} type="File"/>
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