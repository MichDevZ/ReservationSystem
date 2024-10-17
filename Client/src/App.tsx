import './App.css';
import NavBar from './components/Ui/NavBar';
import '@/index.css'
import Presentation from './components/Ui/Presentation';
import Cabins from './components/Ui/Cabins';
import Ubication from './components/Ui/Ubication';
import Footer from './components/Ui/Footer';





function App() {


    return (
      <>
      <NavBar />
      <Presentation />
      <Cabins /> 
      <Ubication />
      <Footer />
      </>
    );
}

export default App;