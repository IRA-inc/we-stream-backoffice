import React from 'react'
import Content from './content'


const BlankLayout =({ children }) => {
    
    return(
        <>
        <div className="wrapper">
            <Content children={children} />
       </div>
       </>
    )
}

export default BlankLayout;