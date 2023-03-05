import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';

import { cerrarSesion, obtenerDatos } from '../firebase/firebase';

import { AiOutlinePlus } from 'react-icons/ai';

const ContactApp = () => {

    const [data, setData] = useState(null);

    const { currentUser, setCurrentUser, view, setView, contactSelected, setContactSelected } = useContext( AppContext );

    const handleClickCerrarSesion = async () => {
        await cerrarSesion();
        setCurrentUser('niguno');
        setView(0);
    }

    useEffect(()=>{
        const getInfo = async () => {
            setData( await obtenerDatos(currentUser) );
        }
        getInfo();
    }, [view] );

    const handleAddContact = () => setView(2);

		const handleClickContact = (contatc) => {
			setContactSelected( contatc );
			setView(3);
			// console.log(contatc);
		}

  return (
    <div className='mx-3 vh-100'>
      <header className='d-flex justify-content-between pt-2'>
        <p className='fs-3 text-primary mt-1 ' onClick={handleClickCerrarSesion}>cerrar sesion</p>
        {/* <p className='fs-3 mt-1'>{currentUser}</p> */}
        <AiOutlinePlus className='text-start fs-1 text-primary mt-2' onClick={handleAddContact} />
        {/* <p className='fs-1 text-primary col-4 text-end' onClick={handleAddContact}>+</p> */}
      </header>

    	<div className=''>
        <p className='fs-1 text-white fw-bold m-0 mt-5'>Contactos</p>
        <input className='form-control' type="text" placeholder='Buscar' />

        <div>
          { data ?
          	data.map((contact)=>(
              <ul className='list-group list-group-flush mt-3' key={contact.id}>
                <li className='list-group-item bg-secondary border-bottom border-dark ps-0 text-white fs-6' onClick={()=>handleClickContact(contact)}>{contact.nombre} <small className='fw-bold'>{contact.apellidos}</small></li>
              </ul>
          	))
        	: null
        	}
        </div>
      </div>
    </div>
  )
}

export default ContactApp
