/** @jsxImportSource @emotion/react */
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { signup } from "../../app/Features/Auth/auth"
import { Button } from "../../Components"
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom"
import { FlexCenter, FormContainer, InputGroup, StyledError } from "./StyledComponents/StyledComponents"

const initialValues = {
    firstName : "",
    lastName : "",
    email: "",
    password: ""
};

const validationSchema = Yup.object({
    firstName : Yup.string().required("Required!"),
    lastName : Yup.string().required("Required!"),
    email: Yup.string().email("Invalid Email Format").required("Required!"),
    password: Yup.string()
    .min(4, "Must be at least 4 characters")
    .max(30, "Must be maximum 30 characters")
    .required("Required!")
});

export const Signup = () => {
    const signupDispatch = useDispatch()
    const { signupStatus } = useSelector( state => state.auth )

    const handleLogin = (values) => {
        const  { firstName, lastName, email, password } = values    
        signupDispatch(signup({ firstName, lastName, email, password }))
    }
  
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
                            <label htmlFor="firstName">First Name</label>
                            <Field type="text" id="firstName" name="firstName" autoComplete="off" />
                            <ErrorMessage component={StyledError} name="firstName" />
                        </InputGroup>
                        <InputGroup>
                            <label htmlFor="lastName">Last Name</label>
                            <Field type="text" id="lastName" name="lastName" autoComplete="off" />
                            <ErrorMessage component={StyledError} name="lastName" />
                        </InputGroup>
                        <InputGroup>
                            <label htmlFor="email">Email</label>
                            <Field type="email" id="email" name="email" autoComplete="off" />
                            <ErrorMessage component={StyledError} name="email" />
                        </InputGroup>
                        <InputGroup>
                            <label htmlFor="password">Password</label>
                            <Field type="text" id="password" name="password" autoComplete="off" />
                            <ErrorMessage component={StyledError} name="password" />
                        </InputGroup>
                        <InputGroup>
                            <Button type="submit" variant="primary" size="small" state={signupStatus}>Signup</Button>
                            <Link to="/login">Already Registered? Login</Link>
                        </InputGroup>
                    </FormContainer>
                </Form>
            </FlexCenter>
        </Formik>
    );
};