import React from 'react';

import {FaBars} from 'react-icons/fa';
import { 
  IMGTAG,
  IMGTAG1,
   Nav,
   NavController, 
   NavbarContainer, 
   NavLogo, 
   Imgicon,
   MobileIcon, 
   NavMenu, 
   NavItem, 
   NavLinks, 
   NavLinks1, 
   Commerce, 
   ActionItems,
  
   
  } from './navbarelement';
import logo from '../../assets/Asset 4.png';
import cart from '../../assets/shopping-cart1.png';

const Navbar = ({togglesidebar}) => {
  return (
     <>
     <Nav>
      <NavController>

      
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
                      <NavLinks1 to='/Start3dPrinting'>Start 3D Printing</NavLinks1>
                  </ActionItems>

                  <ActionItems>
                      <NavLinks to='/cart'>
                        <IMGTAG1 src={cart} alt='cart' />
                      </NavLinks>
                  </ActionItems>

            </Commerce>
        </NavController>

        </Nav>
     </>
  );
};

export default Navbar;
