// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, Dimensions } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';

// const { width, height } = Dimensions.get('window');

// export default function App() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [selectedPointDistance, setSelectedPointDistance] = useState(null);
//   const [selectedPointName, setSelectedPointName] = useState(null);

//   const initialRegion = {
//     latitude: -22.9140639,
//     longitude: -47.068686,
//     latitudeDelta: 0.001,
//     longitudeDelta: 0.001,
//   };

//   const fixedPoints = [
//     { 
//       id: 1, 
//       name: "Escada de emergência - Bloco A",
//       latitude: -22.914099,  
//       longitude: -47.068040,
//     },
//     { 
//       id: 2, 
//       name: "Escada de emergência - Estacionamento",
//       latitude: -22.914228,  
//       longitude: -47.068679,
//     },
//     { 
//       id: 3,
//       name: "Banheiro Masculino", 
//       latitude: -22.914140, 
//       longitude: -47.06862,
//     },
//     { 
//       id: 4,
//       name: "Banheiro Feminino",
//       latitude: -22.914166,  
//       longitude: -47.068355,
//     },
//     { 
//       id: 5, 
//       name: "Sala MDI",
//       latitude: -22.914106,  
//       longitude: -47.068242,
//     },
//     { 
//       id: 6, 
//       name: "Coordenação Pedagógica",
//       latitude: -22.914154,  
//       longitude: -47.068331,
//     }
//   ];

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       const locationSubscription = await Location.watchPositionAsync(
//         {
//           accuracy: Location.Accuracy.BestForNavigation,
//           timeInterval: 1000,
//           distanceInterval: 1,
//         },
//         (newLocation) => {
//           setLocation(newLocation.coords);
//         }
//       );

//       return () => {
//         locationSubscription.remove();
//       };
//     })();
//   }, []);

//   const haversineDistance = (coords1, coords2) => {
//     const toRad = (value) => (value * Math.PI) / 180;

//     const R = 6371; 
//     const dLat = toRad(coords2.latitude - coords1.latitude);
//     const dLon = toRad(coords2.longitude - coords1.longitude);
//     const lat1 = toRad(coords1.latitude);
//     const lat2 = toRad(coords2.latitude);

//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c; 

//     return distance * 1000; 
//   };

//   const handleMarkerPress = (point) => {
//     if (location) {
//       const distance = haversineDistance(location, point);
//       setSelectedPointDistance(distance);
//       setSelectedPointName(point.name);
//     }
//   };

//   let text = 'Waiting...';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = `    Latitude: ${location.latitude}, 
//     Longitude: ${location.longitude}`;
//   }

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={initialRegion}
//       >
//         {fixedPoints.map(point => (
//           <Marker
//             key={point.id}
//             coordinate={{ latitude: point.latitude, longitude: point.longitude }}
//             pinColor="aqua"
//             onPress={() => handleMarkerPress(point)}
//           />
//         ))}
//         {location && (
//           <Marker
//             coordinate={{ latitude: location.latitude, longitude: location.longitude }}
//             pinColor="pink"
//           />
//         )}
//       </MapView>
//       <Text>{text}</Text>
//       {selectedPointDistance !== null && (
//         <Text>Distância até {selectedPointName}: {selectedPointDistance.toFixed(2)}m</Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   map: {
//     width: width - 40,
//     height: height / 2,
//     borderRadius: 10,
//   },
// });
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

export default function Mapa() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedPointDistance, setSelectedPointDistance] = useState(null);
  const [selectedPointName, setSelectedPointName] = useState(null);
  const [sensorData, setSensorData] = useState([]);

  const initialRegion = {
    latitude: -22.9140639,
    longitude: -47.068686,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (newLocation) => {
          setLocation(newLocation.coords);
        }
      );

      return () => {
        locationSubscription.remove();
      };
    })();
  }, []);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await axios.get('http://169.254.226.142:8000/api/sensores/');
        setSensorData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados dos sensores:', error);
      }
    };

    fetchSensorData();
  }, []);

  const haversineDistance = (coords1, coords2) => {
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371; // Radius of Earth in kilometers
    const dLat = toRad(coords2.latitude - coords1.latitude);
    const dLon = toRad(coords2.longitude - coords1.longitude);
    const lat1 = toRad(coords1.latitude);
    const lat2 = toRad(coords2.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance * 1000; // distance in meters
  };

  const handleMarkerPress = (point) => {
    if (location) {
      const distance = haversineDistance(location, point);
      setSelectedPointDistance(distance);
      setSelectedPointName(point.localizacao);
    }
  };

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
      >
        {sensorData.map(point => (
          <Marker
            key={point.id}
            coordinate={{ latitude: point.latitude, longitude: point.longitude }}
            pinColor="aqua"
            onPress={() => handleMarkerPress(point)}
          />
        ))}
        {location && (
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            pinColor="pink"
          />
        )}
      </MapView>
      <Text>{text}</Text>
      {selectedPointDistance !== null && (
        <Text>Distância até {selectedPointName}: {selectedPointDistance.toFixed(2)}m</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: width - 40,
    height: height / 2,
    borderRadius: 10,
  },
});
