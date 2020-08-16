import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Cita from './components/Cita';


function App() {

  //Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

  //Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //Use Effect para realizar ciertas operaciones cunado el state cambia
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    
    if(citasIniciales){
      localStorage.setItem('citas',JSON.stringify(citas))
    }else{
      localStorage.setItem('citas',JSON.stringify([]));
    }
    
  }, [citas])

  //Funcion que toma las citas actuales y agrega las nuevas
  const CrearCitas = cita => {
    guardarCitas([
      ...citas, 
      cita
    ]);
    
  }

  //Funcion de eliminar cita
  const EliminarCita = id => {
    const eliminar = citas.filter(cita => cita.id !== id);
    guardarCitas(eliminar);
  }

  //Mensaje condicionado
  const mensaje = citas.length === 0 ? 'No hay citas' : 'Administra tus citas' ;


  return (
    <>
      <h1 className="title is-1 color-white">Administrador de Pacientes</h1>
      <div className="container">
        <div className="columns">
            <div className="column is-half">
              <Form 
                crearcita={CrearCitas}
              />
            </div>
            <div className="column">
              <div className="card">
                <div className="card-content">
                    <p className="title">
                      {mensaje}
                    </p>
                    { citas.map(cita => (
                      <Cita
                        key={cita.id}
                        cita={cita}
                        EliminarCita={EliminarCita}
                      />
                    ))}
                </div>
              </div>
            </div>
        </div>
      </div>   
    </>


  );
}

export default App;
