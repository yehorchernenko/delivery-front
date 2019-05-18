import React from 'react';
import './App.css';
import StartPageComponent from "./components/start-page/StartPageComponent";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function App() {
    return (
    <StartPageComponent/>
  );
}

export default App;
