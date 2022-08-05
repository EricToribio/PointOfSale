import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import router from 'next/router';
import Router from 'next/router';
import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { FormGroup, Label, Input, Form, Button, Alert } from "reactstrap"

export default  () => {
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
const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/login',loginInfo)
    .then(res =>{
        console.log(res.data)
        if (res.data?.error) {
        setErrors(res.data.error) }
        else {
        Cookies.set("user_id", res.data, { path: '/' })
        router.push('/pos/main')}
        
                    
    })
}

    return (
        <div className="col-4 card mx-auto p-4">
            <Form onSubmit={(e) => handleSubmit(e)}>
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
                {errors != "" &&
                <Alert color="danger">
                               {errors}
                              </Alert>}
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

                    <Link href="/register">
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