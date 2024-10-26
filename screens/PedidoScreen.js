// screens/PedidoScreen.js
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PedidoContext } from '../context/PedidoContext';

const PedidoScreen = ({ route, navigation }) => {
  const { pedido, nome, telefone } = route.params;
  const { adicionarPedido } = useContext(PedidoContext);

  const total = pedido.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

  const confirmarPedido = () => {
    const novoPedido = { items: pedido, total, nome, telefone };
    adicionarPedido(novoPedido);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo do Pedido</Text>
      <Text style={styles.details}>Nome: {nome}</Text>
      <Text style={styles.details}>Telefone: {telefone}</Text>

      {pedido.map((item, index) => (
        <Text key={index} style={styles.item}>
          {item.nome} - {item.quantidade} unidade(s) - R$ {(item.preco * item.quantidade).toFixed(2)}
        </Text>
      ))}

      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

      <TouchableOpacity style={styles.confirmButton} onPress={confirmarPedido}>
        <Text style={styles.confirmButtonText}>Confirmar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  details: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  item: {
    fontSize: 18,
    color: '#333',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  confirmButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#FFA500',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PedidoScreen;
