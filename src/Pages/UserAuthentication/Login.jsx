/** @jsxImportSource @emotion/react */
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { login } from "../../app/Features/Auth/auth"
import { Button } from "../../Components"
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom"
import { FlexCenter, FormContainer, InputGroup, StyledError } from "./StyledComponents/StyledComponents"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialValues = {
    email: "",
    password: ""
};

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email Format").required("Required!"),
    password: Yup.string()
    .min(4, "Must be at least 4 characters")
    .max(30, "Must be maximum 30 characters")
    .required("Required!")
});

export const Login = () => {
    const loginDispatch = useDispatch()
    const { loggedInStatus, token } = useSelector( state => state.auth )
    const navigate = useNavigate()
    const handleLogin = (values) => {
        const  { email, password } = values    
        loginDispatch(login( { email, password }))    
    }
    
    useEffect(()=>{
        if( token ){
            navigate("/")
        }
    },[ token, navigate ])
  
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleLogin}
            validationSchema={validationSchema}
        >
            <FlexCenter >
                <Form>
                    <FormContainer>
                        <InputGroup>
                            <label htmlFor="email">Email</label>
                            <Field type="email" id="email" name="email" autoComplete="off" />
                            <ErrorMessage component={StyledError} name="email" />
                        </InputGroup>
                        <InputGroup>
                            <label htmlFor="password">Password</label>
                            <Field type="password" id="password" name="password" autoComplete="off" />
                            <ErrorMessage component={StyledError} name="password" />
                        </InputGroup>
                        <InputGroup>
                            <Button type="submit" variant="primary" size="small" state={loggedInStatus}>
                                Login
                            </Button>
                            <Link to="/signup">Register Instead?</Link>
                        </InputGroup>
                    </FormContainer>
                </Form>
            </FlexCenter>
        </Formik>
    );
};