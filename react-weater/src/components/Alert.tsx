import { Button, Modal } from "react-bootstrap";
import { AlertType } from "../types/AlertTypes";

export const Alert: React.FC<AlertType> = ({ message, showAlert, onClose }) => {
    return (
        <Modal show={showAlert} onHide={onClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Be carefull</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};
