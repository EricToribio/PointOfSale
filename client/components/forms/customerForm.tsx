import { State } from "country-state-city";
import { useState } from "react";
import PhoneInput from "react-phone-number-input/input";
import { Alert, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label } from "reactstrap"
import { Address, Customer } from "../../utils/customer";
export default (props : {customerChangeHandler : Function, addressChangeHandler : Function,handleSubmit : Function | null,customer : Customer | undefined, address : Address | undefined}) => {
    const [states] = useState(State.getStatesOfCountry("US"))
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [userErrors, setUserErrors] = useState(new Map<string, string>());
    const [addressErrors, setAddressErrors] = useState(new Map<string, string>());


    return (
 <div className="border rounded border-dark p-4">
                <h3 className="text-center">Customer</h3>
                <div className=" d-flex gap-4  ">
                    <div className="">
                        <FormGroup>
                            <Label for="firstName">
                                First Name
                            </Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                placeholder=""
                                value={props.customer?.firstName}
                                type="text"
                                onChange={(e) => props.customerChangeHandler(e.target.name, e.target.value)}
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
                                value={props.customer?.lastName}
                                placeholder=""
                                type="text"
                                onChange={(e) => props.customerChangeHandler(e.target.name, e.target.value)}
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
                                value={props.customer?.email}
                                type="email"
                                onChange={(e) => props.customerChangeHandler(e.target.name, e.target.value)}
                            />
                            {userErrors.get("email") &&
                                <Alert color="danger">
                                    {userErrors.get("email")}
                                </Alert>
                            }
                        </FormGroup>
                        <FormGroup className="mx-auto pb-2" >

                            <Label className="pb-2">Enter phone number</Label>
                            <br />

                            <PhoneInput
                                className="phone-input"
                                country="US"
                                name="phone"
                                value={props.customer?.phone}
                                onChange={(e) => props.customerChangeHandler("phone", e)}
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
                                value={props.address?.address}
                                type="text"
                                onChange={(e) => props.addressChangeHandler(e)}
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
                                value={props.address?.city}
                                type="text"
                                onChange={(e) => props.addressChangeHandler(e)}
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
                                value={props.address?.zip}
                                placeholder="5 digit zip" 
                                type="number"
                                onChange={(e) => {
                                    props.addressChangeHandler(e)}}
                            />{userErrors.get("zipCode") &&
                                <Alert color="danger">
                                    {userErrors.get("zipCode")}
                                </Alert>
                            }
                        </FormGroup>
                        <br/>
                        <div className="d-flex justify-content-center  mt-3 ">
                            <Dropdown
                                isOpen={dropdownOpen}
                                toggle={toggle}
                            >
                                <DropdownToggle caret>
                                {props.address?.state ? props.address?.state : "State"}
                                </DropdownToggle>
                                <DropdownMenu >
                                    {
                                        states.map((state, i) => {
                                            if (state.isoCode.length < 3 && state.isoCode !== "PR" && state.isoCode !== "DC" && state.isoCode !== "GU" && state.isoCode !== "MP" && state.isoCode !== "VI" && state.isoCode !== "UM" && state.isoCode !== "AS") {
                                                return (
                                                    <DropdownItem name="state" value={state.isoCode} key={i} onClick={(e) => props.addressChangeHandler(e)}>{state.isoCode}</DropdownItem>
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
                    </div>
                </div>
                {
                    props.handleSubmit != null &&

                <div className="d-flex justify-content-end pt-4 ">
                        <Button type="button" onClick={(e) => props.handleSubmit(e)}>
                            Submit
                        </Button>
                                    </div>
                }
            </div> 
    )
}