import React from 'react'
import { Container,Col,Row,Form,Button } from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'


const SignUp = (props) => {
    let history =useNavigate()

    return (
        <>
         <section className="sign-in-page">
            <Container>
               <Row className="justify-content-center align-items-center height-self-center">
                  <Col lg="7" md="12"  className="align-self-center">
                     <div className="sign-user_card ">                    
                        <div className="sign-in-page-data">
                           <div className="sign-in-from w-100 m-auto">
                              <Form className="" action="/">
                                 <Row>
                                    <Col md="6">
                                       <Form.Group>
                                          <Form.Label>Username</Form.Label>
                                          <Form.Control type="text" className="mb-0" id="exampleInputEmail2" placeholder="Enter Full Name" autoComplete="off" required/>
                                       </Form.Group>
                                    </Col>
                                    <Col md="6">
                                       <Form.Group>  
                                          <Form.Label>E-mail</Form.Label>                               
                                          <Form.Control type="email" className="mb-0" id="exampleInputEmail3" placeholder="Enter email" autoComplete="off" required/>
                                       </Form.Group>
                                    </Col>
                                    <Col md="6">
                                       <Form.Group>
                                          <Form.Label>First Name</Form.Label>
                                          <Form.Control type="text" className="mb-0" id="exampleInputEmail4" placeholder="First Name" autoComplete="off" required/>
                                       </Form.Group>
                                    </Col>
                                    <Col md="6">
                                       <Form.Group>  
                                          <Form.Label>Last Name</Form.Label>                               
                                          <Form.Control type="email" className="mb-0" id="exampleInputEmail5" placeholder="Last Name" autoComplete="off" required/>
                                       </Form.Group>
                                    </Col>
                                    <Col md="6">
                                       <Form.Group>   
                                          <Form.Label>Password</Form.Label>                              
                                          <Form.Control type="password" className="mb-0" id="exampleInputPassword6" placeholder="Password" required/>
                                       </Form.Group>
                                    </Col>
                                    <Col md="6">
                                       <Form.Group> 
                                          <Form.Label>Repeat Password</Form.Label>                                
                                          <Form.Control type="password" className="mb-0" id="exampleInputPassword7" placeholder="Password" required/>
                                       </Form.Group>
                                    </Col>
                                 </Row>
                                 <div className="custom-control custom-radio mt-2">
                                    <input type="radio" id="customRadio1" name="customRadio" className="custom-control-input"/>
                                    <label className="custom-control-label" htmlFor="customRadio1">Premium-$39 / 3 Months
                                       with a 5 day free trial</label>
                                 </div>
                                 <div className="custom-control custom-radio mt-2">
                                    <input type="radio" id="customRadio2" name="customRadio" className="custom-control-input"/>
                                    <label className="custom-control-label" htmlFor="customRadio2"> Basic- $19 / 1 Month</label>
                                 </div>
                                 <div className="custom-control custom-radio mt-2">
                                    <input type="radio" id="customRadio3" name="customRadio" className="custom-control-input"/>
                                    <label className="custom-control-label" htmlFor="customRadio3">Free-Free</label>
                                 </div>
                                 <Button type="button" onClick={()=> history.push('/')} variant="btn btn-primary my-2">Sign Up</Button>
                              </Form>
                           </div>
                        </div>    
                        <div className="mt-3">
                           <div className="d-flex justify-content-center links">
                              Already have an account? <Link to="/auth/sign-in" className="text-primary ml-2">Sign In</Link>
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

export default SignUp;
