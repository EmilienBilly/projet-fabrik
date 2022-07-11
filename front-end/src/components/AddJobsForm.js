import { useState } from "react";
import styled from "styled-components";
import JobsFinder from "../api/JobsFinder";

const StyledForm = styled.form`
    padding: 2rem 0;
`;

const StyledFormRow = styled.div`
    display: flex;

    div {
        width: 100%;
        margin-right: 1rem;

        input {
            width: 100%;
            height: 30px;
        }
    }
`;

const StyledButton = styled.button`
    border-radius: 0.2rem;
    border: none;
    background-color: #c8e6c9;
    color: #388e3c;
`;

const AddJobsForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(0);

    const handleSubmit = async (e) => {
        // Avoid reloading the page and losing our state
        e.preventDefault();
        try {
            const response = await JobsFinder.post("/", {
                name: name,
                description: description,
                category_id: category,
            });
            console.log(response);
        } catch (err) {}
    };

    return (
        <StyledForm action="">
            <StyledFormRow>
                <div>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Nom du métier" />
                </div>
                <div>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Description" />
                </div>
                <div>
                    <input value={category} onChange={(e) => setCategory(e.target.value)} type="number" placeholder="Catégorie" />
                </div>
                <StyledButton onClick={handleSubmit} type="submit">
                    Ajouter
                </StyledButton>
            </StyledFormRow>
        </StyledForm>
    );
};

export default AddJobsForm;
