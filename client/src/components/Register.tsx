import { useState } from 'react';
import { State } from 'country-state-city';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import axios from 'axios';
import { registrationValidations } from '../helper/validation';

export default ({ setRegister }: any) => {
    const [states] = useState(State.getStatesOfCountry("US"))
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [dropDownValue, setDropdownValue] = useState("State")
    // ------------form data------------------//
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zip,setZip] = useState("");
    const [errors, setErrors] = useState(new Map<string,string>());

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const registrationErrors = registrationValidations(firstName,lastName,email,password,confirmPassword)
        console.log(registrationErrors)
        if (registrationErrors.size > 0) {
            setErrors(registrationErrors)
            return
        }
        axios.post('http://localhost:8080/api/new/address', {
            first_name: firstName,
            address: address,
            city: city,
            state: dropDownValue,
            zip: zip,
        })
            .then(res => {
                console.log(res)
                axios.post('http://localhost:8080/api/new/user',{
                    first_name : firstName,
                    last_name : lastName,
                    email : email,
                    password : password,
                    confirmPassword : confirmPassword,
                    addresses_id : res.data["address_id"]
                })
                .then(res => {
                    console.log(res.data)
                })

            }
            )
    }
    return (
        <div className="card col-7 mx-auto p-4">
            {states.length !== 0 &&
                <div className="d-flex justify-content-center gap-4">
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
                            </FormGroup> <FormGroup>
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

                                />
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
                                />
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
                                </Dropdown>
                            </div>
                            <div className="d-flex p-4 ">
                                <Button type="button" onClick={(e) => handleSubmit(e)}>
                                    Sign up
                                </Button>
                                <Button
                                    type="button"
                                    onClick={(e) => setRegister(false)}
                                    className="btn btn-link bg-transparent border-0"

                                >
                                    Already have an Account?
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            }
        </div>
    )
}

function setAddress(value: string): void {
    throw new Error('Function not implemented.');
}
