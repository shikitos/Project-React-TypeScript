import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Auth, Profile } from './pages/';
import { Header, Footer } from './components';

function App() {
    return (
        <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sign-in" element={<Auth />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
