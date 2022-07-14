import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import JobsFinder from "../api/JobsFinder";

const StyledButton = styled.button`
    width: 100px;
    height: 50px;
    border-radius: 0.2rem;
    border: none;
    background-color: #c8e6c9;
    color: #388e3c;
    font-size: 1rem;
    font-weight: 600;
`;

const StyledForm = styled.form`
    width: 80%;
    display: flex;
    flex-direction: column;
`;

const StyledFormGroup = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem 0;

    label {
        padding: 0.5rem 0;
    }

    input {
        height: 30px;
        font-size: 16px;
    }
`;

const StyledDescription = styled.textarea`
    min-width: 100%;
    max-width: 100%;
    height: 200px;
    font-family: "Poppins", sans-serif;
    font-size: 1.1rem;
    line-height: 25px;
`;

const UpdateForm = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [video, setVideo] = useState("");
    const [category, setCategory] = useState("");
    const [degrees, setDegrees] = useState("");

    useEffect(() => {
        const fetch = async () => {
            const response = await JobsFinder.get(`/${id}`);
            console.log(response.data.data);
            setName(response.data.data.jobs.name);
            setDescription(response.data.data.jobs.description);
            setVideo(response.data.data.jobs.video);
            setCategory(response.data.data.category);
        };
        fetch();
    }, []);

    return (
        <>
            <StyledForm action="">
                <StyledFormGroup>
                    <label htmlFor="job">Métier</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                </StyledFormGroup>

                <StyledFormGroup>
                    <label htmlFor="video">Vidéo</label>
                    <input value={video} onChange={(e) => setVideo(e.target.value)} type="url" />
                </StyledFormGroup>
                <StyledFormGroup>
                    <label htmlFor="category">Catégorie</label>
                    <input value={category} onChange={(e) => setCategory(e.target.value)} type="text" />
                </StyledFormGroup>
                <StyledFormGroup>
                    <label htmlFor="description">Description</label>
                    <StyledDescription value={description} onChange={(e) => setDescription(e.target.value)} type="text" />
                </StyledFormGroup>
                <StyledButton>Enregistrer</StyledButton>
            </StyledForm>
        </>
    );
};

export default UpdateForm;
