import { useState, createContext } from "react";

export const JobsContext = createContext();

export const JobsContextProvider = (props) => {
    const [jobs, setJobs] = useState([]);

    return <JobsContext.Provider value={{ jobs, setJobs }}>{props.children}</JobsContext.Provider>;
};
