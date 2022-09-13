import { FormEvent, useState } from 'react';
import { State } from 'country-state-city';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, FormGroup, Input, Label, Button, Alert } from 'reactstrap';

import Cookies from 'js-cookie';
import { isAddressValid, registrationValidations } from '../../utils/validationUtil';
import Link from 'next/link';
import router from 'next/router';
import axios from '../../axios/axios';
export default () => {
    let errorMessage = new Map<string,string>();
    const [states] = useState(State.getStatesOfCountry("US"))
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [dropDownValue, setDropdownValue] = useState("State")
    // ------------form data------------------//
    const [firstName, setFirstName] = useState(String);
    const [lastName, setLastName] = useState(String);
    const [email, setEmail] = useState(String);
    const [password, setPassword] = useState(String);
    const [confirmPassword, setConfirmPassword] = useState(String);
    const [address, setAddress] = useState(String);
    const [city, setCity] = useState(String);
    const [zip, setZip] = useState(String);
    const [shopName, setShopName] = useState(String);
    const [userErrors, setUserErrors] = useState(new Map<string, string>());
    const [addressErrors, setAddressErrors] = useState(new Map<string, string>());

    const handleSubmit = async (e : FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        const registrationErrors = registrationValidations(firstName, lastName, email, password, confirmPassword,shopName)
        console.log(registrationErrors)

        const addressValidationsErrors = isAddressValid(address, city, dropDownValue, zip)
        // if (registrationErrors.size > 0 || addressValidationsErrors.size > 0) {
        //     setUserErrors(registrationErrors)
        //     setAddressErrors(addressValidationsErrors)
        //     return
        // }
        try{
            const res = await axios.post('new/shop', {
                address: address,
                city: city,
                state: dropDownValue,
                zipCode: zip,
                shopName: shopName,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                confirm: confirmPassword
            })
            console.log(res.data)
            console.log(res.status)
            router.push('/pos/main')
        }
        catch (err) {
            console.log(err.response.data)
            for (let i = 0; i < err.response.data.length; i++){
                errorMessage.set(err.response.data[i].field , err.response.data[i].defaultMessage  )
            }
            setUserErrors(errorMessage)
        }
    }
      
          
             
    
    return (
        <div className="card col-7 mx-auto p-4">
            {states.length !== 0 &&
                <div className="">
                    <FormGroup className=" justify-content-center text-center px-4 mx-5" id="">
                        <Label className="" for="shopName">
                            <h2>
                                Shop Name
                            </h2>
                        </Label>
                        <Input
                            id="shopName"
                            name="shopName"
                            placeholder=""
                            type="text"
                            onChange={(e) => setShopName(e.target.value)}
                        />
                        {userErrors.get("shopName") &&
                            <Alert color="danger">
                                {userErrors.get("shopName")}
                            </Alert>
                        }
                    </FormGroup>
                    <Form className="d-flex justify-content-center gap-4" >
                        <div className="">
                            <FormGroup>
                                <Label for="firstName">
                                    First Name
                                </Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    placeholder=""
                                    type="text"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {userErrors.get("firstName") &&
                                    <Alert color="danger">
                                        {userErrors.get("firstName")}
                                    </Alert>
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastName">
                                    Last Name
                                </Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    placeholder=""
                                    type="text"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {userErrors.get("lastName") &&
                                    <Alert color="danger">
                                        {userErrors.get("lastName")}
                                    </Alert>
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder=""
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {userErrors.get("email") &&
                                    <Alert color="danger">
                                        {userErrors.get("email")}
                                    </Alert>
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    name="password"
                                    placeholder=""
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {userErrors.get("password") &&
                                    <Alert color="danger">
                                        {userErrors.get("password")}
                                    </Alert>
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label for="confirm">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirm"
                                    name="confirm"
                                    placeholder=""
                                    type="password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}

                                />{userErrors.get("confirmPassword") &&
                                    <Alert color="danger">
                                        {userErrors.get("confirmPassword")}
                                    </Alert>
                                }
                            </FormGroup>
                        </div>
                        <div>
                            <FormGroup>
                                <Label for="address">
                                    Address
                                </Label>
                                <Input
                                    id="address"
                                    name="address"
                                    placeholder=""
                                    type="text"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                {userErrors.get("address") &&
                                    <Alert color="danger">
                                        {userErrors.get("address")}
                                    </Alert>
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label for="city">
                                    City
                                </Label>
                                <Input
                                    id="city"
                                    name="city"
                                    placeholder=""
                                    type="text"
                                    onChange={(e) => setCity(e.target.value)}
                                />
                                {userErrors.get("city") &&
                                    <Alert color="danger">
                                        {userErrors.get("city")}
                                    </Alert>
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label for="zip">
                                    Zip Code
                                </Label>
                                <Input
                                    id="zip"
                                    name="zip"
                                    placeholder=""
                                    type="text"
                                    onChange={(e) => setZip(e.target.value)}
                                />{userErrors.get("zipCode") &&
                                    <Alert color="danger">
                                        {userErrors.get("zipCode")}
                                    </Alert>
                                }
                            </FormGroup>
                            <div className="d-flex p-4 mt-4 ">
                                <Dropdown isOpen={dropdownOpen} toggle={toggle} cl >
                                    <DropdownToggle caret>
                                        {dropDownValue}
                                    </DropdownToggle>
                                    <DropdownMenu >
                                        {
                                            states.map((state, i) => {
                                                if (state.isoCode.length < 3 && state.isoCode !== "PR" && state.isoCode !== "DC" && state.isoCode !== "GU" && state.isoCode !== "MP" && state.isoCode !== "VI" && state.isoCode !== "UM" && state.isoCode !== "AS") {
                                                    return (
                                                        <DropdownItem key={i} onClick={(e) => setDropdownValue(state.isoCode)}>{state.isoCode}</DropdownItem>
                                                    )
                                                }
                                            })}
                                    </DropdownMenu>
                                    {addressErrors.get("state") &&
                                        <Alert color="danger">
                                            {addressErrors.get("state")}
                                        </Alert>
                                    }
                                </Dropdown>
                            </div>
                            <div className="d-flex p-4 ">
                                <Button type="button" onClick={(e) => handleSubmit(e)}>
                                    Sign up
                                </Button>
                                <Link href={'/login'}>
                                    <Button
                                        type="button"
                                        className="btn btn-link bg-transparent border-0"

                                    >
                                        Already have an Account?
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Form>
                </div>
            }
        </div>
    )
}


