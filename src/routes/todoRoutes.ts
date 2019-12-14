import mongoose from "mongoose";
import Todo from "../models/todoSchema";
import express , {Application, Response, Request } from "express"
// import TodoType from '../schemas/todoSchema';
const Joi = require("@hapi/joi");
const routes = express.Router();
import schema from '../schemas/schema';
import graphqlHTTP from 'express-graphql';

// @routes POST
// @desc adding todo
// @access public

routes.post("/create-todo", async (req: Request, res: Response) => {
  try {
    
  } catch (error) {
    res.status(500).send({
      
    })
  }
    
});

// @route GET
// @desc Fetching todos
// @access public

routes.get("/get-todos", async (req: Request, res: Response) => {
 
});

// @route put
// @desc updating todo
// @access public

routes.put("/update-todo/:id", async (req: Request, res: Response) => {
  
  
});

// @route delete
// @desc deleting todo
// @access public

routes.delete("/delete-todo/:id", async (req: Request, res: Response) => {
    
  
});

export default routes;
