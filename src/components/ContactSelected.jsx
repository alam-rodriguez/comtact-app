import React, { useContext, useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

import { AppContext } from '../context/AppContext';
import imgPerfil from '../imgs/images.png';

import { obtenerImagen } from '../firebase/firebase'

const ContactSelected = () => {

  const [img, setImg] = useState(null);

  useEffect(()=>{
    const getImg = async () => {
      try {
        setImg( await obtenerImagen(contactSelected.img) );
      } catch (error) {
        console.log('no hay img');
        // console.log(contactSelected)
      }
    }
    getImg();
  }, [] )

    const { currentUser, contactSelected, setContactSelected, setView,  } = useContext(AppContext);


    const handleClickAtras = () => {
        setView(1);
        setContactSelected(null)
    }
    const handleClickEditar = () => {
        setView(4)
    }

  return (
    <div className='mx-2 vh-100'>
      <header className='d-flex justify-content-between pt-2'>
        <div onClick={handleClickAtras} className='d-flex'>
            <IoIosArrowBack className='text-primary fs-3 mt-1' />
            <p className='text-primary fs-4'>Buscar</p>
        </div>
        <p className='text-primary fs-4' onClick={handleClickEditar}>Editar</p>
      </header>

      <div className='d-flex flex-column justify-content-center'>
        { img ? 
          <img className='m-auto rounded-circle' src={img} style={{width: 130, height:130}} />
        : 
          <img className='m-auto' src={imgPerfil} style={{width: 130}} />
        }
        {/* <img className='m-auto' src={imgPerfil} style={{width: 130}} /> */}
        <p className='text-center text-white fs-3 m-0'>{contactSelected.nombre} <small className='fw-semibold'>{contactSelected.apellidos}</small></p>
        <p className='text-center fw-lighter text-muted'>{contactSelected.empresa}</p>
        { contactSelected.telefono ?
            <div className='bg-black px-2 py-1 rounded-2'>
                <p className='text-white fs-6 m-0'>telefono</p>
                <p className='text-primary fs-4 m-0'>{contactSelected.telefono}</p>
            </div>
        : null
        }
        { contactSelected.email ? 
            <div className='bg-black px-2 py-1 rounded-2 mt-4'>
                <p className='text-white fs-6 m-0'>email</p>
                <p className='text-primary fs-4 m-0'>{contactSelected.email}</p>
            </div>
        : null
        }
        <div className='bg-black px-2 py-1 rounded-2 mt-4'>
            <p className='text-white fs-6 m-0'>comentario</p>
            <p className='text-white fs-6 m-0' style={{minHeight:65}}>{contactSelected.comentario}</p>
        </div>

        <div className='bg-black px-2 py-1 rounded-2 mt-4 mb-5'>
            <input className='btn btn-black text-primary form-control text-start border-0 border-bottom border-secondary rounded-0' type="button" value='Enviar mensaje' />
            <input className='btn btn-black text-primary form-control text-start border-0 border-bottom border-secondary rounded-0' type="button" value='Compartir contacto' />
            <input className='btn btn-black text-primary form-control text-start rounded-0' type="button" value='Agregar a Favoritos' />
        </div>

        

      </div>
    </div>
  )
}

export default ContactSelected;
