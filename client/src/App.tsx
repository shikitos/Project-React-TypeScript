import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/';
import { Header, Footer } from './components';

function App() {
    return (
        <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
