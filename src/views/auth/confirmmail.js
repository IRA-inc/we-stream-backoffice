import React from 'react'
import { Container,Col,Row,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

// img
import mail from '../../assets/images/login/mail.png'

const ConfirmMail = (props) => {

    return (
        <>
            <section className="sign-in-page">
               <Container className="h-100">
                  <Row className="justify-content-center align-items-center h-100">
                     <Col md="6" sm="12"  className="col-12 ">
                        <div className="sign-user_card ">
                           <div className="sign-in-page-data">
                              <div className="sign-in-from w-100 m-auto">
                                 <img src={mail} width="80"  alt=""/>
                                 <h3 className="mt-3 mb-0">Success !</h3>
                                 <p className="text-white">A email has been send to <Button href="/cdn-cgi/l/email-protection" className="__cf_email__ bg-dark border-0 p-0" data-cfemail="5f26302a2d3a323e36331f3b30323e3631713c303271">[email&#160;protected]</Button> Please check for an email from company and click on the included link to reset your password.</p>
                                 <div className="d-inline-block w-100">
                                    <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
                                 </div>
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


export default ConfirmMail