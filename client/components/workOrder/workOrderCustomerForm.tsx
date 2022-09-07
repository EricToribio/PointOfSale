import { Dispatch, SetStateAction, useState } from "react"
import { Form, FormGroup, Input, Label } from "reactstrap"


export default () => {
const [firstName, setFirstName] = useState<string>()
    return(
        <Form>
            <div>
                <FormGroup>
                    <Label>
                        FirstName
                    </Label>
                    <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                    />
                </FormGroup>
            </div>

        </Form>
    )
}