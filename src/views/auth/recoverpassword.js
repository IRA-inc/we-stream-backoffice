import React from 'react'
import { Container,Col,Row, Form,Button } from 'react-bootstrap'
import { useNavigate} from 'react-router-dom'

const RecoverPassword = (props) => {

   let history =useNavigate()

    return (
        <>
            <section className="sign-in-page">
               <Container>
                  <Row className="justify-content-center align-items-center height-self-center">
                     <Col lg="5" md="12" className="align-self-center">
                        <div className="sign-user_card ">                    
                           <div className="sign-in-page-data">
                              <div className="sign-in-from w-100 m-auto">
                                 <h3 className="mb-3 text-center">Reset Password</h3>
                                 <p className="text-body">Enter your email address and we'll send you an email with instructions to reset your password.</p>
                                 <Form className="mt-4" action="/">
                                    <Form.Group>                                 
                                       <Form.Control type="email" className="mb-0" id="exampleInputEmail2" placeholder="Enter email" autoComplete="off" required/>
                                    </Form.Group>                           
                                    <div className="sign-info">
                                       <Button type="button" onClick={()=> history.push('/auth/sign-in')} variant="btn btn-primary">Reset</Button>                                                            
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

export default RecoverPassword