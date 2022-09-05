
import Cookies from 'js-cookie';
import Link from 'next/link';
import router from 'next/router';

import { FormEvent, useState } from 'react';
import { FormGroup, Label, Input, Form, Button, Alert } from "reactstrap"
import axios from '../../axios/axios';

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
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
        try {
            const res = await axios.post('login',
                JSON.stringify(loginInfo), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            console.log(res.data)
            Cookies.set("logout","false",{ path: '/'})
            setLoginInfo({ email: '', password: '' });
            router.push('pos/main')
        } catch (error) {
            if (!error?.response) {
                setErrors('No Server Response');
            } else if (error.response?.status === 401) {
                console.log(error.response.data.error)
                setErrors(error.response.data.error);
            } else {
                setErrors('Login Failed');
            }
    }
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