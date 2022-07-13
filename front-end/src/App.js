import { Route, Routes, BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { JobsContextProvider } from "./context/JobsContext";
import Home from "./routes/Home";
import JobDetails from "./routes/JobDetails";
import AdminPanel from "./routes/AdminPanel";
import Update from "./routes/Update";

const GlobalStyles = createGlobalStyle`

    body {
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0;
        margin: 0;
        max-height: 100vh;
        font-family: 'Poppins', sans-serif;
        background: #242424;
        color: #f8f9fa;

        #root {
            width: 100%;
        }
    }
`;

function App() {
    return (
        <JobsContextProvider>
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:id" element={<JobDetails />} />
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/admin/:id/update" element={<Update />} />
                </Routes>
            </BrowserRouter>
        </JobsContextProvider>
    );
}

export default App;
