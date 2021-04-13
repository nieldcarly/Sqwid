import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
import Login from './Login';
import style from './site.css';
import useToken from './useToken';
  

function ProfileName(props) {
    return <span>{props.userName}</span>;
}
function Guest() {
    const { token, setToken } = useToken();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }
    return <NavLink className="d-inline p-2 bg-dark text-white" to="/login">Log In</NavLink>;
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
        fetch('http://localhost:52121/api/users/' + userId)
        .then(response=>response.json())
        .then(data=>{
            this.setState({user:data})
        });
    }

    componentDidMount() {
        this.getUser();
    }

    NavGreeting(props) {
        console.log(props.user.UserFirstName)
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        const userId = userToken?.token;
        if (userId != null) {
            return <NavLink className="d-inline p-2 bg-dark text-white" to="/user"><ProfileName userName={props.user.UserFirstName}></ProfileName></NavLink>
        }
        return <Guest></Guest>
    }

    render() {
        const {user}=this.state;

        return(
            <Navbar bg="dark" expand="lg" className="navstyle">
                <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                            Home
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/groups">
                            My Groups
                        </NavLink>
                        <this.NavGreeting user={user}></this.NavGreeting>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}