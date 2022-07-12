import { useState, createContext } from "react";

export const JobsContext = createContext();

export const JobsContextProvider = (props) => {
    const [jobs, setJobs] = useState([]);
    
    const addJobs = (job) => {
        setJobs([...jobs, job])
    }

    return <JobsContext.Provider value={{ jobs, setJobs, addJobs }}>{props.children}</JobsContext.Provider>;
};
