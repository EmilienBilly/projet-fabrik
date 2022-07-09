import { useEffect, useState } from "react";
import JobsFinder from "../api/JobsFinder";
import Navbar from "../components/Navbar";

const displayCategoryName = (category_id) => {
    switch (categorie) {
        case 1:
            return colors.alimentation;
        case 2:
            return colors.metaux;
        case 3:
            return colors.mecanique;
        case 4:
            return colors.batiment;
        case 5:
            return colors.services;
        case 6:
            return colors.restauration;
        default:
            return "";
    }
};

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
                                <tr key={job.id}>
                                    <td>{job.name}</td>
                                    <td>{job.description.slice(0, 80)}</td>
                                    {/* Displaying categories name with first letter in uppercase */}
                                    <td>{job.category_name.charAt(0).toUpperCase() + job.category_name.slice(1)}</td>
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
