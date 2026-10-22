import conf from "../Conf/Conf";
import { Client, Account, ID } from "appwrite";

export class AuthService  {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appwriteProjectId);
        
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        const userAccount = await this.account.create({
            userId: ID.unique(),
            email,
            password,
            name,
        })

        if (userAccount) {
            return this.login(email, password)
        }

        return userAccount
    }

    async login(email, password) {
        return await this.account.createEmailPasswordSession({ email, password })
    }

    async logout() {
        await this.account.deleteSessions()
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log(error)
            return null
        }
    }
    
    async forgotPassword(email) {
    return await this.account.createRecovery({
        email,
        url: `${window.location.origin}/reset-password`
        });
    }

    async resetPassword({ userId, secret, password }) {
        return await this.account.updateRecovery({
            userId,
            secret,
            password,
            passwordAgain: password
        });
    }
}

const authService = new AuthService();
export default authService
