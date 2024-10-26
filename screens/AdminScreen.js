import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Platform 
} from 'react-native';
import { PedidoContext } from '../context/PedidoContext';

const AdminScreen = () => {
  const [senha, setSenha] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const { pedidos } = useContext(PedidoContext);

  const senhaCorreta = '1234'; // Defina uma senha segura

  const autenticar = () => {
    if (senha === senhaCorreta) {
      setAutenticado(true);
    } else {
      setSenha(''); // Limpa a senha
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.pedidoItem}>
      <Text style={styles.pedidoTitle}>Cliente: {item.nome}</Text>
      <Text style={styles.pedidoText}>Telefone: {item.telefone}</Text>
      <Text style={styles.pedidoText}>Total: R$ {item.total.toFixed(2)}</Text>
      <Text style={styles.pedidoSubTitle}>Itens:</Text>
      {item.items.map((produto, index) => (
        <Text key={index} style={styles.itemText}>
          - {produto.nome} (R$ {produto.preco.toFixed(2)})
        </Text>
      ))}
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        {!autenticado ? (
          <View style={styles.loginContainer}>
            <Text style={styles.title}>Acesso Administrativo</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />
            <TouchableOpacity style={styles.authButton} onPress={autenticar}>
              <Text style={styles.authButtonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={pedidos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            ListHeaderComponent={<Text style={styles.title}>Pedidos Realizados</Text>}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={true} // Mostra a barra de rolagem
          />
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3f4f6',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    width: '100%',
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  authButton: {
    backgroundColor: '#ff9800',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  authButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pedidoItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  pedidoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  pedidoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  pedidoSubTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#666',
    marginTop: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#777',
    paddingLeft: 10,
  },
  flatListContent: {
    paddingBottom: 20, // Adiciona espaço extra na parte inferior
  },
});

export default AdminScreen;
