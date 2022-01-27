import React from 'react';

// Partials
import HeaderStyle1 from '../components/partials/headerstyle/headerstyle1';
import SidebarStyle from '../components/partials/sidebarstyle/sidebarstyle'
import FooterStyle from '../components/partials/footerstyle/footerstyle'


import Content from './content';


const Layout = ({ children }) => {
   
    
    return(
        <>
         <div className="wrapper">
            <SidebarStyle />
            <HeaderStyle1 />
            
            <div className="content-page" id="content-page">
                <Content children={children} />
            </div>
         </div>
         <FooterStyle />
        </>
    )
}


export default Layout;