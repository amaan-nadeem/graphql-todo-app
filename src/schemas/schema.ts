const graphql = require('graphql');
import Todo from '../models/todoSchema';
const {GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLList, GraphQLInt, GraphQLSchema, GraphQLID} = graphql;


const TodoType = new GraphQLObjectType({
    name: 'Todo',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        isCompleted: {type: GraphQLBoolean}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        todo: {
            type: TodoType,
            args: {id: {type: GraphQLID}},
            resolve(parent:any, args:any){
                // code to get data from database
               return  Todo.findById(args.id);

            }
        },
        todos: {
            type: new GraphQLList(TodoType),
            resolve(parent:any, args:any){
                // code to get data from database
               return  Todo.find({})

            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{        
        addTodo: {
             type: TodoType,
             args: {
                 title: {type: GraphQLString},
                 description: {type: GraphQLString},
                 isCompleted: {type: GraphQLBoolean}
             },
             resolve(parent: any, args: any){
                 let todo = new Todo({
                     title: args.title,
                     description: args.description,
                     isCompleted: args.isCompleted
                 });
                return  todo.save();
             }
        },        
    }
})

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})