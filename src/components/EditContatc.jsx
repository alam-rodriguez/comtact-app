// Alerts
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

// ID
import { v4 as uuidv4 } from 'uuid';

// IMG
import imgPerfil from '../imgs/images.png';

import { actualizarDato, borrarDato, obtenerImagen, subirImagen, borrarImagen } from '../firebase/firebase'

const EditContatc = () => {

    useEffect( () => {
        const getInfo = async () => {
            try {
                setImg( await obtenerImagen(contactSelected.img) );
            } catch (error) {
                console.log('no hay img')
            }
        }
        getInfo();
        console.log(contactSelected);

    }, [] );

    const [img, setImg] = useState(null);

    const [newIMg, setNewIMg] = useState(null);

  const {  currentUser, setCurrentUser, view, setView, contactSelected, setContactSelected } = useContext(AppContext);

  const handleClickCancelar = () => setView(1);

//   const inicialState = {
//     apellidos: '',
//     empresa: '',
//     telefono: '',
//     email: '',
//     comentario: '',
//   }

// 	const [newContact, setNewContact] = useState(inicialState);

	const handleChangeNombre = (e) => {
		setContactSelected(state => ({...state, nombre: e.target.value}) )
	}
	const handleChangeApellidos = (e) => {
		setContactSelected(state => ({...state, apellidos: e.target.value}) )
	}
	const handleChangeEmpresa = (e) => {
		setContactSelected(state => ({...state, empresa: e.target.value}) )
	}
	const handleChangeTelefono = (e) => {
		setContactSelected(state => ({...state, telefono: e.target.value}) )
	}
	const handlechangeEmail = (e) => {
		setContactSelected(state => ({...state, email: e.target.value}) )
	}
	const handleChangeComentario = (e) => {
		setContactSelected(state => ({...state, comentario: e.target.value}) )
	}

	const handleClickListo = () => {
        console.log(contactSelected)
        const setInfo = async () => {
            await subirImagen(contactSelected.img, newIMg); 
            await actualizarDato(`contactos-${currentUser}`, contactSelected.id, contactSelected);
            setView(1);
            setContactSelected({});
        }
        toast.promise(
            setInfo,
            {
              pending: 'Actualizando contacto',
              success: 'Contacto actualizado',
              error: 'Ha ocurrido un error, no hemos podido actualizar el contacto'
            }
        )
		// console.log(newContact);
	}

    const handleClickDelete = async () => {
        const borrar = async () => {
            await borrarDato(`contactos-${currentUser}`, contactSelected.id);
            await borrarImagen(contactSelected.img);
            setContactSelected({});
            setView(1);
        }
        toast.promise(
            borrar,
            {
              pending: 'Borrando contacto',
              success: 'Contacto borrado',
              error: 'Ha ocurrido un error, no se ha podido borrar el contacto'
            }
        )
        
    }

    const handleChangeInputFile = async (e) =>{
        setNewIMg( e.target.files[0] );
        setContactSelected(state => ({...state, img: `contactos-${currentUser}/${contactSelected.id}`}))
        // setContactSelected(state => ({...state, img: e.target.files[0] }));
        // console.log(contactSelected)
        // await subirImagen(contactSelected.img, e.target.files[0]);
        // console.log(e.target.files[0]);
    }



  return (
    <div>
        <header className='d-flex justify-content-between p-3'>
            <p className='text-primary fs-5 m-0 mt-1' onClick={handleClickCancelar}>Cancelar</p>
            <p className='text-white fs-4 m-0 fw-bold'>Nuevo contacto</p>
            <p className='text-primary fs-5 m-0 mt-1 fw-bold' onClick={handleClickListo}>Listo</p>
        </header>

		<section>
			<div className='d-flex flex-column justify-content-center w-100 mt-2' onClick={()=>document.querySelector('.input-file').click()}>
				{ img ? 
                    <>
                        <img className='img-fluid rounded-circle mx-auto' src={img} style={{width: 130, height:130, objectFit:'cover', objectPosition:'center'}} />
                        <p className='text-primary text-center'>Cambiar imagen</p>
                    </>
                :   
                    <>
                        <img className='img-fluid rounded-circle mx-auto' src={imgPerfil} style={{height:130, width:130}} />   
                        <p className='text-primary text-center'>Agregar foto</p> 
                    </>
                }
                <input type="file" className='input-file' hidden onChange={handleChangeInputFile} />
			</div>

			<form className=''>

                <div className='bg-black px-2 py-1 rounded-2 mt-4 mb-2'>
                    <p className='text-primary m-0'>Nombre</p>
				    <input className='btn btn-black text-white form-control text-start border-0 border-bottom border-secondary rounded-0' type="text" placeholder='Nombre' onChange={handleChangeNombre} value={contactSelected.nombre} />
                </div>
                <div className='bg-black px-2 py-1 rounded-2 mt-4 mb-2'>
                    <p className='text-primary m-0'>Apellidos</p>
				    <input className='btn btn-black text-white form-control text-start border-0 border-bottom border-secondary rounded-0' type="text" placeholder='Apellitos' onChange={handleChangeApellidos} value={contactSelected.apellidos} />
                </div>
                <div className='bg-black px-2 py-1 rounded-2 mt-4 mb-2'>
                    <p className='text-primary m-0'>Empresa</p>
				    <input className='btn btn-black text-white form-control text-start border-0 border-bottom border-secondary rounded-0' type="text" placeholder='Empresa' onChange={handleChangeEmpresa} value={contactSelected.empresa} />
                </div>
                <div className='bg-black px-2 py-1 rounded-2 mt-4 mb-2'>
                    <p className='text-primary m-0'>telefono</p>
				    <input className='btn btn-black text-white form-control text-start border-0 border-bottom border-secondary rounded-0' type="number" placeholder='Telefono' onChange={handleChangeTelefono} value={contactSelected.telefono} />
                </div>
                <div className='bg-black px-2 py-1 rounded-2 mt-4 mb-2'>
                    <p className='text-primary m-0'>email</p>
				    <input className='btn btn-black text-white form-control text-start border-0 border-bottom border-secondary rounded-0' type="email" placeholder='Correo electronico' onChange={handlechangeEmail} value={contactSelected.email} />
                </div>
                <div className='bg-black px-2 py-1 rounded-2 mt-4 mb-2'>
                    <p className='text-primary m-0'>nota</p>
				    <div className="form-floating mb-5">
                        <textarea className="btn btn-black text-white form-control text-start" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: 50}} onChange={handleChangeComentario} value={contactSelected.comentario}></textarea>
                        <label htmlFor="floatingTextarea2">Comments</label>
                    </div>
                </div>

                <div className='bg-black px-2 py-1 rounded-2 mt-4'>
                    <input className='btn btn-black text-danger form-control text-start rounded-0' type="button" value='Eliminar contacto' onClick={handleClickDelete} />
                </div>

                {/* <div className='bg-black px-2 py-1 rounded-2 mt-4 mb-5'>
				    <input className='btn btn-black text-white form-control text-start border-0 border-bottom border-secondary rounded-0' type="text" placeholder='Nombre' onChange={handleChangeNombre} value={contactSelected.nombre} />
				    <input className='btn btn-black text-white form-control text-start border-0 border-bottom border-secondary rounded-0' type="text" placeholder='Apellitos' onChange={handleChangeApellidos} value={contactSelected.apellidos} />
				    <input className='btn btn-black text-white form-control text-start border-0 border-bottom border-secondary rounded-0' type="text" placeholder='Empresa' onChange={handleChangeEmpresa} value={contactSelected.empresa} />
				    <input className='btn btn-black text-white form-control text-start border-0 border-bottom border-secondary rounded-0' type="number" placeholder='Telefono' onChange={handleChangeTelefono} value={contactSelected.telefono} />
				    <input className='btn btn-black text-white form-control text-start border-0 border-bottom border-secondary rounded-0' type="email" placeholder='Correo electronico' onChange={handlechangeEmail} value={contactSelected.email} />
                    <div className="form-floating mb-5">
                        <textarea className="btn btn-black text-white form-control text-start border-0 border-bottom border-secondary rounded-0" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: 100}} onChange={handleChangeComentario} value={contactSelected.comentario}></textarea>
                        <label htmlFor="floatingTextarea2">Comments</label>
                    </div>

                    <input className='btn btn-black text-white form-control text-start border-0 border-bottom border-secondary rounded-0' type="button" value='Enviar mensaje' />

                </div> */}
                
				
			</form>
		</section>
    </div>
  )
}

export default EditContatc;
