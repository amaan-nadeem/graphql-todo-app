const graphql = require('graphql');
import Todo from '../models/todoSchema';
import mongoose from 'mongoose';
import _ from 'lodash';
const { GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLList, GraphQLInt, GraphQLSchema, GraphQLID } = graphql;

const getError = (error: any): void => {
    return error
};

const TodoType = new GraphQLObjectType({
    name: 'Todo',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        isCompleted: { type: GraphQLBoolean },
        success: {type: GraphQLBoolean},
        message: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        todo: {
            type: TodoType,
            args: { id: { type: GraphQLID } },
            resolve(parent: any, args: any) {
                // code to get data from database
               
                    return Todo.findById(args.id);
               
            }
        },
        todos: {
            type: new GraphQLList(TodoType),
            resolve(parent: any, args: any) {
                // code to get data from database
                    return Todo.find({})
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
                let todo = new Todo({
                    title: args.title,
                    description: args.description,
                    isCompleted: args.isCompleted
                });
                return todo.save();
            }
        },
        deleteTodo: {
            type: TodoType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve(parent: any, args: any) {
                let deletedTodo = Todo.findByIdAndDelete(args.id);
                return deletedTodo;
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
                    return {
                        success: false,
                        message: "Invalid todo Id"
                    }
                }
                let reqBody: any = {
                    title: args.title,
                    isCompleted: args.isCompleted,
                    description: args.description
                }
                for (var propName in reqBody) { 
                    if (reqBody[propName] === null || reqBody[propName] === undefined) {
                      delete reqBody[propName];
                    }
                  }
                return await Todo.findByIdAndUpdate(args.id, reqBody, {
                    new: true
                })
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})