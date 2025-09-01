const router = require("express").Router();
const ListModel = require("../Schemas/list");
const UserModel = require("../Schemas/user");

//add task
router.post("/addTask", async (req, res) => { 
  try {
    const { title, body, id } = req.body;

    // ✅ Fix: use findById correctly
    const existingUser = await UserModel.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const list = new ListModel({ title, body, user: existingUser._id });
    await list.save();

    existingUser.list.push(list._id);
    await existingUser.save();

    res.status(201).json({ list, message: "Task added successfully", success: true }); 
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
});


//get all tasks
router.get("/getTasks/:id", async(req, res)=>{
    try{
        const list = await ListModel.find({user: req.params.id}).sort({createdAt: -1});
        if(list.length !== 0)
            res.status(200).json({list: list});
        else
            res.status(404).json({message: "No tasks found", success: false});

    }
    catch(err){
        res.status(500).json({message: err.message, success: false});
    }
});

//update task
router.put("/updateTask/:id", async (req, res) => {
    try{
        const { title, body, email}= req.body;
        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            const list = await ListModel.findByIdAndUpdate(req.params.id, {title, body});
            list.save();

            res.status(200).json({list, message: "task updated successfully", success: true});

        }
    }
    catch(err){
        res.status(500).json({message: err.message, success: false});
    }
});

//delete task
router.delete("/deleteTask/:id", async(req,res)=>{
    try{
        const { id } = req.body;
        const existingUser = await UserModel.findByIdAndUpdate(id, { $pull: { list: req.params.id } });
        if(existingUser){
            await ListModel.findByIdAndDelete(req.params.id);
            existingUser.list = existingUser.list.filter((item) => item._id.toString() !== req.params.id);
            await existingUser.save();
            res.status(200).json({message: "task deleted successfully", success: true});
        }

    }
    catch(err){
        res.status(500).json({message: err.message, success: false});
    }
});



module.exports = router;