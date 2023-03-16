import React from 'react';
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink } from './Sidebarelement';


const SideLinksarray = [  
    {    title: 'Home',    path: '/',  },  
    {    title: 'Services',    path: '/services',  },  
    {    title: 'Materials',    path: '/materials',  },  
    {    title: 'Learn',    path: '/learn',  },  
    {    title: 'Contact',    path: '/ContactUs',  },  
    {    title: 'Login',    path: '/login',  },];


const Sidebar = ({togglesidebar, isOpen}) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={togglesidebar}>
    <Icon onClick={togglesidebar}>
        <CloseIcon/>
    </Icon>
        <SidebarWrapper>
            <SidebarMenu>
            {SideLinksarray.map((link) => (
                      
                    <SidebarLink key={link.title} onClick={togglesidebar} to={link.path} >
                      {link.title}
                    </SidebarLink>
                   
                    ))}
            </SidebarMenu>

            
        </SidebarWrapper>

    </SidebarContainer>

    );
};

export default Sidebar;
