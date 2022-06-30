import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";

const colors = {
    alimentation: "#85B36B;",
    restauration: "#4C83FA;",
    batiment: "#E76A4B;",
    services: "#827191;",
    metaux: "#245A6A;",
    mecanique: "#FC7F36;",
};

const handleColor = (categorie) => {
    switch (categorie) {
        case "alimentation":
            return colors.alimentation;
        case "restauration":
            return colors.restauration;
        case "batiment":
            return colors.batiment;
        case "services":
            return colors.services;
        case "metaux":
            return colors.metaux;
        case "mecanique":
            return colors.mecanique;
        default:
            return "";
    }
};

const StyledWrapper = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2rem auto;

    @media (min-width: 1200px) {
        width: 75%;
    }

    @media (min-width: 1980px) {
        width: 50%;
    }
`;

const StyleJobTitle = styled.h1`
    width: 100%;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 2.5rem;
    text-align: center;
    color: ${({ categorie }) => handleColor(categorie)};
    margin: 30px 0 0 0;

    @media (min-width: 767px) {
        text-align: left;
    }
`;

const StyledJobDetails = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    justify-items: center;
    align-items: center;
    border-top: 3px solid;
    border-bottom: 3px solid;
    border-color: ${({ categorie }) => handleColor(categorie)};
    padding: 1rem 0;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const StyleddVideo = styled.div`
    padding: 1rem;
`;

const StyledDescription = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    p {
        line-height: 1.8;
        font-size: 0.8rem;
    }

    @media (min-width: 767px) {
        font-size: 0.9rem;
        text-align: left;
    }

    @media (min-width: 1200px) {
        p {
            font-size: 1rem;
        }
    }

    @media (min-width: 1980px) {
        p {
            font-size: 1.1rem;
        }
    }
`;

const StyledImg = styled.div`
    justify-self: center;

    img {
        border-radius: 1rem;
        height: 300px;
        width: 280px;
        object-fit: cover;
    }

    @media (min-width: 768px) {
        justify-self: end;

        img {
            height: 380px;
            width: 330px;
        }
    }

    @media (min-width: 1980px) {
        img {
            height: 500px;
            width: 450px;
        }
    }
`;

const StyledDiplomes = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    color: white;

    span {
        display: flex;
        align-items: center;
        justify-content: space-between;

        img {
            height: 2rem;
            padding-left: 0.5rem;
        }
    }

    h3 {
        margin: 0;
        font-size: 1rem;
    }

    @media (min-width: 767px) {
        h3 {
            font-size: 1.5rem;
        }

        img {
            height: 2.5rem;
            padding-left: 1rem;
        }
    }
`;

const StyledButtons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 70px;
        width: 160px;
        background-color: ${({ categorie }) => handleColor(categorie)};
        border: none;
        border-radius: 5px;
        color: #fff;
        text-transform: uppercase;
        font-size: 0.9rem;
        font-weight: 600;
        margin: 0.5rem;
    }

    a {
        text-decoration: none;
    }

    @media (min-width: 767px) {
        flex-direction: row;
    }
`;

const JobDetails = () => {
    const { titre } = useParams();
    const [jobs, setJobs] = useState([]);
    const job = jobs.find((job) => job.title === titre);

    useEffect(() => {
        fetchJobs();
    }, []);

    async function fetchJobs() {
        const { data } = await supabase.from("metiers").select("*");
        setJobs(data);
    }

    return (
        <>
            <Navbar />
            {/* Conditional templating to avoid TypeError */}
            {job && (
                <StyledWrapper>
                    <StyleJobTitle categorie={job.category}>{titre}</StyleJobTitle>
                    <StyledJobDetails categorie={job.category}>
                        <StyledDescription categorie={job.category}>
                            <p>{job.description}</p>
                        </StyledDescription>
                        <StyledImg categorie={job.category}>
                            <img src={`/images/${titre}.jpg`} alt="" />
                        </StyledImg>
                    </StyledJobDetails>
                    <StyledDiplomes>
                        <span>
                            <h3>Découvre les formations</h3>
                            <img src="/images/logo-diplome.svg" alt="" />
                        </span>
                        <StyledButtons categorie={job.category}>
                            {job.diplomes.map((diplome, index) => (
                                <a key={index} href={diplome.lien}>
                                    <button>
                                        <span>{diplome.titre}</span>
                                    </button>
                                </a>
                            ))}
                        </StyledButtons>
                    </StyledDiplomes>
                    <StyleddVideo>
                        <iframe
                            width="694"
                            height="359"
                            src={job.video}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                    </StyleddVideo>
                </StyledWrapper>
            )}
        </>
    );
};

export default JobDetails;
