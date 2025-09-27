import React, { useState, TextInput, Button, Alert } from 'react';
import { View } from 'react-native'; // Adicionado View
import { updateProdutos } from './Api'; // Modificado para './Api' se 'Api' for o nome do arquivo

export default function Alterar({ route, navigation }) {
  const { produtos } = route.params;

  const [nome, setNome] = useState(produtos.nome);
  const [marca, setMarca] = useState(produtos.marca);
  const [preco, setPreco] = useState(produtos.preco);

  const handleUpdate = () => {
    const updatedData = {
      nome,
      marca,
      preco,
    };

    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja alterar este Produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Alterar',
          onPress: () => updateProdutos(produtos.id, updatedData, navigation),
        },
      ],
    );
  };

  return (
    <View>
      <TextInput
        placeholder="Produto"
        onChangeText={setNome}
        value={nome}
      />
      <TextInput
        placeholder="Marca"
        onChangeText={setMarca}
        value={marca}
      />
      <TextInput
        placeholder="Preço"
        onChangeText={setPreco}
        value={preco}
      />
      <Button title="Alterar" onPress={handleUpdate} />
    </View>
  );
}
