import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";

interface Task {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
}

export const TaskCard = () => {
    const [data, setData] = useState<Task[]>([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/all`);
            const res = response.data.info;
            console.log('API Response:', res);
            setData(res);
            toast.success("Successfully got the tasks.");
        } catch (error) {
            toast.error("Request Failed");
            console.error(error);
        }
    };

    const deleteData = async (taskId: string) => {
        try {
            await axios.delete(`${BACKEND_URL}/delete/${taskId}`); // Pass taskId in the URL
            setData((prevData) => prevData.filter(task => task._id !== taskId)); // Update local state
            toast.success("Task deleted successfully.");
        } catch (error) {
            console.error(error);
            toast.error("Delete Request Failed");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {Array.isArray(data) && data.length > 0 ? (
                data.map((task) => (
                    <div key={task._id} className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
                        <div className="p-4">
                            <div className="flex justify-between items-center">
                                <h5 className="mb-2 text-slate-800 text-xl font-semibold">
                                    {task.name}
                                </h5>
                                <button 
                                    type="button" 
                                    onClick={() => deleteData(task._id)} // Call deleteData on button click
                                    className="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-2.5 mb-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div> 
                            <p className="text-slate-600 leading-normal font-light">
                                {task.description}
                            </p>
                        </div>
                        <div className="mx-3 border-t border-slate-200 pb-3 pt-2 px-1">
                            <span className="text-sm text-slate-600 font-medium">
                                Created: {new Date(task.createdAt).toLocaleString()}
                            </span>
                        </div>
                    </div>
                ))
            ) : (
                <p>No tasks available.</p>
            )}
            
        </>
    );
};
