import {Head, useForm} from '@inertiajs/react';
import {React, useEffect, useState} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import Modal from "@/Components/Modal.jsx";
import axios from "axios";
import {Inertia} from "@inertiajs/inertia";

export default function EntranceDetails({auth, id, house_id}) {
    const [entrance, setEntrance] = useState({});
    const [confirmingEntranceDeletion, setConfirmingEntranceDeletion] = useState(false);
    const [confirmingFloorDeletion, setConfirmingFloorDeletion] = useState(false);
    const [addingFloor, setAddingFloor] = useState(false);
    const [updatingFloor, setUpdatingFloor] = useState(false);

    const {
        data,
        setData,
        errors,
        post: store,
        put: update,
        delete: destroy,
        processing,
        reset,
    } = useForm({
        floor: '',
        total_apartments: '',
    });

    useEffect(() => {
        axios.get(`/api/houses/${house_id}/entrances/${id}`)
            .then(response => {
                setEntrance(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [id, house_id]);


    const confirmEntranceDeletion = () => {
        setConfirmingEntranceDeletion(true);
    }

    const confirmFloorDeletion = (event) => {
        event.preventDefault();
        setConfirmingFloorDeletion(true);
    }

    const handleUpdatingFloor = (event) => {
        event.preventDefault();
        axios.put(`/api/houses/${house_id}/entrances/${id}/floors/${data.floor}`, {
            total_apartments: data.total_apartments,
        })
            .then(() => {
                Inertia.visit(`/houses/${house_id}/entrances/${id}`); // Redirect to the homepage after deleting the house
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const handleDelete = (event) => {
        event.preventDefault();
        axios.delete(`/api/houses/${house_id}/entrances/${id}`)
            .then(() => {
                Inertia.visit(`/houses/${house_id}`); // Redirect to the homepage after deleting the house
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const handleDeleteFloor = (event) => {
        event.preventDefault();
        axios.delete(`/api/houses/${house_id}/entrances/${id}/floors/${data.floor}`)
            .then(() => {
                Inertia.visit(`/houses/${house_id}/entrances/${id}`);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const handleAddingFloor = (event) => {
        event.preventDefault();
        axios.post(`/api/houses/${house_id}/entrances/${id}/floors`, {
            entrance_id: id,
            total_apartments: data.total_apartments,
        })
            .then(() => {
                Inertia.visit(`/houses/${house_id}/entrances/${id}`); // Redirect to the homepage after deleting the house
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const closeModal = () => {
        setConfirmingFloorDeletion(false);
        setUpdatingFloor(false);
        setAddingFloor(false);

        reset();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Entrance info</h2>}
        >
            <Head title={`House`}/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="text-center my-4">
                        {entrance ? (
                            <>
                                <div className="mb-4">
                                    <h2 className="mb-4 font-semibold">Entrance {entrance.id}</h2>
                                </div>
                                {entrance.floors && entrance.floors.length ? (
                                        <table className="table-auto w-full">
                                            <thead>
                                            <tr>
                                                <th scope="col">Floor ID</th>
                                                <th scope="col">Number of apartments</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {entrance.floors.map(floor => (
                                                <tr key={floor.id}>
                                                    <td className="border px-4 py-2">
                                                        <p>{floor.id}</p>
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        <p>{floor.total_apartments}</p>
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <PrimaryButton onClick={(event) => {
                                                            setUpdatingFloor(true);
                                                            setData({
                                                                'floor': floor.id,
                                                                'total_apartments': floor.total_apartments
                                                            });
                                                        }}>Update info</PrimaryButton>
                                                        <DangerButton onClick={(event) => {
                                                            confirmFloorDeletion(event);
                                                            setData('floor', floor.id)
                                                        }} className='ml-3'>Delete floor</DangerButton>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    ) :
                                    <div>No floors</div>
                                }
                                <div className="mt-6 flex justify-center">
                                    <SecondaryButton className='mr-3' onClick={() => setAddingFloor(true)}>Add
                                        floor</SecondaryButton>
                                    <DangerButton onClick={confirmEntranceDeletion} className='ml-3'>Delete
                                        entrance</DangerButton>
                                </div>
                                <Modal show={updatingFloor} onClose={closeModal}>
                                    <form onSubmit={handleUpdatingFloor} className="p-6 flex flex-col items-center">
                                        <h2 className="text-lg font-medium text-gray-900 text-center">
                                            Update number of apartments
                                        </h2>
                                        <div className="mt-6 flex flex-col items-center">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 pb-3">
                                                <input type="number" value={data.total_apartments}
                                                       onChange={e => setData('total_apartments', e.target.value)}
                                                       className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
                                            </label>
                                        </div>
                                        <div className="mt-6 flex justify-center">
                                            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                                            <PrimaryButton className="ml-3">Update Floor</PrimaryButton>
                                        </div>
                                    </form>
                                </Modal>
                                <Modal show={addingFloor} onClose={closeModal}>
                                    <form onSubmit={handleAddingFloor} className="p-6">
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Add Floor
                                        </h2>
                                        <div className="mt-6 flex flex-col">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 pb-3">
                                                Number of apartments:
                                                <input type="number" value={data.total_apartments}
                                                       onChange={e => setData('total_apartments', e.target.value)}
                                                       className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                            </label>
                                        </div>
                                        <div className="mt-6 flex justify-end">
                                            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                                            <PrimaryButton className="ml-3">Add Floor</PrimaryButton>
                                        </div>
                                    </form>
                                </Modal>
                                <Modal show={confirmingEntranceDeletion} onClose={closeModal}>
                                    <form onSubmit={handleDelete} className="p-6">
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Are you sure you want to delete this entrance?
                                        </h2>

                                        <div className="mt-6 flex justify-end">
                                            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                                            <DangerButton className="ml-3" disabled={processing}>
                                                Delete Entrance
                                            </DangerButton>
                                        </div>
                                    </form>
                                </Modal>
                                <Modal show={confirmingFloorDeletion} onClose={closeModal}>
                                    <form onSubmit={handleDeleteFloor} className="p-6">
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Are you sure you want to delete this floor?
                                        </h2>

                                        <div className="mt-6 flex justify-end">
                                            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                                            <DangerButton className="ml-3" disabled={processing}>
                                                Delete Floor
                                            </DangerButton>
                                        </div>
                                    </form>
                                </Modal>
                            </>
                        ) : (
                            <div>Loading...</div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
