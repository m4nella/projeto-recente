// DetalhesSensorTemperatura.jsx

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DetalhesSensorTemperatura = ({ route }) => {
  const { sensorId } = route.params;
  const [sensorDetails, setSensorDetails] = useState(null);

  useEffect(() => {
    // Lógica para obter os detalhes do sensor de temperatura pelo ID
    fetch(`http://169.254.226.142:8000/api/sensores/temperatura/${sensorId}`)
      .then(response => response.json())
      .then(data => setSensorDetails(data))
      .catch(error => console.error('Erro ao buscar detalhes do sensor:', error));
  }, [sensorId]);

  if (!sensorDetails) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Tipo: {sensorDetails.tipo}</Text>
      <Text>Localização: {sensorDetails.localizacao}</Text>
      <Text>Valor da Temperatura: {sensorDetails.valor} °C</Text>
      <Text>Timestamp: {sensorDetails.timestamp}</Text>
      {/* Outras informações do sensor de temperatura */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default DetalhesSensorTemperatura;
