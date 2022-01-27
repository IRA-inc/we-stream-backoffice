import React from 'react'
import { Container,Col,Row,Form } from 'react-bootstrap'
import {Link} from 'react-router-dom'

const LockScreen = (props) => {

    return (
        <>
       <section className="sign-in-page">
            <Container className="h-100">
               <Row className="justify-content-center align-items-center h-100">
                  <Col md="6" sm="12" className="col-12">
                     <div className="sign-user_card ">
                        <div className="sign-in-page-data">
                           <div className="sign-in-from w-100 m-auto">
                              <h4 className="mt-3 text-white mb-0 text-center">Hi ! Michael Smith</h4>
                              <p className="text-white text-center">Enter your password to access the admin.</p>
                              <Form className="mt-4">
                                 <Form.Group>
                                    <Form.Control type="email" className="mb-0" id="exampleInputEmail2" placeholder="Password" autoComplete="off" required/>
                                 </Form.Group>
                                 <div className="d-inline-block w-100">
                                    <Link to="/auth/sign-in" className="btn btn-primary float-right">Log In</Link>
                                 </div>
                              </Form>
                           </div>
                        </div>
                     </div>
                  </Col>
               </Row>
            </Container>
         </section>
          

        </>
    )
}


export default LockScreen