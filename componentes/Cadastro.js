import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { createProdutos } from './Api'; // Modificado para './Api' se 'Api' for o nome do arquivo

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [preco, setPreco] = useState('');

  const handleSubmit = async () => {
    if (!nome || !marca || !preco) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de cadastrar.');
      return;
    }

    const newProduto = { nome, marca, preco };
    const addedProduto = await createProdutos(newProduto);

    if (addedProduto) {
      Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Home') },
      ]);

      // Limpa os campos do formulário
      setNome('');
      setMarca('');
      setPreco('');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Produto"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        placeholder="Marca"
        value={marca}
        onChangeText={setMarca}
      />
      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric" // Adicionado para Preço
      />
      <Button title="Cadastrar" onPress={handleSubmit} />
    </View>
  );
}
