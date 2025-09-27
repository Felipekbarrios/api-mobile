import { Alert } from 'react-native';

const API_URL = 'https://suaapi.webapi.com/api/produtos'; // URL de exemplo

// GET
export const getProdutos = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      // Tenta ler a mensagem de erro do corpo da resposta, se disponível
      const errorText = await response.text();
      throw new Error(`Erro ao buscar os produtos: ${response.status} - ${errorText}`);
    }
    
    // Retorna os dados em formato JSON
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar produtos:', error.message);
    Alert.alert('Erro', 'Não foi possível buscar os produtos.');
    return []; // Retorna um array vazio em caso de falha
  }
};

// POST
export const createProdutos = async (produto) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produto),
    });

    if (response.status === 201) {
      // 201 Created
      // Retorna o produto adicionado ou uma confirmação
      return await response.json();
    } else {
      // Tenta ler a mensagem de erro
      const errorData = await response.json();
      throw new Error(errorData.message || `Erro ao cadastrar: Status ${response.status}`);
    }
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error.message);
    // Remove o Alert do catch, pois ele parece estar na função chamadora no código original
    // Alert.alert('Erro', 'Ocorreu um erro ao tentar cadastrar.');
    return null; 
  }
};

// DELETE
export const deleteProduto = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (response.status === 200 || response.status === 204) {
      // 200 OK ou 204 No Content
      Alert.alert('Sucesso!', `O produto com ID ${id} foi excluído com sucesso.`);
      return true;
    } else if (response.status === 404) {
       Alert.alert('Erro', `Produto com ID ${id} não encontrado.`);
       return false;
    } else {
      const errorText = await response.text();
      throw new Error(`Falha ao excluir o produto: Status ${response.status} - ${errorText}`);
    }
  } catch (error) {
    console.error('Erro ao excluir produto:', error.message);
    Alert.alert('Erro', 'Não foi possível excluir o produto.');
    // A função original tinha uma lógica de erro mais complexa, mas simplifiquei para o essencial.
    return false;
  }
};

// PUT/PATCH
export const updateProdutos = async (id, updatedData, navigation) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT', // ou 'PATCH' dependendo da API
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (response.status === 200) {
      Alert.alert('Sucesso!', 'Produto atualizado com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Home') }
      ]);
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || `Erro ao atualizar: Status ${response.status}`);
    }
  } catch (error) {
    console.error('Erro ao atualizar produto:', error.message);
    Alert.alert('Erro', 'Ocorreu um erro ao tentar atualizar o produto.');
    return null;
  }
};
