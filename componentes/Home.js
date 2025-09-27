import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, RefreshControl } from 'react-native'; // Adicionado RefreshControl
import { getProdutos, deleteProduto } from '../Api'; // Assumindo que a API está em '../Api'
import { useFocusEffect } from '@react-navigation/native'; // Adicionado useFocusEffect

export default function Home({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadProdutos = async () => {
    setRefreshing(true);
    try {
      const data = await getProdutos();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      Alert.alert('Erro', 'Não foi possível carregar a lista de produtos.');
    } finally {
      setRefreshing(false);
    }
  };

  // Carrega produtos sempre que a tela Home recebe foco
  useFocusEffect(
    useCallback(() => {
      loadProdutos();
    }, [])
  );

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja deletar esse Produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          onPress: async () => {
            await deleteProduto(id);
            // Recarrega a lista após a exclusão
            loadProdutos();
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemColumn}>
        <Text style={styles.itemText}>{item.nome}</Text>
        <Text style={styles.itemText}>{item.marca}</Text>
        <Text style={styles.itemText}>{`R$ ${item.preco}`}</Text>
      </View>
      <View style={styles.botoesContainer}>
        <TouchableOpacity 
          style={styles.botaoAlterar}
          onPress={() => navigation.navigate('Alterar', { produtos: item })}
        >
          <Text style={styles.textoBotao}>Alterar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.botaoExcluir}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.textoBotao}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={produtos}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadProdutos}
          />
        }
      />
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // Assumindo um fundo branco ou claro
  },
  list: {
    paddingBottom: 70, // Espaço para o FAB
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  itemColumn: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    marginVertical: 2,
  },
  botoesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botaoAlterar: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  botaoExcluir: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#4CAF50', // Cor de exemplo
    borderRadius: 30,
    elevation: 8,
  },
  fabText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});
