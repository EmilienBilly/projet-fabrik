import Navbar from "../components/Navbar";
import Title from "../components/Title";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
    margin: auto;
`;

const Form = styled.form`
    margin: auto;
    width: 40%;
    display: flex;
    flex-direction: column;
    padding: 5rem;
`;

const Input = styled.input`
    height: 45px;
    font-size: 16px;
    margin: 0.4rem 0;
    padding: 0 1rem;
    border-radius: 0.2rem;
    border: none;
`;

const Button = styled.button`
    width: 100%;
    height: 35px;
    border-radius: 0.2rem;
    border: none;
    background-color: #c8e6c9;
    color: #388e3c;
    font-size: 1rem;
    font-weight: 600;
    margin: 1rem auto;
`;

const Login = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const { email, password } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { email, password };
            const response = await fetch("http://localhost:4000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const parsedResponse = await response.json();

            if (parsedResponse.token) {
                localStorage.setItem("token", parsedResponse.token);
                setAuth(true);
            } else {
                setAuth(false);
            }
            console.log(parsedResponse);
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            <Navbar />
            <Title title="Connexion" />
            <Container>
                <Form onSubmit={onSubmitForm}>
                    <Input type="email" name="email" placeholder="Email" value={email} onChange={(e) => onChange(e)} />
                    <Input type="password" name="password" placeholder="Mot de passe" value={password} onChange={(e) => onChange(e)} />
                    <Button>Connexion</Button>
                </Form>
            </Container>
        </>
    );
};

export default Login;


