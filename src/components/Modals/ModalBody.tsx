import React from 'react';
import { Modal, Button } from 'react-bootstrap';

type Props = {
  children: React.ReactNode;
};

const ModalBody: React.FC<Props> = ({ children}) => {
  return (  
      <Modal.Body>{children}</Modal.Body>
  );
};

export default ModalBody;