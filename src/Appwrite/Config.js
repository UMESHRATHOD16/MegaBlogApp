
import conf from '../Conf/Conf';
import { Client, ID, TablesDB, Storage, Query } from 'appwrite';

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    normalizePost(post) {
        if (!post) return null;

        return {
            ...post,
            title: post.Title,
            content: post.Content,
            featuredImage: post.FeaturedImage,
            status: post.Status,
        };
    }

    async createPost({ title, content, featuredImage, status }) {
        try {
            const post = await this.databases.createRow({
                databaseId: conf.appWriteDBId,
                tableId: conf.appWriteCollectionId,
                rowId: ID.unique(),
                data: {
                    Title: title,
                    Content: content,
                    FeaturedImage: featuredImage,
                    Status: status,
                },
            });

            return this.normalizePost(post);
        } catch (error) {
            console.error('createPost error:', error);
            return false;
        }
    }

    async updatePost(rowId, { title, content, featuredImage, status }) {
        try {
            const data = {
                Title: title,
                Content: content,
                Status: status,
            };

            if (featuredImage !== undefined) {
                data.FeaturedImage = featuredImage;
            }

            const post = await this.databases.updateRow({
                databaseId: conf.appWriteDBId,
                tableId: conf.appWriteCollectionId,
                rowId,
                data,
            });

            return this.normalizePost(post);
        } catch (error) {
            console.error('updatePost error:', error);
            return false;
        }
    }

    async deletePost(rowId) {
        try {
            await this.databases.deleteRow({
                databaseId: conf.appWriteDBId,
                tableId: conf.appWriteCollectionId,
                rowId,
            });

            return true;
        } catch (error) {
            console.error('deletePost error:', error);
            return false;
        }
    }

    async getPost(rowId) {
        try {
            const post = await this.databases.getRow({
                databaseId: conf.appWriteDBId,
                tableId: conf.appWriteCollectionId,
                rowId,
            });

            return this.normalizePost(post);
        } catch (error) {
            console.error('getPost error:', error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal('Status', 'active')]) {
        try {
            const response = await this.databases.listRows({
                databaseId: conf.appWriteDBId,
                tableId: conf.appWriteCollectionId,
                queries,
            });

            return {
                ...response,
                rows: (response.rows || []).map((post) =>
                    this.normalizePost(post)
                ),
            };
        } catch (error) {
            console.error('getPosts error:', error);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile({
                bucketId: conf.appWriteBucketId,
                fileId: ID.unique(),
                file,
            });
        } catch (error) {
            console.error('uploadFile error:', error);
            return false;
        }
    }

    async deleteFile(fileId) {
        if (!fileId) return false;

        try {
            await this.bucket.deleteFile({
                bucketId: conf.appWriteBucketId,
                fileId,
            });

            return true;
        } catch (error) {
            console.error('deleteFile error:', error);
            return false;
        }
    }

        getFilePreview(fileId) {
            if (!fileId) return null;

            return this.bucket.getFileView({
                bucketId: conf.appWriteBucketId,
                fileId,
            });
        }
}

const service = new Service();
export default service;
