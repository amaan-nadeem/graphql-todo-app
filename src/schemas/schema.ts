const graphql = require('graphql');
import Todo from '../models/todoSchema';
import mongoose from 'mongoose';
import _ from 'lodash';
import { errorName } from './errors';
const Joi = require('@hapi/joi');
const { GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLList, GraphQLInt, GraphQLSchema, GraphQLID } = graphql;

// error handling through hapi/joi 
const postApiParamsSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    isCompleted: Joi.boolean()
});

// error handling through hapi/joi 
const putApiParamsSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    isCompleted: Joi.boolean()
});

const TodoType = new GraphQLObjectType({
    name: 'Todo',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        isCompleted: { type: GraphQLBoolean },
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        todo: {
            type: TodoType,
            args: { id: { type: GraphQLID } },
            async resolve(parent: any, args: any) {
                // code to get data from database
                const isValidId = mongoose.Types.ObjectId.isValid(args.id);
                if (!isValidId) {
                    throw new Error(errorName.INVALID_ID);
                }
                try {
                    console.log("hello Biro");
                    const todo = await Todo.findById(args.id);
                    return todo;
                } catch (error) {
                    throw new Error(errorName.INTERNAL_SERVER_ERROR);
                }
            }
        },
        todos: {
            type: new GraphQLList(TodoType),
            async  resolve(parent: any, args: any) {
                try {
                    //code to get data from database
                    const todos = await Todo.find({});
                    return todos;
                } catch (error) {
                    throw new Error(errorName.INTERNAL_SERVER_ERROR);
                }
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTodo: {
            type: TodoType,
            args: {
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                isCompleted: { type: GraphQLBoolean }
            },
            resolve(parent: any, args: any) {
                const { error } = postApiParamsSchema.validate({
                    title: args.title,
                    description: args.description,
                    isCompleted: args.isCompleted
                });
                if (error) {
                    const errName = error.details[0].context.label.toUpperCase() + "_ERROR";
                    for (let i in errorName) {
                        if (errorName[i] === errName) {
                            throw new Error(errorName[i]);
                        }
                    }
                }
                try {
                    let todo = new Todo({
                        title: args.title,
                        description: args.description,
                        isCompleted: args.isCompleted
                    });
                    return todo.save();
                } catch (error) {
                    throw new Error(errorName.INTERNAL_SERVER_ERROR);
                }

            }
        },
        deleteTodo: {
            type: TodoType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve(parent: any, args: any) {
                const isValidId = mongoose.Types.ObjectId.isValid(args.id);
                if (!isValidId) {
                    throw new Error(errorName.INVALID_ID);
                }
                try {
                    let deletedTodo = Todo.findByIdAndDelete(args.id);
                    return deletedTodo;

                } catch (error) {
                    throw new Error(errorName.INTERNAL_SERVER_ERROR);
                }
            }
        },
        updateTodo: {
            type: TodoType,
            args: {
                id: { type: GraphQLID },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                isCompleted: { type: GraphQLBoolean }
            },
            async resolve(parent: any, args: any) {
                let isValidId = mongoose.Types.ObjectId.isValid(args.id);
                if (!isValidId) {
                    throw new Error(errorName.INVALID_ID);
                }

                let reqBody: any = {
                    title: args.title,
                    isCompleted: args.isCompleted,
                    description: args.description
                }
                const {error} = putApiParamsSchema.validate({
                   ...reqBody
                });
                if (error) {
                    const errName = error.details[0].context.label.toUpperCase() + "_ERROR";
                    for (let i in errorName) {
                        if (errorName[i] === errName) {
                            throw new Error(errorName[i]);
                        }
                    }
                };
                for (var propName in reqBody) {
                    if (reqBody[propName] === null || reqBody[propName] === undefined) {
                        delete reqBody[propName];
                    }
                }
                if (Object.keys(reqBody).length < 1) {
                    throw new Error(errorName.INVALID_BODY);
                }
                try {
                    return await Todo.findByIdAndUpdate(args.id, reqBody, {
                        new: true
                    })
                } catch (error) {
                    throw new Error(errorName.INTERNAL_SERVER_ERROR);
                }
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})