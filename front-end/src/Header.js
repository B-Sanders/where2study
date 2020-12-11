import { Nav, Button, Icon, Sidebar, Sidenav, Header } from "rsuite";
import React from "react";
import logo from "./images/where2study.png";
import db from "./base";
import styled from "styled-components";
import { DataContext } from "./state/context";

const headerStyles = {
  fontSize: 16,
  // justified: true,
  // background:  '#006A96',
  // color: 'white',
  // height: '100%',
  // overflow: 'auto',
  // position: 'fixed'
};

const SideBarContainer = styled.div`
  height: 100%;
  width: 260px;
  background: #006a96;
  .rs-sidebar {
    height: 100%;
  }
  /* overflow-y: scroll; */
  /* display: flex; */
  /* flex-direction: row; */
`;

const LogoutSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 200px;
  margin-top: auto;
  margin-bottom: 166px;
`;

const TopButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledSidebar = styled(Sidebar)`
  height: 85%;
  position: fixed;
  display: flex;
  flex-direction: column;
  background: "#006A96";
`;

const StyledNavItem = styled(Nav.Item)`
  /* margin-bottom: 10px; */
  height: 70px;
  span {
    color: white;
  }
  hover,span: hover{
    color: black;
  }

  
`;

const AccountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  padding: 15px;
  cursor: pointer;
`;


class Header2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
      display_name: "",
    };
  }
    render() {
      const { expanded } = this.state;
      return (
          <SideBarContainer>
            <div style={{ height: '180px', width: '260px', background:  '#006A96'}}>
                  <a href="/">
                    <img src={logo} style={{marginLeft: 55}} height="100" width="125"/>
                  </a>
                  {this.context.state.user.display_name && <h4><span style={{marginLeft: 15, color: 'white'}}>{`Welcome ${this.context.state.user.display_name}!`}</span></h4> }
            </div>
            <StyledSidebar
            history={this.props.history}
            style={headerStyles}
            >  
                <Sidenav
                  expanded={expanded}
                  defaultOpenKeys={['1', '2']}
                  activeKey={this.state.activeKey}
                  style={{color: 'yellow'}}
                >
                    <Sidenav.Body style={{ background: '#006A96',color: 'white'}}>
                      <Nav >
                        <TopButtonContainer>
                        <StyledNavItem href="/" eventKey="2" icon={<Icon style={{color:"#FFCD00"}} icon="book" />}>
                        <span><strong>Study Requests</strong></span>
                        </StyledNavItem>
                        <StyledNavItem href="/locations" eventKey="1" icon={<Icon style={{color:"#FFCD00"}} icon="location-arrow" />}>
                         <span><strong>Locations</strong></span>
                        </StyledNavItem>
                        </TopButtonContainer>
                      </Nav>
                    </Sidenav.Body>
                </Sidenav>
                <LogoutSettingsContainer>
                <AccountWrapper onClick={() => this.props.history.push('/profile')}>
                  <Icon style={{color:"white",fontSize: 13,marginTop: -10}} icon="gear-circle"/>
                  <br />
                  <span style={{color:'white',}}><strong>Account</strong></span>
                </AccountWrapper>
                
                <Button size="lg" onClick={() => {
                  db.auth().signOut().then(() => {
                    this.props.history.push('/login');
                    window.localStorage.removeItem('loginToken');
                  })
                }} style={{}} color="red" appearance="primary">Logout</Button>
                </LogoutSettingsContainer>
            </StyledSidebar>
            </SideBarContainer>
      );
    }
}

Header2.contextType = DataContext;
export default Header2;
