import styled from "styled-components";

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
    return (
        <StyledForm action="">
            <StyledFormRow>
                <div>
                    <input type="text" placeholder="Nom du métier" />
                </div>
                <div>
                    <input type="text" placeholder="Description" />
                </div>
                <div>
                    <input type="text" placeholder="Catégorie" />
                </div>
                <StyledButton>Ajouter</StyledButton>
            </StyledFormRow>
        </StyledForm>
    );
};

export default AddJobsForm;
