import Navbar from "../components/Navbar";
import Title from "../components/Title";
import UpdateForm from "../components/UpdateForm";
import styled from "styled-components";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
`

const Update = () => {
    return (
        <>
            <Navbar />
            <StyledContainer>
                <Title title="Mise à jour" />
                <UpdateForm />
            </StyledContainer>
        </>
    );
};

export default Update;
