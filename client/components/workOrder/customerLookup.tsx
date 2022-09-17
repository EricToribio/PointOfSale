import { Dispatch, SetStateAction } from "react"
import { MyUser } from "../../utils/userUtil"
import FindCustomerModal from "../modals/findCustomerModal"


export default (props:{setIsNewCustomer:Dispatch<SetStateAction<boolean>>}) => {


    return(
        <div className=" d-flex gap-4">
            <FindCustomerModal />
            <button onClick={()=>props.setIsNewCustomer(true)}>New Customer</button>
        </div>
    )
}