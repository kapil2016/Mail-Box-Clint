import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import BlueDot from './BlueDot';
import { useNavigate } from 'react-router-dom';

function EmailItem({ senderEmail, subject, onDelete , unRead , id , content }) {
const navTo = useNavigate();

const readMessageHandler = ()=>{
      navTo(`/inbox/${id}`)
}


  return (
    <ListGroup.Item style={{ backgroundColor: '#f8f9fa', }} onClick={readMessageHandler}>
   
      <div className="d-flex align-items-center">
        {unRead && <BlueDot></BlueDot> }
        <div style={{float:'right', width:'90%', marginLeft:'20px' }}>
          <div>{` Received From: ${senderEmail}`}</div>
          <div>{subject}</div>
        </div>
        <div  style={{float:'right', width:'90%' , textAlign:'right'}}>
          <Button variant="danger" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </ListGroup.Item>
  );
}

export default EmailItem;
