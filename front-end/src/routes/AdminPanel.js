import Navbar from "../components/Navbar";
import styled from "styled-components";
import AddJobsForm from "../components/AddJobsForm";
import JobsTable from "../components/JobsTable";
import Title from "../components/Title";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AdminPanel = () => {
    return (
        <>
            <Navbar />
            <StyledContainer>
                <Title title="Panel d'administration" />
                <div>
                    <AddJobsForm />
                    <JobsTable />
                </div>
            </StyledContainer>
        </>
    );
};

export default AdminPanel;
