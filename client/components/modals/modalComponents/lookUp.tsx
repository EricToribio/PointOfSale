import { Button, Form, FormGroup, Label } from "reactstrap"
import PhoneInput from 'react-phone-number-input/input'
import { useState } from "react"
export default () => {
    const [phoneNumber, setPhoneNumber] = useState()

    return (
        <div className="d-flex justify-content-center p-2">
            <Form className="card p-3" >
                <FormGroup className="mx-auto pb-4 " >
                    <p className="text-center">Enter phone number</p>
                    <br/>
                    <PhoneInput
                        className="phone-input"
                        country="US"
                        onChange={(e) => setPhoneNumber({ e })}
                        />
                        </FormGroup>
                    <Button >Search</Button>
            </Form>
        </div>
    )
}