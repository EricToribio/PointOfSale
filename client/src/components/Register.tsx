import { SetStateAction, useState } from 'react';
import { State } from 'country-state-city';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, FormGroup, Input, Label, Button, Alert } from 'reactstrap';
import axios from 'axios';
import { isAddressValid, registrationValidations } from '../helper/validation';
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
export default () => {
    const history = useHistory()
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
    const [userErrors, setUserErrors] = useState(new Map<string,string>());
    const [addressErrors, setAddressErrors] = useState(new Map<string,string>());

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const registrationErrors = registrationValidations(firstName,lastName,email,password,confirmPassword)
        console.log(registrationErrors)
    
        const addressValidationsErrors = isAddressValid(address, city, dropDownValue,zip)
        if (registrationErrors.size > 0 ||addressValidationsErrors.size > 0) {
            setUserErrors(registrationErrors)
            setAddressErrors(addressValidationsErrors)
            return
        }
        axios.post('http://localhost:8080/api/new/address', {
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
                    Cookies.set("user_id", res.data, { path: '/' })
                    history.push('/main')
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
                                {userErrors.get("firstName") &&
                                <Alert color="danger">
                               {userErrors.get("firstName")}
                              </Alert>
                                }
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
                                {addressErrors.get("address") &&
                                <Alert color="danger">
                               {addressErrors.get("address")}
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
                                {addressErrors.get("city") &&
                                <Alert color="danger">
                               {addressErrors.get("city")}
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
                                />{addressErrors.get("zip") &&
                                <Alert color="danger">
                               {addressErrors.get("zip")}
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
                                <Link to={'/login'}>
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

function setAddress(value: string): void {
    throw new Error('Function not implemented.');
}
