import { useEffect, useState } from "react";
import JobsFinder from "../api/JobsFinder";
import Navbar from "../components/Navbar";

const AdminPanel = () => {
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
    return (
        <>
            <Navbar />
            <h1>Panel d'administration</h1>
            <div>
                <table>
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
                                <tr>
                                    <td>{job.name}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminPanel;
