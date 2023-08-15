import React, { useEffect, useState } from "react";
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
} from "./Sidebarelement";
import logo from "../../assets/Asset 4.png";
import cart from "../../assets/shopping-cart1.png";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticationStatus } from "../../ReduxStore/actions/Authentication";
import { resetCartCount } from "../../ReduxStore/actions/cartCountActions";
import { resetCartState } from "../../ReduxStore/reducers/CartItemReducer";
import { resetAddressDetails } from "../../ReduxStore/reducers/MapServicesReducer";
import { resetUserDetails } from "../../ReduxStore/actions/userDetails";
import { doc, getDoc } from "firebase/firestore";
import ErrorPrompt from "../prompt/ErrorPrompt";
import {
  ActionItems,
  Commerce,
  DropdownContainer,
  DropdownContent,
  NavItem,
  NavLinks,
  NavLinks1,
  NavLinksAdmin,
  NavLinksAdminLogout,
} from "../navbar/navbarelement";
import styled from "styled-components";
const SideLinksarray = [
  { title: "Home", path: "/" },
  { title: "Services", path: "/services" },
  { title: "Materials", path: "/materials" },
  { title: "Learn", path: "/learn" },
  { title: "Contact", path: "/ContactUs" },
  //   { title: "Login", path: "/login" },
];
const ActionItemsSideBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  &:hover {
    color: #fff;
  }

  &.active {
    border-bottom: 3px solid #fbae1a;
  }
`;
export const SidebarDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #48b2e5;
    transition: 0.2s ease-in-out;
  }
`;
export const DropdownContent1 = styled.div`
  display: block;
  position: relative;
  top: 100%;
  left: 0;
  background: linear-gradient(
    180deg,
    rgba(8, 51, 71, 0.93) 0%,
    rgba(0, 80, 118, 0.93) 100%
  );
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  min-width: 160px;
`;
const Sidebar = ({ togglesidebar, isOpen }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [errorPromptShow, setErrorPromptShow] = useState(false);
  const [name, setName] = useState("");
  const { isAuthenticated } = useSelector((state) => state.authentication);
  const userDetailsUnparsed = localStorage.getItem("userDetails");
  const userDetails =
    useSelector((state) => state.userDetails) ||
    JSON.parse(userDetailsUnparsed);
  const isAdmin = userDetails?.adminPrivileges;
  const userName = userDetails?.userName;
  const cartItems = useSelector((state) => state.cartItems?.cartItems);
  const hasUndefinedProduct = cartItems?.some(
    (item) => !item || !item.options || !item.options.ProductId
  );
  const [ErrorHandling, setErrorHandling] = useState({
    state: false,
    header: "",
    message: "",
  });
  useEffect(() => {
    setIsLoading(true);
    console.log(isAdmin, userDetails);
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
    <SidebarContainer isOpen={isOpen} onClick={togglesidebar}>
      <Icon onClick={togglesidebar}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          {SideLinksarray.map((link) => (
            <SidebarLink
              key={link.title}
              onClick={togglesidebar}
              to={link.path}
            >
              {link.title}
            </SidebarLink>
          ))}
{/* <ActionItemsSideBar> */}
<SidebarLink
              to="/Start3dPrinting"
              className={pathname === "/Start3dPrinting" ? "active" : ""}
              // isActive={pathname === "/Start3dPrinting"}
            >
              {pathname === "/Start3dPrinting"
                ? "3D Printing"
                : cartItems?.length > 0
                ? "Add More Items"
                : "Start 3D Printing"}
            </SidebarLink>
          {/* </ActionItemsSideBar> */}

          {/* <ActionItemsSideBar> */}
            {hasUndefinedProduct && !isLoading ? (
              <SidebarLink onClick={() => setErrorPromptShow(true)}>
                Cart
                {cartItems?.length > 0 && <span>{cartItems.length}</span>}
              </SidebarLink>
            ) : (
              <SidebarLink to="/cart">
                Cart
                {cartItems?.length > 0 && <span>{cartItems.length}</span>}
              </SidebarLink>
            )}
          {/* </ActionItemsSideBar> */}
          <SidebarMenu>
          {!isLoading && isAuthenticated ? (
            !isLoading && isAdmin ? (
              <>
               
                    <SidebarLink
                      to="/dashBoard"
                      onClick={togglesidebar}
                    >
                      Task Page
                    </SidebarLink>

                    <SidebarLink
                      to="/config"
                      onClick={togglesidebar}
                    >
                      Config Page
                    </SidebarLink>

                    <SidebarLink
                      to="/blog"
                      onClick={togglesidebar}
                    >
                      Blog Page
                    </SidebarLink>

                    <SidebarLink to="/" onClick={handleLogout}>
                      LogOut
                    </SidebarLink>
                  
              </>
            ) : (
              // <NavItem>
                <SidebarLink
                  key={"userDetails"}
                  to={"/DashBoard"}
                  className={pathname === "/DashBoard" ? "active" : ""}
                  // isactive={pathname === "/login"}
                >
                  <p>{userName ? userName : "Profile"}</p>
                </SidebarLink>
              // </NavItem>
            )
          ) : (
            <NavItem>
              <SidebarLink
                key={"Login"}
                to={"/login"}
                className={pathname === "/login" ? "active" : ""}
                // isActive={pathname === "/login"}
              >
                Login
              </SidebarLink>
            </NavItem>
          )}
          </SidebarMenu>
          {/* <Commerce> */}
         
          {/* </Commerce> */}
        
          </SidebarMenu>
          
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
