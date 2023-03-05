// React
import React, { useContext } from 'react';

// Componentes
import RegistrarUsuario from './RegistrarUsuario';
import ContactApp from './ContactApp';
import AddContatc from './AddContatc';
import EditContatc from './EditContatc';

// Context
import { AppContext } from '../context/AppContext'
import ContactSelected from './ContactSelected';

// Alerts
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrimerComponente = () => {

  const { currentUser, setCurrentUser, view, setView, } = useContext( AppContext );

  return (
    <div className='bg-secondary' style={{}}>
        <main className='container m-0 p-0 mx-auto'>
            { view == 0 ?
              <RegistrarUsuario />
            : view == 1 ?
              <ContactApp />
            : view == 2 ?
              <AddContatc />
            : view == 3 ?
              <ContactSelected />
            : view == 4 ?
              <EditContatc />
            : null
            }
            <ToastContainer />
        </main>
    </div>
  )
}

export default PrimerComponente;
