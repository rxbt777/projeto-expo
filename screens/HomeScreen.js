// screens/HomeScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  FlatList, 
  ScrollView, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';

const produtos = [
  { id: '1', nome: 'Carne', preco: 10 },
  { id: '2', nome: 'Frango', preco: 8 },
  { id: '3', nome: 'Linguiça', preco: 9 },
  { id: '4', nome: 'Queijo', preco: 7 },
  { id: '5', nome: 'Arroz', preco: 5 },
  { id: '6', nome: 'Feijão', preco: 4 },
  { id: '7', nome: 'Vinagrete', preco: 3 },
  { id: '8', nome: 'Salada', preco: 6 },
  { id: '9', nome: 'Batata Frita', preco: 8 },
  { id: '10', nome: 'Refrigerante', preco: 5 },
  { id: '11', nome: 'Suco Natural', preco: 7 },
  { id: '12', nome: 'Pão de Alho', preco: 5 },
];

const HomeScreen = ({ navigation }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  const adicionarAoCarrinho = (produto) => {
    const existingItem = carrinho.find(item => item.id === produto.id);
    if (existingItem) {
      existingItem.quantidade += 1;
      setCarrinho([...carrinho]);
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
  };

  const removerDoCarrinho = (produto) => {
    const existingItem = carrinho.find(item => item.id === produto.id);
    if (existingItem) {
      if (existingItem.quantidade > 1) {
        existingItem.quantidade -= 1;
        setCarrinho([...carrinho]);
      } else {
        setCarrinho(carrinho.filter(item => item.id !== produto.id));
      }
    }
  };

  const irParaCheckout = () => {
    if (validarCampos()) {
      navigation.navigate('Pedido', { pedido: carrinho, nome, telefone });
    }
  };

  const validarCampos = () => {
    return nome.trim() && telefone.trim() && carrinho.length > 0;
  };

  const camposPreenchidos = validarCampos();

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Escolha seu Produto</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={styles.input}
              placeholder="Digite seu telefone"
              value={telefone}
              onChangeText={setTelefone}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.nome}</Text>
              <Text style={styles.itemPrice}>R$ {item.preco.toFixed(2)}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => removerDoCarrinho(item)} style={styles.quantityButton}>
                  <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{carrinho.find(i => i.id === item.id)?.quantidade || 0}</Text>
                <TouchableOpacity onPress={() => adicionarAoCarrinho(item)} style={styles.quantityButton}>
                  <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false} // Remove a barra de rolagem
        />

        <View style={styles.footer}>
          <Text style={styles.carrinhoInfo}>Itens no carrinho: {carrinho.length}</Text>
          <TouchableOpacity 
            onPress={irParaCheckout}
            disabled={!camposPreenchidos}
            style={[
              styles.checkoutButton,
              { backgroundColor: camposPreenchidos ? '#ff9800' : '#AAA' },
            ]}
          >
            <Text style={styles.checkoutButtonText}>Ir para o Checkout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3f4f6',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: '#ff9800',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 18,
    color: '#333',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  carrinhoInfo: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  checkoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
