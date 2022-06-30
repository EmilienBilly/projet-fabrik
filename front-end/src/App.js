import Home from "./Home";
import JobDetails from "./JobDetails";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

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

        #root {
            width: 100%;
        }
    }
`;

function App() {
    return (
        <>
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:titre" element={<JobDetails />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
