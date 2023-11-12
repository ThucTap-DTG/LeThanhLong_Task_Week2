import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalTitle from './ModalTitle';

type Props = {
  show: boolean;
  onHide: () => void;
  title: string;
  onSave: () => void;
  children: React.ReactNode;
};

const ModalForm: React.FC<Props> = ({ show, onHide, title, onSave, children }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalForm;