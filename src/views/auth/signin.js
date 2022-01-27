import { isEmpty } from 'lodash';
import React,{useState} from 'react' 
import { Container,Col,Row,Button, Form, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom'
import { SIGN_IN_LOADING_ID } from '../../constants';
import { loginUser } from '../../actions';
import { withRouter } from '../../components/HOC/withRouter';
import validate from '../../utility/validators/signInForm';

const SignIn = (props) => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [errors, setErrors] = useState({});

   // const [show, setShow] = useState(false);

   // let history =useNavigate()

   const isValid = () => {
      const {errors, isValid} = validate({username, password});
      if (!isValid) {
          setErrors(errors)
      } else {
          setErrors({});
      }
      return isValid;
   }

   const handleSubmit = (e) => {
         e.preventDefault();
         const {loginUser} = props;
         if (isValid()) {
            loginUser({username, password});
         }
   }

    return !isEmpty(props.currentUser)
      ? <Navigate to='/' />
      : (
        <>
            <section className="sign-in-page">
               <Container>
                  <Row className="justify-content-center align-items-center height-self-center">
                     <Col lg="5" md="12"  className="align-self-center">
                        <div className="sign-user_card ">                    
                           <div className="sign-in-page-data">
                              <div className="sign-in-from w-100 m-auto">
                                 <h3 className="mb-3 text-center">Sign in</h3>
                                 <Form onSubmit={handleSubmit} className="mt-4">
                                    <Form.Group>                                 
                                       <Form.Control 
                                          type="text" 
                                          className="mb-0" 
                                          id="exampleInputEmail1" 
                                          placeholder="Enter username" 
                                          value={username}
                                          onChange={(e) => setUsername(e.target.value)}
                                          disabled={props.isLoading}
                                          autoComplete="off" 
                                          required
                                       />
                                       <FormControl.Feedback>{errors.usernameError}</FormControl.Feedback>
                                    </Form.Group>
                                    <Form.Group>                                 
                                       <Form.Control 
                                          type="password" 
                                          className="mb-0" 
                                          id="exampleInputPassword2" 
                                          placeholder="Password"
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                                          disabled={props.isLoading}
                                          required
                                       />
                                       <FormControl.Feedback>{errors.passwordError}</FormControl.Feedback>
                                    </Form.Group>
                                       <div className="sign-info">
                                          <Button 
                                             type="submit"
                                             variant="btn btn-primary"
                                             disabled={props.isLoading}
                                          >Sign in</Button>
                                          <div className="custom-control custom-checkbox d-inline-block">
                                             <input type="checkbox" className="custom-control-input" id="customCheck"/>
                                             <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                                          </div>                                
                                       </div>                                    
                                 </Form>
                              </div>
                           </div>
                           <div className="mt-3">
                              <div className="d-flex justify-content-center links">
                                 Don't have an account? <Link to="/auth/sign-up" className="text-primary ml-2">Sign Up</Link>
                              </div>
                              <div className="d-flex justify-content-center links">
                                 <Link to="/auth/pages-recoverpw" className="f-link">Forgot your password?</Link>
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

function mapStateToProps(state) {
   const {currentUser, loader} = state;
   const {isLoading} = loader[SIGN_IN_LOADING_ID] || {
     isLoading: false
   };
   return {currentUser, isLoading};
};

export default withRouter(connect(mapStateToProps, {loginUser})(SignIn));
