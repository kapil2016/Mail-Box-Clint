import { Card, Container, ListGroup } from "react-bootstrap";
import EmailItem from "./EmailItem";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

async function getMails(email, inbox) {
  let emailID = email;
  emailID = emailID.replace(/[.@]/g, "");
  try {
    const response = await fetch(
      `https://user-login-signup-330a7-default-rtdb.firebaseio.com/mailbox/%20%20%20%20%20%20users/${emailID}/${inbox}.json`
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

async function deleteMail(email, id, inbox) {
  let emailID = email;
  emailID = emailID.replace(/[.@]/g, "");
  try {
    const response = await fetch(
      `https://user-login-signup-330a7-default-rtdb.firebaseio.com/mailbox/%20%20%20%20%20%20users/${emailID}/${inbox}/${id}.json`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      throw new Error("unable to delete");
    }
  } catch (error) {
    alert(error);
  }
}

const InboxPage = () => {
  const email = useSelector((state) => state.auth.userAuth.email);
  const [recievedMailsList, setRecievedMailsList] = useState({});

  let inbox = "recivedmails";
  const param = useParams();
  if (param.sentmail === "sentmail") {
    inbox = "sentmails";

  }

  const deleteMailHandler = (id) => {
    deleteMail(email, id, inbox);
    delete recievedMailsList[id];
    setRecievedMailsList({ ...recievedMailsList });
  };

  useEffect(() => {
    if( inbox === "recivedmails"){
      const intervel =  setInterval(() => {
        getMails(email, inbox).then((data) => {
          setRecievedMailsList(data)
        })
      }, 2000)
      return ()=> clearInterval(intervel)
    }
       
  }, [email, inbox])

  useEffect(()=>{
    if( inbox === "sentmails"){
      getMails(email, inbox).then((data) => {
        setRecievedMailsList(data)
      })
    }
  },[email , inbox])

  console.log('rendering')

  let unreadMessageCount = 0
  const Emails = [];
  for (let key in recievedMailsList) {
    const id = key;
    const subject = recievedMailsList[key].subject;
    const reciveFrom =
      inbox === "recivedmails"
        ? recievedMailsList[key].reciveFrom
        : recievedMailsList[key].sentTo;
    const unRead = recievedMailsList[key].unRead;
    const content = recievedMailsList[key].content;
    if (unRead) unreadMessageCount++;
    Emails.push(
      <EmailItem
        key={id}
        id={id}
        senderEmail={reciveFrom}
        subject={subject}
        unRead={unRead}
        content={content}
        onDelete={deleteMailHandler}
        inbox={inbox}
      ></EmailItem>
    );
  }

  return (
    <>
      <Container>
        <Card style={{ padding: "40px", margin: "40px" }}>
          {inbox === "recivedmails" && (
            <Card.Title> My Inbox ( {unreadMessageCount} )</Card.Title>
          )}
          {inbox === "sentmails" && <Card.Title> Sent Box</Card.Title>}

          <Card.Body>
            <ListGroup>{Emails.reverse()}</ListGroup>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default InboxPage;
