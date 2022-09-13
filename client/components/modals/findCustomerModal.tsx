import { useState } from "react"
import { Button, Modal, ModalBody } from "reactstrap";
import { MyUser } from "../../utils/userUtil";
import LookUp from "./modalComponents/lookUp";


export default (props:{user : MyUser}) => {
    const [open, setOpen] = useState<boolean>(false);

    const toggle = () => setOpen(!open);



    return(
        <div>
            <Button onClick={toggle}>
                Look up customer
            </Button>
            
                <Modal className="modal-container" isOpen={open} toggle={toggle}>
                    <ModalBody className="modal-custom">
                        <h1 className="text-center">{props.user.shop.shopName}</h1>
                        <h2 className="text-center">Customer LookUp</h2>
                        <LookUp/>
                    </ModalBody>
                </Modal>
        </div>
    )
}