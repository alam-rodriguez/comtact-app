import React, { useEffect, useState, useContext } from 'react';

import { crearUsuario, iniciarSesion, autentificacionGoggle } from '../firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { AppContext } from '../context/AppContext';

// Alerts
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrarUsuario = () => {

	const { currentUser, setCurrentUser, view, setView } = useContext(AppContext);

	useEffect( () => {

		const getUser = () => {
			const auth = getAuth();
			onAuthStateChanged(auth, (user) => {
				if(user) {
					setCurrentUser(user.email);
					setView(1);
				}
				else setCurrentUser('nigun usuario')
			});
		}

		getUser();
	}, [] );

	

	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);

	const handleEmailChange = (e) => setEmail(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);

	const handleClickRegistrar = async (e) => {
		e.preventDefault();
		// try {
		// 	const newUser = await crearUsuario(email, password);
		// 	setCurrentUser( newUser );
		// 	toast.success(`Te has registrado con ${newUser} exitosamente`, {
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
		// } catch (error) {
		// 	console.log(error.code)
		// }
		const newUser = await crearUsuario(email, password);
		if( newUser == 'auth/admin-restricted-operation') {
			toast.warn('Hubo un error, intentelo de nuevo', {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}else if(newUser =='auth/internal-error'){
			toast.warn('Hubo un error, revise su correo y contraseña', {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}else if ( newUser == 'auth/missing-email'){
			toast.warn('Debe de ingresar un email', {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}else if( newUser == 'auth/invalid-email'){
			toast.warn('Este correo no es valido', {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}else {
			setCurrentUser( newUser );
			toast.success(`Te has registrado con ${newUser} exitosamente`, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
			setView(1);
		}
		
	}
	const handleClickIniciarSesion = async (e) => {
		e.preventDefault();
		const user = await iniciarSesion(email, password );
		if( user == 'auth/missing-email'){
			toast.warn('Ingrese un Email', {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}else if( user == 'auth/invalid-email'){
			toast.warn('Ingrese un Email Valido', {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}else if(user =='auth/internal-error'){
			toast.warn('Introdusca una contraseña', {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}else if( user == 'auth/weak-password'){
			toast.warn('Introdusca una contraseña valida', {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}else if( user == 'auth/wrong-password'){
			toast.warn('Contraseña Equivocada', {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}else {
			setCurrentUser( user );
			setView( 1 );
			toast.success(`Te has registrado con ${user} exitosamente`, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
		// setCurrentUser( await iniciarSesion(email, password ) );
		// setView(1);
	}
	const handleClickGoogle = async (e) => {
		e.preventDefault();
		const user = await autentificacionGoggle()
		setCurrentUser( user );
		toast.success(`Has ingresado a ${user} exitosamente`, {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
		});
		setView(1);
	}

  return (
    <div className='d-flex flex-column justify-content-center' style={{height:'100vh'}}>
      <h2 className='text-center fs-2 fw-bold mb-5'>Contact App</h2>
      <form className='col-12 col-md-6 mx-auto'>
      	<div className="form-floating mb-3">
        	<input type="email" className="form-control" id="floatingInput1" placeholder="name@example.com" onChange={handleEmailChange} required />
        	<label htmlFor="floatingInput1">Correo Electronico</label>
        </div>
			<div className="form-floating mb-5">
        	<input type="password" className="form-control" id="floatingInput2" placeholder="name@example.com" onChange={handlePasswordChange} minLength={8} />
        	<label htmlFor="floatingInput2">Contraseña</label>
        </div>
				<button className='btn btn-primary form-control fs-4 mb-3' type='submit' onClick={handleClickRegistrar}>Registrar Usuario</button>
				<button className='btn btn-primary form-control fs-4 mb-3' onClick={handleClickIniciarSesion}>Iniciar Sesion</button>
				<button className='btn btn-primary form-control fs-4' onClick={handleClickGoogle} >Google</button>
      </form>
    </div>
  )
}

export default RegistrarUsuario;
