import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Auth, Profile, Support } from './pages/';
import { Header, Footer } from './components';
import {useEffect} from "react";
import useFetch from "./hooks/useFetch";
import {removeItem} from "./utils/storage";

function App() {
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/isauthenticated");
                if (!res.ok) {
                    removeItem('user');
                    return;
                }
                const data = await res.json();
            } catch (error) {
                console.error(error);
            }
        };
        checkAuth()
    });

    return (
        <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sign-in" element={<Auth />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/support" element={<Support />} />
                </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
