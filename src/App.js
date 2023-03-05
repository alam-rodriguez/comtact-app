// COMPONENTES
import PrimerComponente from './components/PrimerComponente';

// BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css';

// CONTEXT
import AppContextProvider from './context/AppContext';


function App() {

  

  return (
    <AppContextProvider>
      <PrimerComponente />
    </AppContextProvider>
  );
}

export default App;
