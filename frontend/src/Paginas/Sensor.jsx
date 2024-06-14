
        import React, { useEffect, useState } from 'react';
        import axios from 'axios';
        import estilos from './Sensor.module.css';

        export function Sensor() {
            const [sensores, setSensores] = useState([]);
            const [loading, setLoading] = useState(true);
            const [error, setError] = useState(null);

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
                // Lógica para lidar com a atualização do sensor
                console.log(`Atualizar dados do sensor com ID: ${sensorId}`);
                // Aqui você pode redirecionar para uma página de atualização ou abrir um modal para editar os dados do sensor
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
                                        <button
                                            className={`${estilos.button} ${estilos.alterar}`}
                                            onClick={() => handleUpdateClick(sensor.id)}
                                        >
                                            Alterar
                                        </button>
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