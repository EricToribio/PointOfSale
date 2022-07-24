import {useState} from 'react';
import { Link } from 'react-router-dom';
import { FormGroup, Label, Input, Form, Button } from "reactstrap"

export default () => {
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
                        onChange={(e) => loginChangeHandler(e)}
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
                        onChange={(e) => loginChangeHandler(e)}
                    />
                </FormGroup>
                <div className="d-flex p-4 ">
                                <Button >
                                    Sign in
                                </Button>
                                
          <Link to={"/register"}>
          <Button
            type="button"
            className="btn btn-link bg-transparent border-0"
            
          >
              Don't have an Account?
          </Button>
          </Link>
          </div>
            </Form>
        </div>
    )
}