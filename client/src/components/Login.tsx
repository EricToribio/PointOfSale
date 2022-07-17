import {useState} from 'react';
import { FormGroup, Label, Input, Form, Button } from "reactstrap"

export default ({setRegister} : any) => {
    const [errors, setErrors] = useState("");
    const [loginInfo, setLoginInfo] = useState({
      email: "",
      password: "",
    });
    const loginChangeHandler = (e: any) => {
        setLoginInfo({
          ...loginInfo,
          [e.target.name]: e.target.value
        });
      };
    return (
        <div className="col-4 card mx-auto p-4">
            <Form>
                <FormGroup>
                    <Label for="email">
                        Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        placeholder=""
                        type="email"
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
                    />
                </FormGroup>
                <div className="d-flex p-4 ">
                                <Button >
                                    Sign in
                                </Button>
                                <Button
            type="button"
            fullWidth
            onClick={(e) => setRegister(true)}
            className="btn btn-link bg-transparent border-0"
            
          >
              Don't have an Account?
          </Button>
          </div>
            </Form>
        </div>
    )
}