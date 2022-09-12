import { Dispatch, SetStateAction } from "react"
import FindCustomerModal from "../mainComponents/modals/findCustomerModal"


export default (props:{setIsNewCustomer:Dispatch<SetStateAction<Boolean>>}) => {


    return(
        <div className=" d-flex justify-content-center">
            {/* <button>Look up Customer</button> */}
            <FindCustomerModal/>
            <button onClick={()=>props.setIsNewCustomer(true)}>New Customer</button>
        </div>
    )
}