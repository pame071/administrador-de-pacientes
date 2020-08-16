import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Form = (props) => {

    //crear citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [errorVacio, actualizarError] = useState({
        mascota: false,
        propietario: false,
        fecha: false,
        hora: false,
        sintomas: false
    });

    const actualizarState = e =>{
        //genrear el spead opereitor para que mante los valore
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        });
    }

    //extraer los valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    //enviar Formulario
    const submitCita = e =>{
        e.preventDefault();

        //validar
        if(mascota.trim() === "" ){
            actualizarError({
                mascota: true
            });
        }else if(propietario.trim() === ""){
            actualizarError({
                propietario: true
            });
        }else if(fecha.trim() === ""){
            actualizarError({
                fecha: true
            });
        }else if(hora.trim() === ""){
            actualizarError({
                hora: true
            });
        }else if(sintomas.trim() === ""){
            actualizarError({
                sintomas: true
            });

            return;
        }

        //Asignar un ID
        cita.id = uuidv4();

        //Crear la cita
        props.crearcita(cita);

        //Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });
    }

    return ( 
        <div className="card">
            <div className="card-content">
                <p className="title">
                    Crear Cita
                </p>
                <form
                    onSubmit={submitCita}
                >
                    <div className="field">
                        <label className="label">Nombre Mascota</label>
                        <div className="control has-icons-left has-icons-right">
                            <input 
                                className={ errorVacio.mascota ? "input is-danger" : "input"} 
                                type="text" 
                                name="mascota"
                                placeholder="Nombre"
                                onChange={actualizarState}
                                value={mascota}
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                            <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                            </span>
                        </div>
                        { errorVacio.mascota ? <p className="help is-danger">El campo no debe quedar vacio</p> : null }
                        
                    </div>
                    <div className="field">
                        <label className="label">Nombre Dueño</label>
                        <div className="control has-icons-left has-icons-right">
                            <input 
                                className={ errorVacio.propietario ? "input is-danger" : "input"} 
                                type="text" 
                                name="propietario"
                                placeholder="Nombre"
                                onChange={actualizarState}
                                value={propietario}
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                            <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                            </span>
                        </div>
                        { errorVacio.propietario ? <p className="help is-danger">El campo no debe quedar vacio</p> : null }
                    </div>
                    <div className="field">
                        <label className="label">Fecha</label>
                        <div className="control has-icons-left has-icons-right">
                            <input 
                                className={ errorVacio.fecha ? "input is-danger" : "input"} 
                                type="date" 
                                name="fecha"
                                onChange={actualizarState}
                                value={fecha}
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                            <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                            </span>
                        </div>
                        { errorVacio.fecha ? <p className="help is-danger">El campo no debe quedar vacio</p> : null }
                    </div>
                    <div className="field">
                        <label className="label">Hora</label>
                        <div className="control has-icons-left has-icons-right">
                            <input 
                                className={ errorVacio.hora ? "input is-danger" : "input"} 
                                type="time"
                                name="hora" 
                                onChange={actualizarState}
                                value={hora}
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                            <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                            </span>
                        </div>
                        { errorVacio.hora ? <p className="help is-danger">El campo no debe quedar vacio</p> : null }
                    </div>
                    <div className="field">
                        <label className="label">Sintomas</label>
                        <div className="control">
                            <textarea 
                                className={ errorVacio.sintomas ? "is-danger textarea" : "textarea"} 
                                name="sintomas" 
                                placeholder="Sintomas"
                                onChange={actualizarState}
                                value={sintomas}
                            ></textarea>
                        </div>
                        { errorVacio.sintomas ? <p className="help is-danger">El campo no debe quedar vacio</p> : null }
                    </div>
                    <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link">Agregar</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    );
}

Form.propTypes = {
    crearcita: PropTypes.func.isRequired
}
 
export default Form;