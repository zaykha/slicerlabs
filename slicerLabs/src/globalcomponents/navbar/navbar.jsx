import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
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
} from "./navbarelement";
import logo from "../../assets/Asset 4.png";
import cart from "../../assets/shopping-cart1.png";

import { useDispatch, useSelector } from "react-redux";
const NavLinksarray = [
  { title: "Home", path: "/" },
  { title: "Services", path: "/services" },
  { title: "Materials", path: "/materials" },
  { title: "Learn", path: "/learn" },
  { title: "Contact", path: "/ContactUs" },
  // { title: "Login", path: "/login" },
];

const Navbar = ({ togglesidebar }) => {
  const { pathname } = useLocation();

  const { isAuthenticated } = useSelector((state) => state.authentication);
  const userDetails = useSelector((state) => state.userDetails);
  const cartItems = useSelector((state) => state.cartItems.cartItems);
  const hasUndefinedProduct = cartItems.some(
    (item) => !item || !item.options || !item.options.ProductId
  );
  return (
    <>
      <Nav>
        <MobileIcon onClick={togglesidebar}>
          <FaBars />
        </MobileIcon>
        <NavController>
          <NavLogo to="/">
            <IMGTAG src={logo} alt="logo" />
          </NavLogo>
          <NavbarContainer>
            <NavMenu>
              {NavLinksarray.map((link) => (
                <NavItem key={link.title}>
                  <NavLinks
                    to={link.path}
                    className={pathname === link.path ? "active" : ""}
                    // isactive={pathname === link.path}
                  >
                    {link.title}
                  </NavLinks>
                </NavItem>
              ))}
              {isAuthenticated ? (
                <NavItem>
                  <NavLinks
                    key={"userDetails"}
                    to={"/DashBoard"}
                    className={pathname === "/DashBoard" ? "active" : ""}
                    // isactive={pathname === "/login"}
                  >
                    {userDetails.userDetails.userName}
                  </NavLinks>
                </NavItem>
              ) : (
                <NavItem>
                  <NavLinks
                    key={"Login"}
                    to={"/login"}
                    className={pathname === "/login" ? "active" : ""}
                    // isActive={pathname === "/login"}
                  >
                    Login
                  </NavLinks>
                </NavItem>
              )}
            </NavMenu>
          </NavbarContainer>
          <Commerce>
            <ActionItems>
              <NavLinks1
                to="/Start3dPrinting"
                className={pathname === "/Start3dPrinting" ? "active" : ""}
                // isActive={pathname === "/Start3dPrinting"}
              >
                {pathname === "/Start3dPrinting"
                  ? "3D Printing"
                  : cartItems.length > 0
                  ? "Add More Items"
                  : "Start 3D Printing"}
              </NavLinks1>
            </ActionItems>

            <ActionItems>
              {hasUndefinedProduct ? (
                <NavLinks
                  onClick={() =>
                    alert("Please fill in the material details first.")
                  }
                >
                  <IMGTAG1 src={cart} alt="cart" />
                  {cartItems.length > 0 && <span>{cartItems.length}</span>}
                </NavLinks>
              ) : (
                <NavLinks to="/cart">
                  <IMGTAG1 src={cart} alt="cart" />
                  {cartItems.length > 0 && <span>{cartItems.length}</span>}
                </NavLinks>
              )}
            </ActionItems>
          </Commerce>
        </NavController>
      </Nav>
    </>
  );
};

export default Navbar;
