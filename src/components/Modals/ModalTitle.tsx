import React from 'react';
import { Modal, Button } from 'react-bootstrap';

type Props = {
  title?: string;
};

const ModalTitle: React.FC<Props> = ({title}) => {
  return (  
      <Modal.Header>{title}</Modal.Header>
  );
};

export default ModalTitle;