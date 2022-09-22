import { Dispatch, SetStateAction } from "react"
import { Modal, ModalBody } from "reactstrap"
import CustomerLookup from "../workOrder/customerLookup"
import WorkOrderCustomerForm from "../workOrder/workOrderCustomerForm"



export default (props : {setTab : Dispatch<SetStateAction<string>>, setOpen : Dispatch<SetStateAction<boolean>>,IsOpen: boolean,toggle : Function,setGotCustomer : Dispatch<SetStateAction<boolean>>,setIsNewCustomer : Dispatch<SetStateAction<boolean>>,isNewCustomer : boolean}) => {


    return (
        <div>

        {
            props.isNewCustomer ? 
            <Modal className="modal-xl modal-container" isOpen={props.IsOpen} toggle={props.toggle}>
            <ModalBody className=" modal-custom">
                    <WorkOrderCustomerForm setTab={props.setTab} setGotCustomer={props.setGotCustomer} disabled={false} setOpen={props.setOpen}/> 
                    </ModalBody>
                    </Modal>
                    :
                    <Modal className=" modal-container" isOpen={props.IsOpen} toggle={props.toggle}>
                    <ModalBody className="modal-custom-new-ro">
                    <CustomerLookup   setIsNewCustomer={props.setIsNewCustomer} />
                   </ModalBody>
                </Modal>
                   }
                   </div>

         
                    
        
    )
}