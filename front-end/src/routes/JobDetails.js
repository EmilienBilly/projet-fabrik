import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import JobsFinder from "../api/JobsFinder";

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
    const { id } = useParams();
    const [jobs, setJobs] = useState([]);
    const [degrees, setDegrees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await JobsFinder.get(`/${id}`);
            setJobs(response.data.data.jobs);
            setDegrees(response.data.data.degrees);
        };
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            {/* Conditional templating to avoid TypeError */}
            {jobs && (
                <StyledWrapper>
                    <StyleJobTitle categorie={jobs.category_id}>{jobs.name}</StyleJobTitle>
                    <StyledJobDetails categorie={jobs.category_id}>
                        <StyledDescription categorie={jobs.category_id}>
                            <p>{jobs.description}</p>
                        </StyledDescription>
                        <StyledImg categorie={jobs.category_id}>
                            <img src={`/images/${jobs.name}.jpg`} alt="" />
                        </StyledImg>
                    </StyledJobDetails>
                    <StyledDiplomes>
                        <span>
                            <h3>Découvre les formations</h3>
                            <img src="/images/logo-diplome.svg" alt="" />
                        </span>
                        <StyledButtons categorie={jobs.category_id}>
                            {degrees.map((degree, index) => (
                                <a key={index} href={degree.link}>
                                    <button>
                                        <span>{degree.name}</span>
                                    </button>
                                </a>
                            ))}
                        </StyledButtons>
                    </StyledDiplomes>
                    {/* <StyleddVideo>
                        <iframe
                            width="694"
                            height="359"
                            src={jobs.video}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen></iframe>
                    </StyleddVideo> */}
                </StyledWrapper>
            )}
        </>
    );
};

export default JobDetails;
