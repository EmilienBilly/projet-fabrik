import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { JobsContextProvider } from "./context/JobsContext";
import Home from "./routes/Home";
import JobDetails from "./routes/JobDetails";
import AdminPanel from "./routes/AdminPanel";
import Update from "./routes/Update";
import Login from "./routes/Login";
import Register from "./routes/Register";
import { useState } from "react";

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
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const setAuth = (boolean) => {
        setIsAuthenticated(boolean);
    };
    return (
        <JobsContextProvider>
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:id" element={<JobDetails />} />
                    <Route path="/admin" element={isAuthenticated ? <AdminPanel setAuth={setAuth} /> : <Navigate replace to="/login" />} />
                    <Route path="/admin/:id/update" element={isAuthenticated ? <Update /> : <Navigate replace to="/login" />} />
                    <Route path="/login" element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate replace to="/admin" />} />
                    <Route path="/register" element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate replace to="/login" />} />
                </Routes>
            </BrowserRouter>
        </JobsContextProvider>
    );
}

export default App;
