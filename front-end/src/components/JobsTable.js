import { useEffect, useState } from "react";
import JobsFinder from "../api/JobsFinder";
import styled from "styled-components";

const StyledTable = styled.table`
    margin: auto;
    border-collapse: collapse;
`;

const StyledTableRow = styled.tr`
    :nth-child(even) {
        background-color: #333333;
    }

    td {
        padding: 0.8rem;
    }
`;

const StyledButton = styled.button`
    border-radius: 0.2rem;
    border: none;
    color: ${(props) => props.inputColor || "#a68b00"};
    background-color: ${(props) => props.inputBgColor || "#fff0c2"};
`;

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

const JobsTable = () => {
    const [jobs, setJobs] = useState([]);
    console.log(jobs);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await JobsFinder.get("/");
                setJobs(response.data.data.jobs);
            } catch (err) {}
        };

        fetchData();
    }, []);

    function trimmedContent(content, length) {
        var trimmedString = content.substr(0, length);
        return trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
    }

    const handleDelete = async (id) => {
        try {
            const responseDeleted = await JobsFinder.delete(`/${id}`);
        } catch {}
    };

    return (
        <StyledTable>
            <thead>
                <tr>
                    <th>Métier</th>
                    <th>Description</th>
                    <th>Catégorie</th>
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
                                <StyledButton onClick={() => handleDelete(job.id)} inputColor="#c62828" inputBgColor="#ffcdd2">
                                    Supprimer
                                </StyledButton>
                            </td>
                        </StyledTableRow>
                    ))}
            </tbody>
        </StyledTable>
    );
};

export default JobsTable;
