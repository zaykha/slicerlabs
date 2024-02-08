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
import ErrorPrompt from "../prompt/ErrorPrompt";
const NavLinksarray = [
  // { title: "Home", path: "/" },
  // { title: "Services", path: "/services" },
  // { title: "Materials", path: "/materials" },
  // { title: "Learn", path: "/learn" },
  { title: "Services", path: "/services" },

  { title: "Contact Us", path: "/ContactUs" },
  { title: "FAQ", path: "/faq" },
  // { title: "Login", path: "/login" },
];

const Navbar = ({ togglesidebar, OKtoRoute }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errorPromptShow, setErrorPromptShow] = useState(false);
  const [name, setName] = useState("");
  const { isAuthenticated } = useSelector((state) => state.authentication);
  const userDetailsUnparsed = localStorage.getItem("userDetails");
  const userDetails =
    useSelector((state) => state.userDetails) ||
    JSON.parse(userDetailsUnparsed);

  const isAdmin =
    // useSelector((state) => state.userDetails).adminPrivileges ||
    userDetails?.adminPrivileges;
  const userName = userDetails?.userName;
  const cartItems = useSelector((state) => state.cartItems?.cartItems);
  const cartRedux = useSelector((state) => state.cartItems);

  const hasUndefinedProduct = cartItems?.every((item) => {
    item.pricePerUnit !== 0 &&
      item.options.material !== "" &&
      item.options.color !== "";
  });
  const [ErrorHandling, setErrorHandling] = useState({
    state: false,
    header: "",
    message: "",
  });
  const handleLinkClick = (link) => {
    // if (!OKtoRoute) {
    //   setErrorHandling({
    //     state: true,
    //     header: "An Error Occured",
    //     message:
    //       "Please Delete the current Item in the cart or Add to cart before routing to other page",
    //   });
    //  
    // } else {
    //   console.log("OK to route");
    // }
    console.log(isAdmin);
  };
  useEffect(() => {
    setIsLoading(true);
    // console.log(isAdmin, userDetails);
    setIsLoading(false);
  }, [isLoading, userName, isAdmin]);
  // useEffect(() => {
  //   location.state

  //   console.log(location.pathname)

  // }, [location]);
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
                    onClick={() => handleLinkClick()}
                  >
                    {link.title}
                  </NavLinks>
                </NavItem>
              ))}
              {!isLoading && isAuthenticated ? (
                !isLoading && isAdmin ? (
                  <NavItem>
                    <DropdownContainer>
                      <NavLinks
                        to="/adminDashboard"
                        className={
                          pathname === "/adminDashboard" ? "active" : ""
                        }
                        onClick={() => handleLinkClick()}
                      >
                        {"Admin"}
                      </NavLinks>

                      <DropdownContent>
                        <NavLinksAdmin to="/adminDashBoard">
                          Task Page
                        </NavLinksAdmin>
                        <NavLinksAdmin to="/config">Config Page</NavLinksAdmin>
                        <NavLinksAdmin to="/blog">Blog Page</NavLinksAdmin>
                        {/* <NavLinksAdminLogout to="/" onClick={handleLogout}>
                            LogOut
                          </NavLinksAdminLogout> */}
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
                      <p>{userName ? userName : "Profile"}</p>
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
                  : cartItems?.length > 0
                  ? "Add More Items"
                  : "Start 3D Printing"}
              </NavLinks1>
            </ActionItems>

            <ActionItems>
              {cartRedux.cartItems.every(
                (item) =>
                  item.pricePerUnit !== 0 &&
                  item.options.material !== "" &&
                  item.options.color !== ""
              ) ? (
                <NavLinks to="/cart">
                  <IMGTAG1 src={cart} alt="cart" />
                  {cartItems?.length > 0 && <span>{cartItems.length}</span>}
                </NavLinks>
              ) : (
                <NavLinks onClick={() => setErrorPromptShow(true)}>
                  <IMGTAG1 src={cart} alt="cart" />
                  {cartRedux.cartItems?.length > 0 && (
                    <span>{cartItems.length}</span>
                  )}
                </NavLinks>
              )}
            </ActionItems>
          </Commerce>
        </NavController>
        {errorPromptShow && (
          <ErrorPrompt
            header="Error"
            message="Please fill in the material details first."
            onClose={() => setErrorPromptShow(false)}
          />
        )}
      </Nav>
    </>
  );
};
export default Navbar;
