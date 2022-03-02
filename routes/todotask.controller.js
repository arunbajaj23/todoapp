var express = require("express");
var router = express.Router();
const schemas = require("../joiModelValidation/schemas");
const middleware = require("../joiModelValidation/middleware");
const db = require("../models");

/* middleware is used to validate the req data with joi schema */

/* post request for create to do task . */
router.post(
  "/create",
  middleware.requireSchemaValidation(schemas.createToDoTaskPOST),
  async function (req, res, next) {
    try {
      const todoData = {
        content: req.body.content,
        UserId: req.decoded.id
      };
      
      db.ToDoTask.create(todoData)
        .then((newData) =>
          res.send({
            response: 1,
            sys_message:
              "Task Created Successfully",
            data: newData,
          })
        )
        .catch((error) => {
          res.send({ response: 0, sys_message: error.message });
        });
    } catch (e) {
      res.send({ response: 0, sys_message: e.message });
    }
  }
),


/* post request for update to do task . */
  router.post(
    "/update",
    middleware.requireSchemaValidation(schemas.updateToDoTaskPOST),
    async function (req, res, next) {
      try {
        var todoData = await db.ToDoTask.findOne({
          where: {
            id: req.body.todoid,
            UserId: req.decoded.id
     
          },
        });
        if (todoData != null) {
            
          todoData["content"] = req.body.content;
              await todoData.save();
              res.send({
                response: 1,
                sys_message: "Task Updated Successfully"
              });
            
         
        } else {
          res.send({ response: 0, sys_message: "No Data Found" });
        }
      } catch (e) {
        console.log(e);
        res.send({ response: 0, sys_message: e.message });
      }
    }
  ),
  
  
/* post request for complete to do task . */
  router.post(
    "/complete",
    middleware.requireSchemaValidation(schemas.completeToDoTaskPOST),
    async function (req, res, next) {
      try {
        var todoData = await db.ToDoTask.findOne({
          where: {
            id: req.body.todoid,
            UserId: req.decoded.id
     
          },
        });
        if (todoData != null) {
            
              todoData["status"] = 'C';
              await todoData.save();
              res.send({
                response: 1,
                sys_message: "Task Completed Successfully"
              });
            
         
        } else {
          res.send({ response: 0, sys_message: "No Data Found" });
        }
      } catch (e) {
        console.log(e);
        res.send({ response: 0, sys_message: e.message });
      }
    }
  ),
 

/* post request for get to do task list based on status . */
  router.post(
    "/getlist",
    middleware.requireSchemaValidation(schemas.getToDoTaskListGET),
    async function (req, res, next) {
      try {
        db.ToDoTask.findAll({where:{status: req.body.status,UserId: req.decoded.id
        }})
          .then((data) =>
            res.send({
              response: 1,
              sys_message:
                "Success",
              data,
            })
          )
          .catch((error) => {
            res.send({ response: 0, sys_message: error.message });
          });
      } catch (e) {
        res.send({ response: 0, sys_message: e.message });
      }
    }
  ),
  
  (module.exports = router);
