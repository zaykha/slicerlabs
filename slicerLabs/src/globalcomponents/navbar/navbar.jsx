import React from 'react';

import {FaBars} from 'react-icons/fa';
import { IMGTAG, Nav, NavbarContainer, NavLogo, Imgicon, MobileIcon, NavMenu, NavItem, NavLinks, Commerce, ActionItems } from './navbarelement';
import logo from '../../assets/Asset 4.png';

const Navbar = ({togglesidebar}) => {
  return (
     <>
     <Nav>
     <NavLogo to='/'>
              {/* <Imgicon></Imgicon> */}
                <IMGTAG src={logo} alt='logo' />
                
            </NavLogo>
        <NavbarContainer>
            
                <MobileIcon onClick={togglesidebar}>
                  <FaBars />
                </MobileIcon>

                  <NavMenu>
                    <NavItem>
                      <NavLinks to='/'>Home</NavLinks>
                    </NavItem>

                    <NavItem>
                      <NavLinks to='/Services'>Services</NavLinks>
                    </NavItem>

                    <NavItem>
                      <NavLinks to='/Materials'>Materials</NavLinks>
                    </NavItem>

                    <NavItem>
                      <NavLinks to='/Learn'>Learn</NavLinks>
                    </NavItem>
                    
                    <NavItem>
                      <NavLinks to='/ContactUs'>Contact</NavLinks>
                    </NavItem>

                    <NavItem>
                      <NavLinks to='/Login'>Login</NavLinks>
                    </NavItem>
                    

                  </NavMenu>   
                         
        </NavbarContainer>
            <Commerce>

                  <ActionItems>
                      <NavLinks to='/Start3dPrinting'>Start 3D Printing</NavLinks>
                  </ActionItems>

                  <ActionItems>
                      <NavLinks to='/cart'>Cart</NavLinks>
                  </ActionItems>

            </Commerce>
        </Nav>
     </>
  );
};

export default Navbar;
