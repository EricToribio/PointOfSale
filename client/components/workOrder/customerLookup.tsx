import { Dispatch, SetStateAction } from "react"
import { MyUser } from "../../utils/userUtil"
import FindCustomerModal from "../modals/findCustomerModal"


export default (props:{user: MyUser ,setIsNewCustomer:Dispatch<SetStateAction<Boolean>>}) => {


    return(
        <div className=" d-flex justify-content-center">
            {/* <button>Look up Customer</button> */}
            <FindCustomerModal user={props.user}/>
            <button onClick={()=>props.setIsNewCustomer(true)}>New Customer</button>
        </div>
    )
}