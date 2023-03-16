import React,{useEffect} from 'react';
import { useLocation } from 'react-router-dom';
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
import { useCartCount } from '../../App';


const NavLinksarray = [  
  {    title: 'Home',    path: '/',  },  
  {    title: 'Services',    path: '/services',  },  
  {    title: 'Materials',    path: '/materials',  },  
  {    title: 'Learn',    path: '/learn',  },  
  {    title: 'Contact',    path: '/ContactUs',  },  
  {    title: 'Login',    path: '/login',  },];


const Navbar = ({togglesidebar}) => {
  const { pathname } = useLocation();
  const { cartCount ,setCartCount } = useCartCount();
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    // setCart(cart || []);
  
    // Update cart count
    const count = cart ? cart.length : 0;
    setCartCount(count);
  }, [setCartCount]);



  return (
     <>
     <Nav>
      <NavController>

      
     <NavLogo to='/'>
                <IMGTAG src={logo} alt='logo' />
                
            </NavLogo>
        <NavbarContainer>
            
                <MobileIcon onClick={togglesidebar}>
                  <FaBars />
                </MobileIcon>

                  <NavMenu>
                    {NavLinksarray.map((link) => (
                      <NavItem>
                    <NavLinks key={link.title} to={link.path} isActive={pathname === link.path}>
                      {link.title}
                    </NavLinks>
                    </NavItem>
                    ))}
                  </NavMenu>   
                         
        </NavbarContainer>
            <Commerce>

                  <ActionItems>
                      <NavLinks1 to='/Start3dPrinting' isActive={pathname === '/Start3dPrinting' } >
                          {pathname === '/Start3dPrinting' ? '3D Printing' : 'Start 3D Printing'}
                      </NavLinks1>
                  </ActionItems>

                  <ActionItems>
                      <NavLinks to='/cart'>
                        <IMGTAG1 src={cart} alt='cart' />
                        {cartCount > 0 && <span>{cartCount}</span>}
                      </NavLinks>
                  </ActionItems>

            </Commerce>
        </NavController>

        </Nav>
     </>
  );
};

export default Navbar;
