import { Card, Container, ListGroup } from "react-bootstrap";
import EmailItem from "./EmailItem";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

async function getMails(email){
    let emailID = email ;
    emailID = emailID.replace(/[.@]/g, "")
    try {
      const response =  await fetch(`https://user-login-signup-330a7-default-rtdb.firebaseio.com/mailbox/%20%20%20%20%20%20users/${emailID}/recivedmails.json`)
      const data = await response.json();
      console.log(email)
      console.log(response)
      if(!response.ok){
        throw new Error(data.error)
      }
      return data ;
    } catch (error) {
      alert(error)
    }
  
  }

async function deleteMail(email , id){
  let emailID = email ;
  emailID = emailID.replace(/[.@]/g, "")
  try {
    const response =  await fetch(`https://user-login-signup-330a7-default-rtdb.firebaseio.com/mailbox/%20%20%20%20%20%20users/${emailID}/recivedmails/${id}.json`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    if(!response.ok){
      throw new Error('unable to delete')
    }

  } catch (error) {
    alert(error)
  }
}  

const InboxPage = ()=>{
  const email = useSelector(state=>state.auth.userAuth.email)
  const [recievedMailsList , setRecievedMailsList] = useState({});
  const deleteMailHandler = (id)=>{
     deleteMail(email ,id);
    delete recievedMailsList[id] ;
    setRecievedMailsList({...recievedMailsList})

  }

  useEffect(()=>{
    getMails(email).then(data=>{
       setRecievedMailsList(data);
    });
  },[email])
  const Emails = [];
  for (let key in recievedMailsList){
    const id = key ;
    const subject = recievedMailsList[key].subject ;
    const reciveFrom = recievedMailsList[key].reciveFrom ;
    const unRead = recievedMailsList[key].unRead ;
    const content = recievedMailsList[key].content;
    Emails.push(
        <EmailItem key={id} id ={id} senderEmail={reciveFrom} subject={subject} unRead={unRead} content={content} onDelete={deleteMailHandler} ></EmailItem>
    )
  }

    return (
        <>
        <Container>
        <Card style={{padding:'40px' , margin:'40px'}}>
        <Card.Title> My Inbox</Card.Title>    
        <Card.Body> 
          <ListGroup>
            {Emails.reverse()} 
          </ListGroup>
        </Card.Body>  
        </Card>
        </Container>
        </>
    )
}

export default InboxPage ;