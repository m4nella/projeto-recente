// SensorEdit.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';''
import estilos from './SensorEdit.module.css'

export function SensorEdit({ match, history }) {
    const [sensor, setSensor] = useState({});
    const [editedData, setEditedData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSensor() {
            try {
                const sensorId = match.params.id;
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`http://127.0.0.1:8000/api/sensores/${sensorId}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setSensor(response.data);
                setEditedData(response.data);
            } catch (err) {
                setError(err);
            }
        }

        fetchSensor();
    }, [match.params.id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('access_token');
            const sensorId = match.params.id;
            await axios.put(`http://127.0.0.1:8000/api/sensores/${sensorId}/`, editedData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            history.push('/sensores'); // Redireciona para a lista de sensores após a edição
        } catch (err) {
            setError(err);
        }
    };

    if (error) {
        return <div>Erro ao carregar os dados: {error.message}</div>;
    }

    return (
        <div>
                <Link
                    className={`${estilos.button} ${estilos.alterar}`}
                    to={`/sensores/${sensor.id}/editar`}
                >
                    Alterar
                </Link>
        </div>
    );
}
