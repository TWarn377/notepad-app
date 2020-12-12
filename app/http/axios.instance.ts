import axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default async function getClient(): Promise<AxiosInstance> {
  const token = await AsyncStorage.getItem('token');
  if (token) {
      return axios.create({
          baseURL: 'http://localhost:3000',
          headers: { Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' }
      });
  } else {
      return axios.create({
          baseURL: 'http://localhost:3000',
          headers: {
            'Content-Type': 'application/json'
          }
      });
  }
}