import Navbar from "../components/Navbar";
import styled from "styled-components";
import AddJobsForm from "../components/AddJobsForm";
import JobsTable from "../components/JobsTable";
import Title from "../components/Title";
import { toast } from "react-toastify";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AdminPanel = ({ setAuth }) => {
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Vous êtes déconnecté");
    };
    return (
        <>
            <Navbar />
            <StyledContainer>
                <Title title="Panel d'administration" />
                <div>
                    <button onClick={(e) => logout(e)}>Déconnexion</button>
                    <AddJobsForm />
                    <JobsTable />
                </div>
            </StyledContainer>
        </>
    );
};

export default AdminPanel;
