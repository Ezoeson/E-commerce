// eslint-disable-next-line no-unused-vars

import Header from './Component/Header';
import Footer from './Component/Footer';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThemeContextProvider from './context/ThemeContext';

function App() {
  return (
    <>
      <ThemeContextProvider>
        <ToastContainer />
        <Header />
        <main className='px-4 py-3'>
          <Container>
            <Outlet />
          </Container>
        </main>
        <Footer />
      </ThemeContextProvider>
    </>
  );
}

export default App;
