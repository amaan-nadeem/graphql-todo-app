"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql = require('graphql');
const todoSchema_1 = __importDefault(require("../models/todoSchema"));
const mongoose_1 = __importDefault(require("mongoose"));
const { GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLList, GraphQLInt, GraphQLSchema, GraphQLID } = graphql;
const getError = (error) => {
    return error;
};
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
            resolve(parent, args) {
                // code to get data from database
                return todoSchema_1.default.findById(args.id);
            }
        },
        todos: {
            type: new GraphQLList(TodoType),
            resolve(parent, args) {
                // code to get data from database
                return todoSchema_1.default.find({});
            }
        }
    }
});
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
            resolve(parent, args) {
                let todo = new todoSchema_1.default({
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
            resolve(parent, args) {
                let deletedTodo = todoSchema_1.default.findByIdAndDelete(args.id);
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
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    let isValidId = mongoose_1.default.Types.ObjectId.isValid(args.id);
                    if (!isValidId) {
                        return {
                            success: false,
                            message: "Invalid todo Id"
                        };
                    }
                    let reqBody = {
                        title: args.title,
                        isCompleted: args.isCompleted,
                        description: args.description
                    };
                    for (var propName in reqBody) {
                        if (reqBody[propName] === null || reqBody[propName] === undefined) {
                            delete reqBody[propName];
                        }
                    }
                    return yield todoSchema_1.default.findByIdAndUpdate(args.id, reqBody, {
                        new: true
                    });
                });
            }
        }
    }
});
exports.default = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
