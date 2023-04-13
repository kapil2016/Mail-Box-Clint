import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

function EmailItem({ senderEmail, subject, onDelete }) {
  return (
    <ListGroup.Item style={{ backgroundColor: '#f8f9fa', padding:'20px' , margin:'20px'}}>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <div>{` Recievd From: ${senderEmail}`}</div>
          <div>{subject}</div>
        </div>
        <div>
          <Button variant="danger" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </ListGroup.Item>
  );
}

export default EmailItem;
