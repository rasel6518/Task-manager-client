import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import EditModal from "../Modal/EditModal";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const Completed = ({ reload }) => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [loading, setLoading] = useState(true);
    let [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false);
    };
    const openEditModal = (task) => {
        setSelectedTask(task);
        setIsOpen(true);
    };

    const completedTasks = data.filter((task) => task.status.toLowerCase() === 'completed');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosPublic.get(`/tasks/${user?.email}`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [reload, axiosPublic, user]);

    const handleDelete = async (taskId) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                await axiosPublic.delete(`/tasks/${taskId}`);
                const remainingTasks = completedTasks.filter((task) => task._id !== taskId);
                setData(remainingTasks);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl bg-gray-200">Completed</h1>
            {loading && <p>Loading...</p>}
            {!loading && completedTasks.length === 0 && <p>No completed tasks found.</p>}
            {!loading &&
                completedTasks.map((task) => (
                    <div key={task._id} className="">
                        <h1 className="border text-xl ">{task.title}</h1>
                        <div className="">{task.note} </div>
                        <div className="text-right px-10 py-3 ">
                            <button onClick={() => handleDelete(task._id)}>
                                <AiFillDelete className="mr-5"></AiFillDelete>
                            </button>
                            <button onClick={() => openEditModal(task)}>
                                <AiOutlineEdit></AiOutlineEdit>
                            </button>
                        </div>
                    </div>
                ))}

            <EditModal closeModal={closeModal} isOpen={isOpen} selectedTask={selectedTask}></EditModal>
        </div>
    );
};

export default Completed;
