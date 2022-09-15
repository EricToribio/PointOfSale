import { State } from "country-state-city";
import { FormEvent, useState } from "react"
import PhoneInput from "react-phone-number-input/input";
import { Alert, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label } from "reactstrap"
import axios from "../../axios/axios";
import { Address, Customer, Vehicle } from "../../utils/customer";
import CustomerForm from "../forms/customerForm";
import VehicleForm from "../forms/vehicleForm";


export default () => {
    let errorMessage = new Map<string, string>();
    const [states] = useState(State.getStatesOfCountry("US"))
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    
    // ------------form data------------------//
    const [customer, setCustomer] = useState<Customer>();
    const [vehicle, setVehicle] = useState<Vehicle>();
    const [address, setAddress] = useState<Address>();
    const [userErrors, setUserErrors] = useState(new Map<string, string>());
    const [addressErrors, setAddressErrors] = useState(new Map<string, string>());

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
        }).then(res => console.log(res.data))
        .catch(err => console.log(err))
    }


    return (

        <Form className="d-flex justify-content-center pt-4 gap-4" >
            <CustomerForm customerChangeHandler={customerChangeHandler} addressChangeHandler={addressChangeHandler}  handleSubmit={null} customer={customer} address={address}/>
          <VehicleForm vehicleChangeHandler={vehicleChangeHandler} handleSubmit={handleSubmit} vehicle={vehicle}/>
        </Form>
    )
}