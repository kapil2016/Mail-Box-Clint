
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState , useEffect } from 'react';
async function getMessage(email , id){
    let emailID = email ;
    emailID = emailID.replace(/[.@]/g, "")
    try {
     const unreadRes =  await fetch(`https://user-login-signup-330a7-default-rtdb.firebaseio.com/mailbox/%20%20%20%20%20%20users/${emailID}/recivedmails/${id}.json`,{
          method:'PATCH',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({unRead : false})
        })  
      const unreadData = await unreadRes.json()
      console.log(unreadData)  
      const response =  await fetch(`https://user-login-signup-330a7-default-rtdb.firebaseio.com/mailbox/%20%20%20%20%20%20users/${emailID}/recivedmails/${id}.json`)
      const data = await response.json();
      console.log(data)
      if(!response.ok){
        throw new Error(data.error)
      }
      
      return data ;
    } catch (error) {
      alert(error)
    }
  
  }


function ViewMessage() {

  const [message , setMessage] = useState({})
  const email = useSelector(state=> state.auth.userAuth.email)
  const param = useParams()
  const id = param.id ;
  useEffect(()=>{
    getMessage(email , id).then(data=>{
        setMessage(data)
    })
  },[email , id])

  return (
    <Container>
      <Row >
        <Col>
          <Card style={{padding:'40px' , margin:'40px'}}>
            <Card.Header>From: {message.reciveFrom}</Card.Header>
            <Card.Body>
              <Card.Title>{message.subject}</Card.Title>
              <Card.Text>{message.content}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ViewMessage ;