import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
async function getMessage(email, id ,inbox) {
  let emailID = email;
  emailID = emailID.replace(/[.@]/g, "");
  try {
  
    if(inbox === "recivedmails"){
         await fetch(
            `https://user-login-signup-330a7-default-rtdb.firebaseio.com/mailbox/%20%20%20%20%20%20users/${emailID}/${inbox}/${id}.json`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ unRead: false }),
            }
          );
    }
  
    const response = await fetch(
      `https://user-login-signup-330a7-default-rtdb.firebaseio.com/mailbox/%20%20%20%20%20%20users/${emailID}/${inbox}/${id}.json`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    alert(error);
  }
}

function ViewMessage() {
  const [message, setMessage] = useState({});
  const email = useSelector((state) => state.auth.userAuth.email);
  const param = useParams();
  const sentbox = param.sentbox
  let  inbox = "recivedmails"
  if(sentbox === 'sentbox'){
    inbox = "sentmails";
  }
  const id = param.id;
  useEffect(() => {
    getMessage(email, id , inbox).then((data) => {
      setMessage(data);
    });
  }, [email, id , inbox]);

  return (
    <Container>
      <Row>
        <Col>
          <Card style={{ padding: "40px", margin: "40px" }}>
         { inbox === "sentmails" &&  <Card.Header>To: {message.sentTo}</Card.Header> }
         { inbox === "recivedmails" &&  <Card.Header>From: {message.reciveFrom}</Card.Header> }

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

export default ViewMessage;
