import { Form, Button, Container, Row, Col, Card} from "react-bootstrap";
import { useRef,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthantication } from "../../States/Reducers/auth-reducer";
import { useNavigate } from "react-router-dom";


async function loginAndSignUp(userDetails, signUpMode) {
    let url ='';
    if(signUpMode){
        url ="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB7GCCKM_2dSth5NlthsSwreUly8H9D_-8";

    }else{
        url ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB7GCCKM_2dSth5NlthsSwreUly8H9D_-8";
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      const data = await response.json();
      console.log(data);
      if(!data.error){
        return data ;
      }else{
        throw new Error(data.error.message);
      } 
    } catch (error) {
        alert(error);
    }
  }

function LoginSignup() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const navTo = useNavigate();
  const email = emailRef.current.value ;
  const password = passwordRef.current.value ;
//   const confirmPassword = confirmPasswordRef.current.value ;
  const [signupMode , setSignupMode] = useState(true);
  const auth = useSelector(state=>state.auth.userAuth);
  const dispatch = useDispatch();
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const userDetails = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    if(signupMode){
        if (passwordRef.current.value !== confirmPasswordRef.current.value){
            alert('password mismatch');
            return ;
        }
    }
    loginAndSignUp(userDetails , signupMode).then(data=>{
        console.log(data);
        if(data.registered){
            dispatch(setAuthantication({idToken : data.idToken , isLogin: true , userID:data.localId }))
            localStorage.setItem('idToken' , data.idToken)
            localStorage.setItem('userID' , data.localId)
            navTo('/home');
        }else{
            setSignupMode(false);
        }
    });
  
  };


  return (
    <Container>
      <Card style={{ margin: "20px"}}>
        <Card.Body>
          <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
              <h1 style={{ margin: "20px" }}>{signupMode? 'Sign Up' :'Login'}</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail" style={{ margin: "20px" }}>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    ref={emailRef}
               
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" style={{ margin: "20px" }}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                 
                  />
                </Form.Group>

              { signupMode && <Form.Group controlId="formBasicPasswordConfirmation" style={{ margin: "20px" }}>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    ref={confirmPasswordRef}
                 
                  />
                </Form.Group> }
                <div style={{display:'flex' , justifyContent:'center' , margin:'20px'}}>
                <Button variant="primary" type="submit">
                 {signupMode? 'Sign Up':'Login'}
                </Button>
                </div>
              </Form>
              {!signupMode&& <div style={{display:'flex' , justifyContent:'center' , margin:'20px'}}>
               <a href="/forgot-password"> Forgot Password ? </a></div>
              }
              <div style={{display:'flex' , justifyContent:'center' , margin:'20px'}}>
              <Button
                variant="primary"
                style={{
                  backgroundColor: "#1c2331",
                  borderColor: "#1c2331",
                  textAlign: "center",
                }}
                onClick={()=>setSignupMode((pre)=>!pre)}
              >
               { signupMode? 'Already have an account? Login' : 'Create new account'}
              </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginSignup;
