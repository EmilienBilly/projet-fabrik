import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import JobsFinder from "../api/JobsFinder";

const StyledButton = styled.button`
    border-radius: 0.2rem;
    border: none;
    background-color: #c8e6c9;
    color: #388e3c;
`;

const UpdateForm = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [video, setVideo] = useState("");
    const [category, setCategory] = useState("");
    const [degrees, setDegrees] = useState("");

    useEffect(() => {
        const fetch = async () => {
            const response = await JobsFinder.get(`/${id}`);
            console.log(response.data.data);
            setName(response.data.data.jobs.name);
            setDescription(response.data.data.jobs.description);
            setVideo(response.data.data.jobs.video);
            setCategory(response.data.data.category);
        };
        fetch();
    }, []);

    return (
        <>
            <form action="">
                <div>
                    <label htmlFor="job">Métier</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" />
                </div>
                <div>
                    <label htmlFor="video">Vidéo</label>
                    <input value={video} onChange={(e) => setVideo(e.target.value)} type="text" />
                </div>
                <div>
                    <label htmlFor="category">Catégorie</label>
                    <input value={category} onChange={(e) => setCategory(e.target.value)} type="text" />
                </div>
                <StyledButton>Enregistrer</StyledButton>
            </form>
        </>
    );
};

export default UpdateForm;
