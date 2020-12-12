import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'base-64';
import getClient from '../http/axios.instance';

export class AuthService {
    constructor() {
    }

    public static async Login(email: string, password: string): Promise<boolean> {
        const serverClient = await getClient();
        const data: any = { email: email, password: base64.encode(password) };

        try {
            await this.deleteAuthProps();
            const resp = await serverClient.post('/login', data);
            await this.setAuthProps(resp.data.id, resp.data.email, resp.data.token);
            return true;
        } catch (err) {
            throw err;
        }
    }

    public static async Logout() {
        await this.deleteAuthProps();
    }

    private static async deleteAuthProps() {
        await AsyncStorage.clear();
    }

    private static async setAuthProps(id: string, email: string, token: string) {
        const serverClient = await getClient();
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('id', id);

        token ?
            serverClient.defaults.headers.common['Authorization'] = token :
            delete serverClient.defaults.headers.common['Authorication'];
    }
}
