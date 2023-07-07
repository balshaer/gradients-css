import { Container } from '@mui/material';
import 'animate.css';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Footer from './components/Footer/Footer';
import Gradients from './components/Gradients/Gradients';
import Preloader from './components/Preloader/Preloader';

function App() {
return (
<div className="App">
<Preloader />
<Toaster position="bottom-right" reverseOrder={false} />
<Container style={{ maxWidth: '1376px' }}>
<Gradients />
<Footer />
</Container>
</div>
);
}

export default App;