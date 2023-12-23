import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Ongoing from './Ongoing/Ongoing';
import { useContext, useRef, useState } from 'react';

import Completed from './Completed/Completed';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import ToDo from './ToDo/ToDo';



const AllTask = () => {

    const axiosPublic = useAxiosPublic()
    const { user } = useContext(AuthContext)
    const [showForm, setShowForm] = useState(false);
    const [reload, setReload] = useState(false)
    const formRef = useRef(null);

    const handleAddNote = (e) => {
        e.preventDefault();

        console.log('clicked add note');

        const title = e.target.title.value
        const note = e.target.note.value
        const status = e.target.status.value


        const taskInfo = { title, note, status, email: user.email };
        axiosPublic.post('/tasks', taskInfo)
            .then(res => {
                if (res.data.insertedId) {
                    setReload(!reload)

                    toast.success('Note Successfully Created. Start Exploring!')
                    formRef.current.reset();
                }
            })








    };
    return (
        <div className='w-9/12 mx-auto'>
            <button
                onClick={() => setShowForm(!showForm)}
                className="my-5 mr-5 px-5 py-2 text-white rounded hover:bg-[#6ec0af] bg-[#52ab98]"
            >
                {showForm ? 'Hide Form' : 'Add Task'}
            </button>

            {showForm && (
                <div className="border border-black">
                    <form ref={formRef} onSubmit={handleAddNote}>
                        <input
                            className="w-full px-3 py-2 outline-none "
                            type="text"
                            name="title"
                            id="taskInput"
                            placeholder="Title"

                        />
                        <br />

                        <textarea
                            id="notesTextarea"
                            name="note"
                            rows={4}
                            className="w-full px-3 py-2 my-5 outline-none"

                            placeholder="Write your note"
                        ></textarea>
                        <br />

                        <label className="ml-5" htmlFor="statusSelect">Status:</label>
                        <br />

                        <select
                            id="statusSelect"
                            name="status"
                            className="ml-5"
                            defaultValue="ongoing"
                        >
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                            <option value="to-do">To-Do</option>
                        </select>
                        <br />
                        <div className="text-right">
                            <button
                                type="submit"
                                className="my-5 mr-5 px-5 py-2 text-white rounded hover:bg-[#6ec0af] bg-[#52ab98]"
                            >
                                Add Note
                            </button>
                        </div>
                    </form>
                </div>
            )}
            <div className="grid grid-cols-2 my-5 flex-wrap  justify-center gap-5">

                <div className="text-center border border-black">
                    <ToDo reload={reload}></ToDo>
                </div>

                <div className=" text-center border border-black">
                    <Ongoing reload={reload} ></Ongoing>
                </div>
                <div className=" text-center border border-black">
                    <Completed reload={reload}></Completed>

                </div>

            </div>


            <ToastContainer position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light">

            </ToastContainer>
        </div>
    );
};

export default AllTask;