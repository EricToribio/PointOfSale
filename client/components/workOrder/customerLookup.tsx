import { Dispatch, SetStateAction } from "react"


export default (props:{setIsNewCustomer:Dispatch<SetStateAction<Boolean>>}) => {


    return(
        <div className=" d-flex justify-content-center">
            <button>Look up Customer</button>
            <button onClick={()=>props.setIsNewCustomer(true)}>New Customer</button>
        </div>
    )
}