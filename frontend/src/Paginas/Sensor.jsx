
        // import React, { useEffect, useState } from 'react';
        // import axios from 'axios';
        // import estilos from './Sensor.module.css';

        // export function Sensor() {
        //     const [sensores, setSensores] = useState([]);
        //     const [loading, setLoading] = useState(true);
        //     const [error, setError] = useState(null);

        //     useEffect(() => {
        //         async function fetchSensores() {
        //             try {
        //                 const token = localStorage.getItem('access_token');
        //                 const response = await axios.get('http://127.0.0.1:8000/api/sensores/', {
        //                     headers: {
        //                         'Authorization': `Bearer ${token}`
        //                     }
        //                 });
        //                 setSensores(response.data);
        //                 setLoading(false);
        //             } catch (err) {
        //                 setError(err);
        //                 setLoading(false);
        //             }
        //         }

        //         fetchSensores();
        //     }, []);

        //     const handleDeleteClick = async (sensorId) => {
        //         try {
        //             const token = localStorage.getItem('access_token');
        //             await axios.delete(`http://127.0.0.1:8000/api/sensores/${sensorId}/`, {
        //                 headers: {
        //                     'Authorization': `Bearer ${token}`
        //                 }
        //             });
        //             setSensores(sensores.filter(sensor => sensor.id !== sensorId));
        //         } catch (err) {
        //             setError(err);
        //         }
        //     };

        //     const handleUpdateClick = (sensorId) => {
        //         // Lógica para lidar com a atualização do sensor
        //         console.log(`Atualizar dados do sensor com ID: ${sensorId}`);
        //         // Aqui você pode redirecionar para uma página de atualização ou abrir um modal para editar os dados do sensor
        //     };

        //     if (loading) {
        //         return <div>Carregando...</div>;
        //     }

        //     if (error) {
        //         return <div>Erro ao carregar os dados: {error.message}</div>;
        //     }

        //     return (
        //         <div className={estilos.container}>
        //             <h1>Lista de Sensores</h1>
        //             <table className={estilos.table}>
        //                 <thead>
        //                     <tr>
        //                         <th>ID</th>
        //                         <th>Tipo</th>
        //                         <th>Localização</th>
        //                         <th>Responsável</th>
        //                         <th>Longitude</th>
        //                         <th>Latitude</th>
        //                         <th>Alterar Dados</th>
        //                         <th>Deletar</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     {sensores.map(sensor => (
        //                         <tr key={sensor.id}>
        //                             <td>{sensor.id}</td>
        //                             <td>{sensor.tipo}</td>
        //                             <td>{sensor.localizacao}</td>
        //                             <td>{sensor.responsavel}</td>
        //                             <td>{sensor.longitude}</td>
        //                             <td>{sensor.latitude}</td>
        //                             <td>
        //                                 <button
        //                                     className={`${estilos.button} ${estilos.alterar}`}
        //                                     onClick={() => handleUpdateClick(sensor.id)}
        //                                 >
        //                                     Alterar
        //                                 </button>
        //                             </td>
        //                             <td>
        //                                 <button
        //                                     className={`${estilos.button} ${estilos.deletar}`}
        //                                     onClick={() => handleDeleteClick(sensor.id)}
        //                                 >
        //                                     Deletar
        //                                 </button>
        //                             </td>
        //                         </tr>
        //                     ))}
        //                 </tbody>
        //             </table>
        //         </div>
        //     );
        // }

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import estilos from './Sensor.module.css';
import { Link } from "react-router-dom";

export function Sensor() {
    const [sensores, setSensores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingSensorId, setEditingSensorId] = useState(null); // Estado para controlar qual sensor está sendo editado
    const [editedData, setEditedData] = useState({}); // Estado para armazenar os dados editados

    useEffect(() => {
        async function fetchSensores() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/sensores/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setSensores(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        }

        fetchSensores();
    }, []);

    const handleDeleteClick = async (sensorId) => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.delete(`http://127.0.0.1:8000/api/sensores/${sensorId}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSensores(sensores.filter(sensor => sensor.id !== sensorId));
        } catch (err) {
            setError(err);
        }
    };

    const handleUpdateClick = (sensorId) => {
        setEditingSensorId(sensorId); // Define o ID do sensor que está sendo editado
        // Você pode adicionar mais lógica aqui, como carregar os dados do sensor para o formulário de edição
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('access_token');
            await axios.put(`http://127.0.0.1:8000/api/sensores/${editingSensorId}/`, editedData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setEditingSensorId(null); // Limpa o ID do sensor em edição
            setEditedData({}); // Limpa os dados editados
        } catch (err) {
            setError(err);
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro ao carregar os dados: {error.message}</div>;
    }

    return (
        <div className={estilos.container}>
            <h1>Lista de Sensores</h1>
            <table className={estilos.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tipo</th>
                        <th>Localização</th>
                        <th>Responsável</th>
                        <th>Longitude</th>
                        <th>Latitude</th>
                        <th>Alterar Dados</th>
                        <th>Deletar</th>
                    </tr>
                </thead>
                <tbody>
                    {sensores.map(sensor => (
                        <tr key={sensor.id}>
                            <td>{sensor.id}</td>
                            <td>{sensor.tipo}</td>
                            <td>{sensor.localizacao}</td>
                            <td>{sensor.responsavel}</td>
                            <td>{sensor.longitude}</td>
                            <td>{sensor.latitude}</td>
                            <td>
                                {editingSensorId === sensor.id ? (
                                    <form onSubmit={handleSubmit}>
                                        <input
                                            type="text"
                                            name="tipo"
                                            value={editedData.tipo || sensor.tipo}
                                            onChange={handleInputChange}
                                        />
                                        {/* Adicione mais campos de entrada para outros dados do sensor */}
                                        <button type="submit">Salvar</button>
                                    </form>
                                ) : (
                                    <Link
                                    className={`${estilos.button} ${estilos.alterar}`}
                                    to={`/sensores/${sensor.id}/editar`}
                                >
                                    Alterar
                                </Link>
                                )}
                            </td>
                            <td>
                                <button
                                    className={`${estilos.button} ${estilos.deletar}`}
                                    onClick={() => handleDeleteClick(sensor.id)}
                                >
                                    Deletar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
