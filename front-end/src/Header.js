import { Navbar, Nav, Icon, Dropdown } from 'rsuite';
import React, { Component } from 'react';

class Header extends Component{
    render(){
        return(
            <Navbar>
            <Navbar.Header>

            </Navbar.Header>
            <Navbar.Body>
              <Nav>
                    <Nav.Item href="/" icon={<Icon icon="home" />}>Home</Nav.Item>
                    <Nav.Item icon={<Icon icon="book"/>}>Create Study Requests</Nav.Item>
                    <Nav.Item icon={<Icon icon="pencil"/>}>Edit Study Requests</Nav.Item>
                    <Nav.Item icon={<Icon icon=""/>}>Delete Study Requests</Nav.Item>
              </Nav>
              <Nav pullRight>
                <Nav.Item icon={<Icon icon="cog" />} >Account Settings</Nav.Item>
                <Nav.Item href="/login" icon={<Icon icon="sign-out" />} >Logout</Nav.Item>
              </Nav>
            </Navbar.Body>
          </Navbar>
        )
    };
}
export default Header;