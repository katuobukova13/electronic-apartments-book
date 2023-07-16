import {React, useEffect, useState} from 'react';
import axios from 'axios';
import DangerButton from "@/Components/DangerButton.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Head, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Modal from "@/Components/Modal.jsx";
import {Inertia} from '@inertiajs/inertia';
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import {InertiaLink} from "@inertiajs/inertia-react";

function HouseDetails({auth, id}) {
    const [house, setHouse] = useState(null);
    const [confirmingHouseDeletion, setConfirmingHouseDeletion] = useState(false);
    const [updatingHouse, setUpdatingHouse] = useState(false);
    const [addingEntrance, setAddingEntrance] = useState(false);

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
        state: '',
        entrances: '',
        total_floors: '',
        total_apartments: '',
        entranceFloors: '',
        entranceApartments: '',
    });

    const confirmHouseDeletion = () => {
        setConfirmingHouseDeletion(true);
    };

    useEffect(() => {
        axios.get(`/api/houses/${id}`)
            .then(response => {
                setHouse(response.data);
                setData('state', response.data.state);
                setData('entrances', response.data.entrances.map(entrance => ({
                    id: entrance.id,
                    floors: entrance.total_floors
                })));
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [id]);

    const HandleUpdateState = (event) => {
        event.preventDefault();
        axios.put(`/api/houses/${id}`, {
            state: data.state,
        })
            .then(response => {
                setHouse(response.data);
                setUpdatingHouse(false);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const handleDelete = (event) => {
        event.preventDefault();
        axios.delete(`/api/houses/${id}`)
            .then(() => {
                Inertia.visit('/houses'); // Redirect to the homepage after deleting the house
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const handleAddEntrance = (event) => {
        event.preventDefault();
        axios.post(`/api/houses/${id}/entrance`, {
            id: id,
            total_floors: data.entranceFloors,
            total_apartments: data.entranceApartments,
        })
            .then(response => {
                Inertia.visit(`/houses/` + id); // Refresh the page after adding the entrance
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const closeModal = () => {
        setConfirmingHouseDeletion(false);
        setUpdatingHouse(false);
        setAddingEntrance(false);

        reset();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">House info</h2>}
        >
            <Head title={`House`}/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="text-center my-4">
                            {house ? (
                                <>
                                    <div className="mb-4">
                                        <h2 className="mb-4 font-semibold">House {house.id}</h2>
                                        <p className="mb-4 font-medium">State: {house.state}</p>
                                    </div>
                                    {house.entrances.length ? (
                                            <table className="table-auto w-full">
                                                <thead>
                                                <tr>
                                                    <th scope="col">Entrance ID</th>
                                                    <th scope="col">Floor IDS</th>
                                                    <th scope="col">Number of apartments</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {house.entrances && house.entrances.map(entrance => (
                                                    <tr key={house.id}>
                                                        <td className="border px-4 py-2">{entrance.id}</td>
                                                        <td className="border px-4 py-2">
                                                            {entrance.floors.map(floor => (
                                                                <p>{floor.id}</p>
                                                            ))}
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            {entrance.floors.map(floor => (
                                                                <p>{floor.total_apartments}</p>
                                                            ))}
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <InertiaLink
                                                                href={`/houses/${house.id}/entrances/${entrance.id}`}>
                                                                <PrimaryButton>Update info</PrimaryButton>
                                                            </InertiaLink>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        ) :
                                        <div>No entrances</div>
                                    }
                                    <div className="mt-6 flex justify-center">
                                        <SecondaryButton className='mr-3' onClick={() => setAddingEntrance(true)}>Add
                                            entrance</SecondaryButton>
                                        <PrimaryButton onClick={() => setUpdatingHouse(true)}>Update house
                                            state</PrimaryButton>
                                        <DangerButton onClick={confirmHouseDeletion} className='ml-3'>Delete
                                            house</DangerButton>
                                    </div>
                                    <Modal show={updatingHouse} onClose={closeModal}>
                                        <form onSubmit={HandleUpdateState} className="p-6">
                                            <h2 className="text-lg font-medium text-gray-900">
                                                Update House State
                                            </h2>
                                            <div className="mt-6 flex flex-col">
                                                <label className="block mb-2 text-sm font-medium text-gray-900 pb-3">
                                                    State:
                                                    <select value={data.state}
                                                            className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            onChange={e => setData('state', e.target.value)}>
                                                        <option value="design">Design</option>
                                                        <option value="construction">Construction</option>
                                                    </select>
                                                </label>
                                            </div>
                                            <div className="mt-6 flex justify-end">
                                                <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                                                <PrimaryButton className="ml-3">Update House</PrimaryButton>
                                            </div>
                                        </form>
                                    </Modal>
                                    <Modal show={addingEntrance} onClose={closeModal}>
                                        <form onSubmit={handleAddEntrance} className="p-6">
                                            <h2 className="text-lg font-medium text-gray-900">
                                                Add Entrance
                                            </h2>
                                            <div className="mt-6 flex flex-col">
                                                <label className="block mb-2 text-sm font-medium text-gray-900 pb-3">
                                                    Number of floors:
                                                    <input type="number" value={data.entranceFloors}
                                                           onChange={e => setData('entranceFloors', e.target.value)}
                                                           className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                                </label>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 pb-3">
                                                    Number of apartments:
                                                    <input type="number" value={data.entranceApartments}
                                                           onChange={e => setData('entranceApartments', e.target.value)}
                                                           className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                                                </label>
                                            </div>
                                            <div className="mt-6 flex justify-end">
                                                <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                                                <PrimaryButton className="ml-3">Add Entrance</PrimaryButton>
                                            </div>
                                        </form>
                                    </Modal>
                                    <Modal show={confirmingHouseDeletion} onClose={closeModal}>
                                        <form onSubmit={handleDelete} className="p-6">
                                            <h2 className="text-lg font-medium text-gray-900">
                                                Are you sure you want to delete this house?
                                            </h2>

                                            <div className="mt-6 flex justify-end">
                                                <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                                                <DangerButton className="ml-3" disabled={processing}>
                                                    Delete House
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
            </div>
        </AuthenticatedLayout>
    );
}

export default HouseDetails;
