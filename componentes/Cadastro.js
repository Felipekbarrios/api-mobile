import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { createEstoque } from "./Api";

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [preco, setPreco] = useState("");

  const handleSubmit = async () => {
    if (!nome || !marca || !preco) {
      Alert.alert("Atenção", "Preencha todos os campos antes de cadastrar.");
      return;
    }

    const newProduto = { nome, marca, preco };

    const addedProduto = await createEstoque(newProduto);
    if (addedProduto) {
      Alert.alert("Sucesso!", "Cadastro realizado com sucesso!", [
        { text: "OK", onPress: () => navigation.navigate("Home") },
      ]);
    } else {
      Alert.alert("Atenção", "Erro ao cadastrar produto.");
      return;
    }

    setNome("");
    setMarca("");
    setPreco("");
  };

  return (
    <View>
      <TextInput placeholder="Produto" value={nome} onChangeText={setNome} />
      <TextInput placeholder="Marca" value={marca} onChangeText={setMarca} />
      <TextInput placeholder="Preco" value={preco} onChangeText={setPreco} />

      <Button title="Cadastrar" onPress={handleSubmit} />
    </View>
  );
}