import React from 'react';
import { Modal, Button } from 'react-bootstrap';

type Props = {
    children?: React.ReactNode;
};

const ModalFooter: React.FC<Props> = ({ children}) => {
  return (  
      <Modal.Footer>{children}</Modal.Footer>
  );
};

export default ModalFooter;