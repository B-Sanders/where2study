import {Nav, Button, Icon, Sidebar, Sidenav} from 'rsuite';
import React from 'react';
import logo from "./images/where2study.png"
import db from "./base"

const headerStyles = {
    fontSize: 16,
    justified: true,
    background:  '#006A96',
    color: 'white',
    height: '100%',
    overflow: 'auto',
    position: 'fixed'
  };

  
class Header2 extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        expanded: true,
        display_name: ""
      };
       this.loadUser.bind(this);
       this.loadUser();
    }
    
  loadUser() {
    var uniqueId = window.localStorage.getItem('loginToken');
    var data;
    /** Load the user data */
    db.database().ref("Users/" + uniqueId).once('value').then( snapshot => {
       data =  snapshot.val();
       this.state.display_name = "Welcome " + data.display_name
    })
  }

    render() {
      const { expanded } = this.state;
      console.log(window.localStorage.getItem('loginToken'))
      return (
            <Sidebar style={headerStyles}
            >
                <div style={{background:  '#006A96'}}>
                  <a href="/">
                    <img src={logo} style={{marginLeft: 55}} height="100" width="125"/>
                  </a>
                  <h4><span style={{marginLeft: 15, color: 'white'}}>{this.state.display_name}</span></h4>
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
                        <Button size="lg" onClick={() => {
                          window.localStorage.removeItem('loginToken');
                          this.props.history.push('/login');
                        }} style={{marginLeft: 90}} color="red" appearance="primary">Logout</Button>
                      </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </Sidebar>
      );
    }
}
export default Header2;