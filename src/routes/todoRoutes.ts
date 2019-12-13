// import mongoose from "mongoose";
// import Todo from "../models/todoSchema";
// import TodoType from '../schemas/todoSchema';
// const Joi = require("@hapi/joi");




// @routes POST
// @desc adding todo
// @access public
// const ApiParamsSchema = Joi.object({
//   title: Joi.string().required(),
//   description: Joi.string().required(),
//   isCompleted: Joi.boolean()
// });
// routes.post("/create-todo", async (req: Request, res: Response) => {
//   try {
//     const { isCompleted, title, description } = req.body;
//     const { error } = ApiParamsSchema.validate({
//       title,
//       description,
//       isCompleted
//     });

//     if (error) {
//       return res.status(400).send({
//         success: false,
//         message: error.details[0].message
//       });
//     }
//     const savingTodo = await new Todo({
//       title,
//       description,
//       isCompleted: isCompleted ? true : false
//     });

//     await savingTodo.save();
//     return res.status(200).send({
//       success: true,
//       todo: savingTodo
//     });
//   } catch (error) {
//    return res.status(500).json({
//       success: false,
//       message: "Internal server error"
//     });
//   }
// });
// // @route GET
// // @desc Fetching todos
// // @access public

// routes.get("/get-todos", async (req: Request, res: Response) => {
//   try {
//     const todos = await Todo.find({});
//     if (todos.length < 1) {
//       return res.status(200).json({
//         success: true,
//         message: "You do not have any task yet"
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       todos
//     });
//   } catch (error) {
//     console.log("Error: ", error);
//    return res.status(500).json({
//       success: false,
//       message: "Internal server error"
//     });
//   }
// });

// routes.put("/update-todo/:id", async (req: Request, res: Response) => {
//   const { title, description, isCompleted } = req.body;
//   const _id = req.params.id;
//   const body = Object.keys(req.body).forEach(key => {
//     if (req.body[key] === undefined) {
//       delete req.body[key];
//     }
//   });
//   console.log(body);
//   const isValidId = mongoose.Types.ObjectId.isValid(_id);
//   if (!isValidId) {
//     return res.status(400).json({
//       success: true,
//       message: "Todo id is invalid"
//     });
//   }
//   const { error } = ApiParamsSchema.validate({
//     title,
//     description,
//     isCompleted
//   });

//   if (error) {
//     return res.status(400).json({
//       success: false,
//       message: error.details[0].message
//     });
//   }
//   if (Object.keys(req.body).length < 1) {
//     return res.status(400).json({
//       success: false,
//       message: "Nothing to given to be Updated"
//     });
//   }
//   try {
//     // updating task
//     const updateTask = await Todo.findByIdAndUpdate({ _id }, req.body, {
//       new: true
//     });
//    return res.status(200).json({
//       success: true,
//       message: "Task has been updated",
//       updateTask
//     });
//   } catch (error) {
//    return res.status(500).json({
//       success: false,
//       message: "Internal Server Error"
//     });
//   }
// });

// routes.delete("/delete-todo/:id", async (req: Request, res: Response) => {
//     const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
//     if(!isValidId){
//         return res.status(400).json({
//             success: false,
//             message: "Invalid Todo id"
//         }) 
//     }
//     try {
//         const deleteTodo = await Todo.findByIdAndDelete({
//             _id: req.params.id
//         });
//         if(!deleteTodo){
//             return res.status(200).json({
//                 success: false,
//                 message: "No Todo found against this id"
//             })
//         }
//         return res.status(200).json({
//             success: true,
//             message: "Todo deleted",
//             deletedTodo: deleteTodo
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error"
//         })
//     }
// });

// export default routes;
