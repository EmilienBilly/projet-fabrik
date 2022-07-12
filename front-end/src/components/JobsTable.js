import { useContext, useEffect, useState } from "react";
import JobsFinder from "../api/JobsFinder";
import styled from "styled-components";
import { JobsContext } from "../context/JobsContext";

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
        text-align: center;
    }
`;

const StyledButton = styled.button`
    border-radius: 0.2rem;
    border: none;
    color: ${(props) => props.inputColor || "#a68b00"};
    background-color: ${(props) => props.inputBgColor || "#fff0c2"};
`;

const JobsTable = (props) => {
    // const [jobs, setJobs] = useState([]);
    const { jobs, setJobs } = useContext(JobsContext);
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
            setJobs(
                jobs.filter((jobs) => {
                    return jobs.id !== id;
                })
            );
        } catch (err) {}
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
                            <td>{job.category_name}</td>
                            <td>
                                <StyledButton>Modifier</StyledButton>
                            </td>
                            <td>
                                {/* Passing an arrow function avoid the handleDelete() function to be runned  right away and only when clicking the button*/}
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
