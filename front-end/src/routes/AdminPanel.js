
import Navbar from "../components/Navbar";
import styled from "styled-components";
import AddJobsForm from "../components/AddJobsForm";
import JobsTable from "../components/JobsTable";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        margin: 3rem;
        font-size: 2.5rem;
        font-weight: 900;
        color: black;
        text-align: center;
        text-transform: uppercase;
        background: rgb(132, 94, 194);
        background: linear-gradient(
            61deg,
            rgba(132, 94, 194, 1) 0%,
            rgba(214, 93, 177, 1) 18%,
            rgba(226, 98, 168, 1) 32%,
            rgba(255, 111, 145, 1) 47%,
            rgba(255, 150, 113, 1) 65%
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;

const AdminPanel = () => {

    return (
        <>
            <Navbar />
            <StyledContainer>
                <h1>Panel d'administration</h1>
                <div>
                    <AddJobsForm />
                    <JobsTable />
                </div>
            </StyledContainer>
        </>
    );
};

export default AdminPanel;
