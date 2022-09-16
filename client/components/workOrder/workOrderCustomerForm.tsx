import { State } from "country-state-city";
import Router from "next/router";
import { FormEvent, useEffect, useState } from "react"
import PhoneInput from "react-phone-number-input/input";
import { Alert, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label } from "reactstrap"
import axios from "../../axios/axios";
import { Address, Customer, GetCustomer, MyCustomer, Vehicle } from "../../utils/customer";
import CustomerForm from "../forms/customerForm";
import VehicleForm from "../forms/vehicleForm";


export default () => {
    const [gotCustomer, setGotCustomer] = useState<boolean>(false);
    const [foundCustomer, setFoundCustomer] = useState<MyCustomer>();

    // ------------form data------------------//
    const [customer, setCustomer] = useState<Customer>();
    const [vehicle, setVehicle] = useState<Vehicle>();
    const [address, setAddress] = useState<Address>();
    const [userErrors, setUserErrors] = useState(new Map<string, string>());
    const [addressErrors, setAddressErrors] = useState(new Map<string, string>());

    useEffect(()=>{
        setFoundCustomer(GetCustomer)
    },[gotCustomer])



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
                setGotCustomer(true)
            }

        })
        .catch(err => console.log(err))
    }


    return (
        <div>
        {
            !gotCustomer  ?
            <Form className="d-flex justify-content-center pt-4 gap-4" >
            <CustomerForm customerChangeHandler={customerChangeHandler} addressChangeHandler={addressChangeHandler}  handleSubmit={null} customer={customer} address={address}/>
          <VehicleForm vehicleChangeHandler={vehicleChangeHandler} handleSubmit={handleSubmit} vehicle={vehicle}/>
        </Form>
        :
        <div>
        </div>
        }
        </div>


    )
}