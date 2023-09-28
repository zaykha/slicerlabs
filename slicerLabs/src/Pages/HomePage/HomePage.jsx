import React, { useState } from 'react'
import Footer from '../../globalcomponents/Footer/footer'
import Navbar from '../../globalcomponents/navbar/navbar'
import Sidebar from '../../globalcomponents/SidebarMenu/Sidebar'
import { Hero } from './HomepageComponents/Hero/Hero'
import { HomepageContiner } from './HomepageComponents/Homepageelement'
import InfoCTA from './HomepageComponents/InfoCTA/InfoCTA'
import HomeStats from './HomepageComponents/Stats/HomeStats'
import Testimonials from './HomepageComponents/Testimonials/Testimonials'
import ToMaterial from './HomepageComponents/ToMaterial/ToMaterial'
import ToServices from './HomepageComponents/ToServices/ToServices'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAuthenticationStatus } from '../../ReduxStore/actions/Authentication'
import { resetCartCount } from '../../ReduxStore/actions/cartCountActions'
import { resetCartState } from '../../ReduxStore/reducers/CartItemReducer'
import { resetAddressDetails } from '../../ReduxStore/reducers/MapServicesReducer'
import { resetUserDetails } from '../../ReduxStore/actions/userDetails'

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    const auth = getAuth();
    // Prompt the user for confirmation before logging out
    let confirmClearTempItems = false;
    // if (cartItems.length > 0) {
    //   const confirmClearCart = window.confirm(
    //     "You have items in your cart that are not checked out. Proceeding with logout will remove these items. Are you sure you want to continue?"
    //   );

    //   if (!confirmClearCart) {
    //     return; // Abort logout if user cancels
    //   }
    //   confirmClearTempItems = true;
    // } else {
    //   const confirmLogout = window.confirm("Are you sure you want to log out?");
    //   if (!confirmLogout) {
    //     return; // Abort logout if user cancels
    //   }
    //   confirmClearTempItems = true;
    // }

    signOut(auth)
      .then(() => {
        const unsubscribe = onAuthStateChanged(
          auth,
          (user) => {
            // This callback function will be triggered when the auth state changes
            // However, we're only interested in the logout event here
            if (!user) {
              try {
                unsubscribe(); // Unsubscribe to avoid further notifications

                // Clear localStorage based on user confirmation
                // if (confirmClearTempItems) {
                //   // Get the calculatePriceFunction from localStorage
                //   const calculatePriceFunction = localStorage.getItem(
                //     "calculatePriceFunction"
                //   );

                //   localStorage.clear();
                //   if (calculatePriceFunction) {
                //     localStorage.setItem(
                //       "calculatePriceFunction",
                //       calculatePriceFunction
                //     );
                //   }
                  console.log("logout");
                  // Reset redux store and navigate
                  dispatch(setAuthenticationStatus(false));
                  dispatch(resetCartCount());
                  dispatch(resetCartState());
                  dispatch(resetAddressDetails());
                  dispatch(resetUserDetails());

                  navigate("/");
                // }
              } catch (error) {
                console.error("Error during logout:", error);
              }
            }
          },
          (error) => {
            // Handle any error that occurs while listening for the auth state changes
            console.error("Error in onAuthStateChanged:", error);
          }
        );
      })
      .catch((error) => {
        // An error happened.
        console.error("Error in signout:", error);
      });

    // Unsubscribe from the onAuthStateChanged listener
  };

  return (
    <HomepageContiner>
        {/* <Sidebar isOpen={isOpen} togglesidebar={togglesidebar}/>
        <Navbar togglesidebar={togglesidebar}/> */}
        <Hero/>
        <HomeStats/>
        <InfoCTA/>
        <ToServices/>
        <ToMaterial/>
        <Testimonials/>
        {/* <button onClick={handleLogout}>Logout</button> */}
        {/* <Footer/> */}
    </HomepageContiner>
        
        
  )
}

export default HomePage