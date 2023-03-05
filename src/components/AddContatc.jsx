// Alerts
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Alertas
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

// ID
import { v4 as uuidv4 } from 'uuid';

// IMG
import imgPerfil from '../imgs/images.png';

// Firebase
import { agregarDocumento, subirImagen } from '../firebase/firebase';

import './AddContatc.css';;


const AddContatc = () => {

	useEffect(()=>{
		setIdUser(uuidv4());
	}, [])

  const {  currentUser, setCurrentUser, view, setView, } = useContext(AppContext);

  const handleClickCancelar = () => setView(1);

  const inicialState = {
	nombre: '',
    apellidos: '',
    empresa: '',
    telefono: '',
    email: '',
    comentario: '',
	img: '',
  }

	const [newContact, setNewContact] = useState(inicialState);
	
	const [idUser, setIdUser] = useState(null);
	const [imgFile, setImgFile] = useState(null);

	const handleChangeNombre = (e) => {
		setNewContact(state => ({...state, nombre: e.target.value}) )
	}
	const handleChangeApellidos = (e) => {
		setNewContact(state => ({...state, apellidos: e.target.value}) )
	}
	const handleChangeEmpresa = (e) => {
		setNewContact(state => ({...state, empresa: e.target.value}) )
	}
	const handleChangeTelefono = (e) => {
		setNewContact(state => ({...state, telefono: e.target.value}) )
	}
	const handlechangeEmail = (e) => {
		setNewContact(state => ({...state, email: e.target.value}) )
	}
	const handleChangeComentario = (e) => {
		setNewContact(state => ({...state, comentario: e.target.value}) )
	}

	const handleClickListo = async () => {
		
		// console.log(imgFile);
		const subirInfo = async () => {
			const addDocument = await agregarDocumento(`contactos-${currentUser}`, idUser, newContact);
			const addImg = await subirImagen(`contactos-${currentUser}/${idUser}`,imgFile);
			setView(1);
		}

		const promesa = subirInfo();
		toast.promise(
			promesa,
			{
			pending: 'Cargando contacto',
			success: 'Contacto guardado',
			error: 'Ha ocurrido un error, no se a podido guardar el contacto exitosamente'
			}
		)

		
		// if( addDocument == 'bien' && addImg == 'bien'){
		// 	toast.success(`Contacto guardado con exito`, {
		// 		position: "top-center",
		// 		autoClose: 5000,
		// 		hideProgressBar: false,
		// 		closeOnClick: true,
		// 		pauseOnHover: true,
		// 		draggable: true,
		// 		progress: undefined,
		// 		theme: "colored",
		// 	});
		// 	setView(1);
		// }
		
	}

	const handleChangeInputFile = (e) => {
		setNewContact(state => ({...state, img: `contactos-${currentUser}/${idUser}`}));
		setImgFile(e.target.files[0]);
		// setIdUser(e.target.files[0]);
		// console.log(idUser);
		// console.log(e.target.files[0]);
	}





  return (

    <div className='vh-100'>
       <header className='d-flex justify-content-between p-3'>
        <p className='text-primary fs-5 m-0 mt-1' onClick={handleClickCancelar}>Cancelar</p>
        <p className='text-white fs-4 m-0 fw-bold'>Nuevo contacto</p>
        <p className='text-primary fs-5 m-0 mt-1 fw-bold' onClick={handleClickListo}>Listo</p>
      </header>

			<section>
				<div className='d-flex flex-column justify-content-center w-100 mt-2' onClick={()=>{ document.querySelector('.input-file').click()}}>
					<img className='img-fluid rounded-circle mx-auto' src={imgPerfil} style={{height:130, width:130}} />
					<p className='text-primary text-center'>Agregar foto</p>
					<input type="file" className='input-file' hidden onChange={handleChangeInputFile} />
				</div>

				<form className=''>

					<div className='bg-black px-2 py-1 rounded-2 mt-4 mb-2'>
						<p className='text-primary m-0'>Nombre</p>
						<input className='btn btn-black text-white form-control text-start border-0 border-bottom border-secondary rounded-0' type="text" placeholder='Nombre' onChange={handleChangeNombre} />
					</div>

					<div className='bg-black px-2 py-1 rounded-2 mt-4 mb-2'>
						<p className='text-primary m-0'>Apellidos</p>
						<input className='btn btn-black text-white form-control text-start border-0 border-bottom border-secondary rounded-0' type="text" placeholder='Apellitos' onChange={handleChangeApellidos} />
					</div>

					<div className='bg-black px-2 py-1 rounded-2 mt-4 mb-2'>
						<p className='text-primary m-0'>empresa</p>
						<input className='btn btn-black text-white form-control text-start border-0 border-bottom border-secondary rounded-0' type="text" placeholder='Empresa' onChange={handleChangeEmpresa} />
					</div>

					<div className='bg-black px-2 py-1 rounded-2 mt-4 mb-2'>
						<p className='text-primary m-0'>telefono</p>
						<input className='btn btn-black text-white form-control text-start border-0 border-bottom border-secondary rounded-0' type="number" placeholder='Telefono' onChange={handleChangeTelefono} />
					</div>

					<div className='bg-black px-2 py-1 rounded-2 mt-4 mb-2'>
						<p className='text-primary m-0'>email</p>
						<input className='btn btn-black text-white form-control text-start border-0 border-bottom border-secondary rounded-0' type="email" placeholder='Correo electronico' onChange={handlechangeEmail} />
					</div>

					<div className='bg-black px-2 py-1 rounded-2 mt-4 mb-2'>
						<p className='text-primary m-0'>nota</p>
						<div className="form-floating mb-5">
							<textarea className="btn btn-black text-white form-control text-start border-0 border-bottom border-secondary rounded-0" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: 100}} onChange={handleChangeComentario}></textarea>
							<label htmlFor="floatingTextarea2">Comments</label>
						</div>
					</div>

				</form>

			</section>


    </div>
  )
}

export default AddContatc;
