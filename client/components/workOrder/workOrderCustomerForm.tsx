
import Cookies from "js-cookie";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"

import { Form} from "reactstrap"
import axios from "../../axios/axios";
import { Address, Customer, GetCustomer, MyCustomer, Vehicle } from "../../utils/customer";
import CustomerForm from "../forms/customerForm";
import VehicleForm from "../forms/vehicleForm";


export default (props : {setFoundCustomer: Dispatch<SetStateAction<MyCustomer>>, setOpen : Dispatch<SetStateAction<boolean>>, foundCustomer : MyCustomer,setGotCustomer: Dispatch<SetStateAction<boolean>>, disabled :boolean}) => {

    // ------------form data------------------//
    const [customer, setCustomer] = useState<Customer>();
    const [vehicle, setVehicle] = useState<Vehicle>();
    const [address, setAddress] = useState<Address>();
    const [userErrors, setUserErrors] = useState(new Map<string, string>());
    const [addressErrors, setAddressErrors] = useState(new Map<string, string>());

    useEffect(() => {
        setCustomer(props.foundCustomer?.customer)
        setVehicle(props.foundCustomer?.vehicle)
        setAddress(props.foundCustomer?.address)
    },[])




    const customerChangeHandler = (name, value) => {
        setCustomer({
            ...customer,
            [name] : value
        })
        
    }
    const addressChangeHandler = (e : FormEvent<HTMLFormElement>) => {
        setAddress({
            ...address,
            [e.target.name] : e.target.value
        })
        
    }
    const vehicleChangeHandler = (e : FormEvent<HTMLFormElement>) => {
        setVehicle({
            ...vehicle,
            [e.target.name] : e.target.value
        })
        
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(customer?.phone)
        axios.post('new/customer',JSON.stringify( {...customer,...vehicle,...address})
        , {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }).then(res => {
            console.log(res.data)
            if (res.status === 200) {
                props.setGotCustomer(true)
                props.setOpen(false)
                Cookies.get('customerToken') && (
                    props.setFoundCustomer(GetCustomer))
            }

        })
        .catch(err => console.log(err))
    }


    return (
        <div className="pb-5">
            {
                !props.disabled &&
                <h1 className="text-center pt-1">New Customer</h1>
            }
            <Form className="d-flex justify-content-center pt-4 gap-4" >

            <CustomerForm customerChangeHandler={customerChangeHandler} addressChangeHandler={addressChangeHandler}  handleSubmit={null} customer={customer} address={address} disabled={props.disabled}/>
          <VehicleForm vehicleChangeHandler={vehicleChangeHandler} handleSubmit={handleSubmit} vehicle={vehicle} disabled={props.disabled}/>
        </Form>
       
        </div>


    )
}