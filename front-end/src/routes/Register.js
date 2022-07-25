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

const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
    });

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("")
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            <Navbar />
            <Title title="Register" />
            <Container>
                <Form onSubmit={onSubmit}>
                    <Input type="text" name="username" placeholder="Nom d'utilisateur" value={inputs.username} onChange={(e) => onChange(e)} />
                    <Input type="email" name="email" placeholder="Email" value={inputs.email} onChange={(e) => onChange(e)} />
                    <Input type="password" name="password" placeholder="Mot de passe" value={inputs.password} onChange={(e) => onChange(e)} />
                    <Button>Envoyer</Button>
                </Form>
            </Container>
        </>
    );
};

export default Register;
