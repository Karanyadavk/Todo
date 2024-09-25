import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import TaskModel from "./model/Tasks";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post("/add", async(req, res) => {
    try {
        const name = req.body.name;
        const description = req.body.description;

        const info = await TaskModel.create({
            "name": name,
            "description": description
        })
        console.log(info)
        res.status(200).json({
            message: "success",
            info
        })
    } catch (error) {
        res.status(404).json({
            message: error
        })
        console.error(error)
    }
})

app.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id; // Get ID from URL parameters
        const info = await TaskModel.findByIdAndDelete(id);
        console.log(info);
        
        if (!info) {
            return res.status(404).json({
                message: "Task not found."
            });
        }

        res.status(204).json({
            message: "Successfully Deleted.",
            info
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error deleting task."
        });
    }
});

app.get("/all", async(req, res) => {
    try {
        const info = await TaskModel.find();
        res.status(200).json({
            info
        })
    } catch (error) {
        console.error(error);
        res.status(404).json({
            message: "Failed to get the Tasks."
        })
    }
})


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb://localhost:27017/mongodb2`, {
      });
      console.log(`MongoDB Connected`);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
}
connectDB();
app.listen(port, () => {
    console.log("Server is running on the Port :", port);
})