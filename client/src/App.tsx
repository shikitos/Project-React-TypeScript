import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Auth } from './pages/';
import { Header, Footer } from './components';

function App() {
    return (
        <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sign-in" element={<Auth />} />
                </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
