// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PedidoScreen from './screens/PedidoScreen';
import RelatorioScreen from './screens/RelatorioScreen';
import AdminScreen from './screens/AdminScreen';
import { PedidoProvider } from './context/PedidoContext';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PedidoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: 'Churrasquinho do Robert',
              headerRight: () => (
                <TouchableOpacity
                  style={styles.adminButton}
                  onPress={() => navigation.navigate('Admin')}
                >
                  <Text style={styles.adminButtonText}>Admin</Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name="Pedido" component={PedidoScreen} options={{ title: 'Seu Pedido' }} />
          <Stack.Screen name="Relatorio" component={RelatorioScreen} options={{ title: 'Relatório de Vendas' }} />
          <Stack.Screen name="Admin" component={AdminScreen} options={{ title: 'Administração' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PedidoProvider>
  );
}

const styles = StyleSheet.create({
  adminButton: {
    backgroundColor: '#FF4500', // Cor do botão
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10, // Espaçamento à direita
  },
  adminButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
