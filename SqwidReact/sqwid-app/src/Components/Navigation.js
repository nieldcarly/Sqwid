import React,{Component} from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import style from '../site.css';
  

function ProfileName(props) {
    return <span>{props.userName}'s Creations</span>;
}
function Guest() {
    return <NavDropdown.Item href="/login">Log In</NavDropdown.Item>;
}

export class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state={user:{}}
    }

    getUser() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        const userId = userToken?.token;
        fetch(process.env.REACT_APP_API + 'users/' + userId)
        .then(response=>response.json())
        .then(data=>{
            this.setState({user:data})
        });
    }

    componentDidMount() {
        this.getUser();
    }

    NavGreeting(props) {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        const userId = userToken?.token;
        if (userId != null) {
            return <NavDropdown.Item href="/user"><ProfileName userName={props.user.UserFirstName}></ProfileName></NavDropdown.Item>
        }
        return <Guest></Guest>
    }

    CheckLoggedIn(props) {
        if (sessionStorage.getItem('token') != null) {
            if (props.buttonText == "View Groups") {
                return <NavDropdown.Item href="/groups">{props.buttonText}</NavDropdown.Item>
            } else if (props.buttonText=="View My Events") {
                return <NavDropdown.Item href="/userevents">{props.buttonText}</NavDropdown.Item>
            } else if (props.buttonText=="Create") {
                return <NavDropdown.Item href="/create">{props.buttonText}</NavDropdown.Item>
            } else {
                return <NavDropdown.Item href="/logout">{props.buttonText}</NavDropdown.Item>
            }
        }
        else {
            if (props.buttonText != "Log Out") {
                return <NavDropdown.Item href="/login">{props.buttonText}</NavDropdown.Item>
            } else {
                return null
            }
        }
    }

    render() {
        const {user}=this.state;

        return(
            <Navbar bg="dark" expand="lg" className="navstyle">
                <Nav>
                    <NavDropdown title={
                    <span className="navicons">
                        <span className="iconify menuicon" data-icon="ant-design:menu-outlined" data-inline="false"></span>
                        <span className="iconify sqwidusericon" data-icon="foundation-social-squidoo" data-inline="false"></span>
                    </span>} id="basic-nav-dropdown">
                        <this.NavGreeting user={user}></this.NavGreeting>
                        <this.CheckLoggedIn buttonText="View Groups"></this.CheckLoggedIn>
                        <this.CheckLoggedIn buttonText="View My Events"></this.CheckLoggedIn>
                        <this.CheckLoggedIn buttonText="Create"></this.CheckLoggedIn>
                        <this.CheckLoggedIn buttonText="Log Out"></this.CheckLoggedIn>
                    </NavDropdown>
                </Nav>
            </Navbar>
        )
    }
}