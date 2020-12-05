import {Nav, Button, Icon, Sidebar, Sidenav} from 'rsuite';
import React from 'react';
import logo from "./images/where2study.png"
import db from "./base"

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
  //const email = db.auth().currentUser.email.split('@')[0]

  
class Header2 extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        expanded: true,
      };
    }

    render() {
      const { expanded } = this.state;
      console.log(db.auth().currentUser.email)
      return (
            <Sidebar
             
              collapsible
              style={{background: '#006A96'}}
            >
                <div style={headerStyles} >
                  <img src={logo} style={{marginLeft: 55}} height="100" width="125" href="/"/>
                  <h4><span style={{marginLeft: 0}}>Welcome </span></h4>
                </div>
                <Sidenav
                  expanded={expanded}
                  defaultOpenKeys={['1', '2']}
                  activeKey={this.state.activeKey}
                  style={{color: 'yellow'}}
                >
                    <Sidenav.Body style={{ background: '#006A96',color: 'white'}}>
                      <Nav >
                        <Nav.Item href="/" eventKey="2" icon={<Icon style={{color:"#FFCD00"}} icon="book" />}>
                        <span style={{color:'white'}}><strong>Study Requests</strong></span>
                        </Nav.Item>
                        <Nav.Item  eventKey="1" icon={<Icon style={{color:"#FFCD00"}} icon="location-arrow" />}>
                         <span style={{ color:'white' }}><strong>Locations</strong></span>
                        </Nav.Item>
                        <Nav.Item style={{marginTop: 300}} href="/profile" eventKey="3" size="m" icon={<Icon style={{color:"white",fontSize: 13,marginTop: -10,marginLeft: 110}} icon="gear-circle"/>}>
                        <br />
                        <span style={{color:'white',marginLeft: 45}}><strong>Account</strong></span>
                        </Nav.Item>
                      </Nav>
                    </Sidenav.Body>
                </Sidenav>
                <Button onClick={() => db.auth().signOut()} style={{marginLeft: 100}} appearance="white">Logout</Button>
            </Sidebar>
      );
    }
}
export default Header2;