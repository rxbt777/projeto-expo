// screens/RelatorioScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PedidoContext } from '../context/PedidoContext';

const RelatorioScreen = () => {
  const { pedidos } = useContext(PedidoContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório de Vendas</Text>
      {pedidos.length > 0 ? (
        pedidos.map((pedido, index) => (
          <View key={index} style={styles.pedido}>
            <Text style={styles.pedidoTitle}>Pedido {index + 1}:</Text>
            {pedido.items.map((item, i) => (
              <Text key={i} style={styles.item}>
                {item.nome} - R$ {item.preco}
              </Text>
            ))}
            <Text style={styles.total}>Total: R$ {pedido.total}</Text>
          </View>
        ))
      ) : (
        <Text>Nenhum pedido realizado ainda.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pedido: {
    marginBottom: 20,
  },
  pedidoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    fontSize: 16,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default RelatorioScreen;
