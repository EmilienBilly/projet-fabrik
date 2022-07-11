import { useEffect, useState } from "react";
import JobsFinder from "../api/JobsFinder";
import Navbar from "../components/Navbar";
import styled from "styled-components";

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
const StyledTable = styled.table`
    margin: auto;
    border-collapse: collapse;
`;

const StyledTableRow = styled.tr`
    :nth-child(even) {
        background-color: #435f60;
    }

    td {
        padding: 0.8rem;
    }
`;

const StyledButton = styled.button`
    border-radius: 0.2rem;
    background-color: #fff0c2;
    color: ${(props) => props.inputColor || "#a68b00"};
    background-color: ${(props) => props.inputBgColor || "#fff0c2"};
`;

const AdminPanel = () => {
    const [jobs, setJobs] = useState([]);
    console.log(jobs);

    function trimmedContent(content, length) {
        var trimmedString = content.substr(0, length);
        return trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await JobsFinder.get("/");
                setJobs(response.data.data.jobs);
            } catch (err) {}
        };
        fetchData();
    }, []);
    return (
        <>
            <Navbar />
            <StyledContainer>
                <h1>Panel d'administration</h1>
                <div>
                    <StyledTable>
                        <thead>
                            <tr>
                                <th>Métier</th>
                                <th>Description</th>
                                <th>Catégorie</th>
                                <th>Modifier</th>
                                <th>Supprimer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs &&
                                jobs.map((job) => (
                                    <StyledTableRow key={job.id}>
                                        <td>{job.name}</td>
                                        <td>{trimmedContent(job.description, 90) + "..."}</td>
                                        {/* Displaying categories name with first letter in uppercase */}
                                        <td>{job.category_name.charAt(0).toUpperCase() + job.category_name.slice(1)}</td>
                                        <td>
                                            <StyledButton>Modifier</StyledButton>
                                        </td>
                                        <td>
                                            <StyledButton inputColor="#c62828" inputBgColor="#ffcdd2">
                                                Supprimer
                                            </StyledButton>
                                        </td>
                                    </StyledTableRow>
                                ))}
                        </tbody>
                    </StyledTable>
                </div>
            </StyledContainer>
        </>
    );
};

export default AdminPanel;
