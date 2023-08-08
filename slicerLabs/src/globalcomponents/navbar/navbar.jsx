import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  NavLinksAdmin,
  DropdownContainer,
  DropdownContent,
  NavLinksAdminLogout,
} from "./navbarelement";
import logo from "../../assets/Asset 4.png";
import cart from "../../assets/shopping-cart1.png";

import { useDispatch, useSelector } from "react-redux";
import { setAuthenticationStatus } from "../../ReduxStore/actions/Authentication";
import { resetCartCount } from "../../ReduxStore/actions/cartCountActions";
import { resetCartState } from "../../ReduxStore/reducers/CartItemReducer";
import { resetAddressDetails } from "../../ReduxStore/reducers/MapServicesReducer";
import { resetUserDetails } from "../../ReduxStore/actions/userDetails";
import { doc, getDoc } from "firebase/firestore";
const NavLinksarray = [
  { title: "Home", path: "/" },
  { title: "Services", path: "/services" },
  { title: "Materials", path: "/materials" },
  { title: "Learn", path: "/learn" },
  { title: "Contact", path: "/ContactUs" },
  // { title: "Login", path: "/login" },
];

const Navbar = ({ togglesidebar, userName }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const { isAuthenticated } = useSelector((state) => state.authentication);

  
  const isAdmin = useSelector((state) => state.userDetails);
  const cartItems = useSelector((state) => state.cartItems.cartItems);
  const hasUndefinedProduct = cartItems.some(
    (item) => !item || !item.options || !item.options.ProductId
  );

  useEffect(() => {
    console.log(isAdmin)
    setName(userName)
  }, [dispatch]);
  const handleLogout = () => {
    localStorage.clear();

    //reset redux store
    dispatch(setAuthenticationStatus(false));
    dispatch(resetCartCount());
    dispatch(resetCartState());
    dispatch(resetAddressDetails());
    dispatch(resetUserDetails());

    navigate("/");
  };
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
                isAdmin ? (
                  <NavItem>
                    <DropdownContainer>
                      <NavLinks
                        to="/dashboard"
                        className={pathname === "/dashboard" ? "active" : ""}
                      >
                        {"Admin"}
                      </NavLinks>

                      <DropdownContent>
                        <NavLinksAdmin to="/dashBoard">Task Page</NavLinksAdmin>
                        <NavLinksAdmin to="/config">Config Page</NavLinksAdmin>
                        <NavLinksAdmin to="/blog">Blog Page</NavLinksAdmin>
                        <NavLinksAdminLogout to="/" onClick={handleLogout}>
                          LogOut
                        </NavLinksAdminLogout>
                      </DropdownContent>
                    </DropdownContainer>
                  </NavItem>
                ) : (
                  <NavItem>
                    <NavLinks
                      key={"userDetails"}
                      to={"/DashBoard"}
                      className={pathname === "/DashBoard" ? "active" : ""}
                      // isactive={pathname === "/login"}
                    >
                      <p>{name ? name : "Profile"}</p>
                    </NavLinks>
                  </NavItem>
                )
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
