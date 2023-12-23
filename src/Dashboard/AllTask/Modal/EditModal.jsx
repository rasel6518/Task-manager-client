import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const EditModal = ({ isOpen, closeModal, selectedTask }) => {
    const axiosPublic = useAxiosPublic()


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('clicked Edit ');

        const title = e.target.title.value
        const note = e.target.note.value
        const status = e.target.status.value

        const taskInfo = { title, note, status };
        console.log(taskInfo);
        axiosPublic.put(`/tasks/${selectedTask._id}`, taskInfo)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    // position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            })

        closeModal();
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <form onSubmit={handleSubmit}>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium text-center leading-6 text-gray-900"
                                    >
                                        Task Edit
                                    </Dialog.Title>
                                    <input
                                        className="w-full px-3 py-2 outline-none "
                                        type="text"
                                        name="title"
                                        id="taskInput"
                                        defaultValue={selectedTask?.title}
                                        placeholder="Title"

                                    />
                                    <br />

                                    <textarea
                                        id="notesTextarea"
                                        name="note"
                                        rows={4}
                                        className="w-full px-3 py-2 my-5 outline-none"
                                        defaultValue={selectedTask?.note}
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

                                    {/* <div className="mt-4">
                                        <label htmlFor="userPhone" className="block text-sm font-medium text-gray-700">
                                            Phone Number:
                                        </label>
                                        <input
                                            type="text"
                                            id="userPhone"
                                            name="userPhone"
                                            value={adoptionRequest.userPhone}
                                            onChange={handleInputChange}
                                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <label htmlFor="userAddress" className="block text-sm font-medium text-gray-700">
                                            Address:
                                        </label>
                                        <textarea
                                            id="userAddress"
                                            name="userAddress"
                                            value={adoptionRequest.userAddress}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                        ></textarea>
                                    </div> */}

                                    <div className="mt-8">
                                        <button
                                            type="submit"
                                            className="text-white  hover:bg-[#6ec0af] bg-[#52ab98] font-bold py-2 px-4 rounded"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                                {/* Card data form */}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
};

export default EditModal;