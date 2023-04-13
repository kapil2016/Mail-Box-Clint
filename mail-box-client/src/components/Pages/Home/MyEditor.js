import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Form, Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";

async function sendMail(senderId , reciverId , sentData , reciveData ,setSending){
    setSending(true);
    try {
      const responseToSender = await fetch(`https://user-login-signup-330a7-default-rtdb.firebaseio.com/mailbox/
      users/${senderId}/sentmails.json`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(sentData)
      })
      await fetch(`https://user-login-signup-330a7-default-rtdb.firebaseio.com/mailbox/
      users/${reciverId}/recivedmails.json`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(reciveData)
      })
      const data = await responseToSender.json();
      if(data.error){
        throw new Error(data.error)
      }
      setSending(false)
      return data ;
    } catch (error) {
        alert(error)
    }
}


function EmailForm() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [sending , setSending] = useState(false)
  const userEmail = useSelector(state=> state.auth.userAuth.email);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleSubmit = (event) => {
    const contentState = editorState.getCurrentContent();
    let reciverEmail = to ;
    let senderEmail = userEmail;
    senderEmail = senderEmail.replace(/[.@]/g, "")
    reciverEmail= reciverEmail.replace(/[.@]/g, "")
    const sentData = {
      sentTo :to,  
      subject: subject,
      content: convertToRaw(contentState).blocks[0].text,
    };
    const reciveData = {
        reciveFrom:userEmail,
        subject: subject,
        content: convertToRaw(contentState).blocks[0].text,
      };

   sendMail(senderEmail , reciverEmail , sentData , reciveData ,setSending).then(data=>{
    setEditorState(EditorState.createEmpty());
    setTo('');
    setSubject('')
   })
  };

  return (
    <Card style={{ margin:'auto' , width:'70vw' , marginTop:'30px' ,padding:'20px'}}>
      <Card.Body>
        <Card.Title>Compose Email</Card.Title>
        <Form >
          <Form.Group controlId="formBasicTo">
            <Form.Label>Sent To:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={to}
              onChange={handleToChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicSubject">
            <Form.Label>Subject:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subject"
              value={subject}
              onChange={handleSubjectChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicMessage">
            <Form.Label>Message:</Form.Label>
            <Editor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
            />
          </Form.Group>
        </Form>
      </Card.Body>
      <Card.Footer>
        <Button style={{ float: "right", marginRight: "30px" }} type='submit' onClick={ handleSubmit}>
         {sending? 'Sending...' :' Send Email'}
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default EmailForm;
