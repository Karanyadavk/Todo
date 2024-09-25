import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { toast, ToastContainer } from "react-toastify";
import { Loading } from "./Loading";

export const Dialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handler = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${BACKEND_URL}/add`, {
                name,
                description
            });

            toast.success("Message sent successfully!");
        } catch (error) {
            console.error("Error Submitting the Form: ", error);
            toast.error("Error submitting the form. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const openDialog = () => {
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <button 
                onClick={openDialog} // Open dialog on button click
                className="rounded-full bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" 
                type="button"
            >
                Add Todo
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-60"
                    onClick={closeDialog} // Close dialog on backdrop click
                >
                    <div
                        className="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside dialog
                    >
                        <div className="p-4 mx-auto max-w-xl bg-white font-[sans-serif]">
                            <h1 className="text-3xl text-gray-800 font-extrabold text-center">Add Todo</h1>
                            <form className="mt-8 space-y-4" onSubmit={handler}>
                                <input type='text' placeholder='Todo' onChange={(e) => { setName(e.target.value) }}
                                    className="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-transparent text-sm outline-blue-500" />
                                <textarea placeholder='Description' rows={6} onChange={(e) => { setDescription(e.target.value) }}
                                    className="w-full rounded-md px-4 text-gray-800 bg-gray-100 focus:bg-transparent text-sm pt-3 outline-blue-500"></textarea>
                            </form>
                            <div className="flex justify-end">
                                <button 
                                    onClick={closeDialog} // Close dialog on button click
                                    className="rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handler} // You can add your confirm logic here
                                    className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                                    type="button"
                                >
                                    {loading ? <Loading /> : "Confirm"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            )}
        </div>
    );
};
