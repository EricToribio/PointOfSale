import { useState } from "react"
import { Button, Modal, ModalBody } from "reactstrap";


export default () => {
    const [open, setOpen] = useState<boolean>(false);

    const toggle = () => setOpen(!open);
    return(
        <div>
            <Button onClick={toggle}>
                Look up customer
            </Button>
            <Modal isOpen={open} toggle={toggle}>
                <ModalBody>
                    My modal
                </ModalBody>
            </Modal>
        </div>
    )
}