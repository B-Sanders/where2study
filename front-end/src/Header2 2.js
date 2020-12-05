import { Navbar, Nav, Button, Icon, Dropdown, Header, Container, Sidebar, Sidenav, Content, Toggle} from 'rsuite';
import React, { Component } from 'react';
import logo from "./images/where2study.png"
const headerStyles = {
    padding: 18,
    fontSize: 16,
    height: 200,
    justified: true,
    background:  '#006A96',
    color: 'white',
    whiteSpace: 'nowrap',
    //overflow: 'hidden'
  };
  const iconStyles = {
    width: 56,
    height: 56,
    lineHeight: '56px',
    textAlign: 'center'
  };
  
class Header2 extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        expanded: true,
      };
    }
    render() {
      const { expanded } = this.state;
      return (
            <Sidebar
              style={{ height: '100%', display: 'flex', flexDirection: 'column'}}
              collapsible
              style={{background: '#006A96'}}
            >
                <div style={headerStyles} >
                  <img src={logo} height="100" width="125" href="/"/>
                  <h2>Username</h2>
                </div>
                <Sidenav
                  expanded={expanded}
                  defaultOpenKeys={['1', '2']}
                  activeKey={this.state.activeKey}
                  style={{color: 'white'}}
                >
                    <Sidenav.Body style={{ background: '#006A96',color: 'white'}}>
                      <Nav >
                        <Nav.Item style={{color: 'white'}} eventKey="1" icon={<Icon icon="location-arrow" />}>
                          Locations
                        </Nav.Item>
                        <Nav.Item eventKey="2" icon={<Icon icon="book" />}>
                            Study Requests
                        </Nav.Item>
                        <Nav.Item href="/profile" eventKey="3" icon={<Icon icon="gear-circle"/>}>
                            Account
                        </Nav.Item>
                      </Nav>
                    </Sidenav.Body>
                </Sidenav>
                <Button appearance="primary" block>Logout</Button>
            </Sidebar>
      );
    }
}
export default Header2;