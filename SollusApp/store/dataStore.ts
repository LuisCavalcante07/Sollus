import { create } from 'zustand';
import axios from 'axios';

const API_URI = "http://192.168.1.14:5000/api/data";

interface Dados {
  id?: number;
  nitrogenio: number;
  fosforo: number;
  potassio: number;
  temperatura: number;
  condutividade: number;
  umidade: number;
  pH: number;
  ReadDate?: string;
}

interface DataState {
  ultimaLeitura: Dados | null;    
  dados: Dados[];
  dadosPorParametro: { [key: string]: { data: string; valor: number }[] };
  medias: { [key: string]: number }; 
  isLoading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  sendData: () => Promise<void>;
  fetchHistory: () => Promise<void>;
  deleteData: () => Promise<void>;
  fetchMedia: () => Promise<void>;
}

export const useDataStore = create<DataState>((set) => ({
  ultimaLeitura: null,
  dados: [],
  dadosPorParametro: {},
  medias: {},
  isLoading: false,
  error: null,

  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URI}/lastRead`);
      set({ ultimaLeitura: response.data.data, isLoading: false });
    } catch (error) {
      console.error("Erro ao buscar última leitura:", error);
      set({ error: "Erro ao buscar última leitura", isLoading: false });
    }
  },

  sendData: async () => {
    set({ isLoading: true, error: null });
    try {
      const resLast = await axios.get(`${API_URI}/lastRead`);
      const lastData = resLast.data.data;
      const nextId = lastData ? lastData.id + 1 : 1;

      const gerarAleatorio = () => ({
        nitrogenio: parseFloat((Math.random() * 10).toFixed(2)),
        fosforo: parseFloat((Math.random() * 50).toFixed(2)),
        potassio: parseFloat((Math.random() * 100).toFixed(2)),
        temperatura: parseFloat((Math.random() * 35 + 15).toFixed(2)),
        condutividade: parseFloat((Math.random() * 100).toFixed(2)),
        umidade: parseFloat((Math.random() * 100).toFixed(2)),
        pH: parseFloat((Math.random() * 2 + 5).toFixed(2)),
      });

      const novoDado: Dados = {
        id: nextId,
        ...gerarAleatorio(),
        ReadDate: new Date().toISOString(),
      };

      const response = await axios.post(`${API_URI}/random`, novoDado);
      console.log("Enviado:", novoDado);
      console.log("Resposta:", response.data);
      set({ ultimaLeitura: novoDado, isLoading: false });
    } catch (error: any) {
      console.error("Erro ao enviar dados:", error);
      set({ error: "Erro ao enviar dados", isLoading: false });
    }
  },

  fetchHistory: async () => {
  set({ isLoading: true, error: null });
  try {
    const response = await axios.get(`${API_URI}/history`);
    
    // Ordenar os dados
    const historicoOrdenado = response.data.data.sort((a: Dados, b: Dados) => b.id! - a.id!);
    
    // Organizar por parâmetro para os gráficos
    const dadosPorParametro: { [key: string]: { data: string; valor: number }[] } = {};
    
    historicoOrdenado.forEach((item: any) => {
      const parametros = [
        { key: 'nitrogenio', nome: 'Nitrogênio' },
        { key: 'fosforo', nome: 'Fósforo' },
        { key: 'potassio', nome: 'Potássio' },
        { key: 'temperatura', nome: 'Temperatura' },
        { key: 'condutividade', nome: 'Condutividade' },
        { key: 'umidade', nome: 'Umidade' },
        { key: 'pH', nome: 'pH' }
      ];

      parametros.forEach(({ key, nome }) => {
        if (!dadosPorParametro[nome]) dadosPorParametro[nome] = [];
        dadosPorParametro[nome].push({
          data: item.data, // Ajuste conforme o nome do campo de data
          valor: item[key],
        });
      });
    });

    // Atualiza tanto o histórico completo quanto os dados organizados por parâmetro
    set({ dados: historicoOrdenado, dadosPorParametro, isLoading: false });

  } catch (error) {
    console.error("Erro ao buscar histórico:", error);
    set({ error: "Erro ao buscar histórico", isLoading: false });
  }
  },

  deleteData: async () => {
    set({isLoading: true, error: null});
    try {
      const response = await axios.delete(`${API_URI}/delete`);
      console.log('Dados deletados com sucesso', response.data);
      const responseHistory = await axios.get(`${API_URI}/history`);
      set({ dados:responseHistory.data.data ,isLoading: false});
    } catch (error: any) {
      console.error('Erro ao deletar dados:', error);
      set({ error: 'Erro ao deletar dados', isLoading: false });
    }
  },

  fetchMedia: async () => {
    set({isLoading: true, error: null});
    try {
      const response = await axios.get(`${API_URI}/media`);
      console.log("Resposta da API (media):", response.data);
      const medias = response.data.data;

      const mediasArredondadas: { [key: string]: number } = {};
      for (const key in medias) {
        const valor = medias[key];
        if (typeof valor === "number"){
          mediasArredondadas[key] = Number(valor.toFixed(2));
        }
      }
      set({ medias: mediasArredondadas, isLoading: false });
    } catch (error) {
      console.error("Erro ao buscar médias:", error);
      set({ error: "Erro ao buscar médias", isLoading: false });
    }
  }

}));

