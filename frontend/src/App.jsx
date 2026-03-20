import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRouter from './routes/AppRouter';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="container main-container">
                <AppRouter />
            </div>
        </BrowserRouter>
    );
}

export default App;
