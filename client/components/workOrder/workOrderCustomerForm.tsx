import { State } from "country-state-city";
import { Dispatch, SetStateAction, useState } from "react"
import PhoneInput from "react-phone-number-input/input";
import { Alert, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label } from "reactstrap"


export default () => {
    let errorMessage = new Map<string, string>();
    const [states] = useState(State.getStatesOfCountry("US"))
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [dropDownValue, setDropdownValue] = useState("State")
    // ------------form data------------------//
    const [firstName, setFirstName] = useState(String);
    const [lastName, setLastName] = useState(String);
    const [email, setEmail] = useState(String);
    const [phoneNumber, setPhoneNumber] = useState();

    const [address, setAddress] = useState(String);
    const [city, setCity] = useState(String);
    const [zip, setZip] = useState(String);
    const [shopName, setShopName] = useState(String);
    const [userErrors, setUserErrors] = useState(new Map<string, string>());
    const [addressErrors, setAddressErrors] = useState(new Map<string, string>());
    return (

        <Form className="d-flex px-4 gap-4" >
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
                        <FormGroup className="mx-auto pb-2" >

                            <Label className="pb-2">Enter phone number</Label>
                            <br />

                            <PhoneInput
                                className="phone-input"
                                country="US"
                                onChange={(e) => setPhoneNumber({ e })}
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
                        <br/>
                        <div className="d-flex justify-content-center  mt-3 ">
                            <Dropdown
                                isOpen={dropdownOpen}
                                toggle={toggle}
                            >
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
                    </div>
                </div>
            </div>
            <div className="border rounded border-dark p-4">
                <h3 className="text-center">Vehicle</h3>
                <div className="d-flex gap-4">
                    <div>
                        <FormGroup>
                            <Label for="year">
                                Year
                            </Label>
                            <Input
                            id="year"
                            name="year"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="make">
                                Make
                            </Label>
                            <Input
                            id="make"
                            name="make"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="model">
                                Model
                            </Label>
                            <Input
                            id="model"
                            name="model"
                            />
                        </FormGroup>
                    </div>
                    <div>
                        <FormGroup>
                            <Label for="vin">
                                Vin
                            </Label>
                            <Input
                            id="vin"
                            name="vin"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="plate">
                                Plate
                            </Label>
                            <Input
                            id="plate"
                            name="plate"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="engineSize">
                                Engine Size
                            </Label>
                            <Input
                            type="number"
                            id="engineSize"
                            name="engineSize"
                            />
                                                    </FormGroup>
                                                    <br/>
                                    <div className="d-flex justify-content-end pt-4 ">
                        <Button type="button" onClick={(e) => handleSubmit(e)}>
                            Submit
                        </Button>
                                    </div>
                    </div>
                                </div>
                </div>
        </Form>
    )
}