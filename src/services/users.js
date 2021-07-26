import MongoLib from '../lib/mongo'

class UsersService {

    constructor(){
        this.collection = 'users';
        this.mongoDB = new MongoLib;
    }

    async getUsers(){
        const query = ''
        const users = await this.mongoDB.getAll(this.collection, query);
        return users || []
    }

    async getUser({query, projection}){
        const user = await this.mongoDB.get(this.collection, query, projection);
        return user || null
    }

    async createUser({user}){
        const createdUserId = await this.mongoDB.create(this.collection, user);
        return createdUserId
    }

    async updateUser({userId, user}){
        const updatedUserId = await this.mongoDB.update(this.collection, userId, user);
        return updatedUserId
    }

    async deleteUser({userId}){
        const deletedUserId = await this.mongoDB.delete(this.collection, userId);
        return deletedUserId
    }

}

export default UsersService;