import { Toaster } from 'react-hot-toast';
import './App.css';
import Gradients from './components/Gradients/Gradients';
import Footer from './components/Footer/Footer';
import { Container } from '@mui/material';
import Preloader from './components/Preloader/Preloader';
import 'animate.css';

function App() {

  return (
    <div className="App">
      <Preloader />
      <Toaster position="bottom-right" reverseOrder={false} />

      <Container style={{ maxWidth: '1376px' }} >
        <Gradients />
        <Footer />
      </Container>
    </div>
  );
}

export default App;
