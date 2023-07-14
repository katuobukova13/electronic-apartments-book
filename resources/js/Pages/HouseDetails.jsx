import {React, useEffect, useState} from 'react';
import axios from 'axios';
import DangerButton from "@/Components/DangerButton.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Head, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Modal from "@/Components/Modal.jsx";
import {Inertia} from '@inertiajs/inertia';
import SecondaryButton from "@/Components/SecondaryButton.jsx";

function HouseDetails({auth, id}) {
    const [house, setHouse] = useState(null);
    const [confirmingHouseDeletion, setConfirmingHouseDeletion] = useState(false);

    const {
        delete: destroy,
        processing,
        reset,
    } = useForm();

    const confirmHouseDeletion = () => {
        setConfirmingHouseDeletion(true);
    };

    useEffect(() => {
        axios.get(`/api/houses/${id}`)
            .then(response => {
                setHouse(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [id]);

    const handleUpdate = () => {
        axios.put(`/api/houses/${id}`)
            .then(response => {
                setHouse(response.data);
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

    const closeModal = () => {
        setConfirmingHouseDeletion(false);

        reset();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
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
                                    <div>
                                        {house.entrances && house.entrances.map(entrance => (
                                            <div key={entrance.id}>
                                                <h5 className="mb-4 text-gray-600">Entrance ID: {entrance.id}</h5>
                                                <p className="my-2 text-gray-400">Number of
                                                    floors: {entrance.total_floors}</p>
                                                {entrance.floors.map(floor => (
                                                    <div key={floor.id} className="my-2">
                                                        <h5>Floor {floor.id}</h5>
                                                        <p>Number of apartments: {floor.total_apartments}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                        <PrimaryButton onClick={() => setShowModal(true)}>Update</PrimaryButton>
                                        <DangerButton onClick={confirmHouseDeletion}
                                                      className='ml-3'>Delete</DangerButton>
                                    </div>
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
