import React from "react";
import { Modal, Button } from "react-bootstrap";

type ModalProps = {
  show: boolean;
  onHide: () => void;
  title?: string;
  onSave: () => void;
  children: React.ReactNode;
};

const ModalList: React.FC<ModalProps> = ({
  show,
  onHide,
  title,
  onSave,
  children,
}) => {
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
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalList;
