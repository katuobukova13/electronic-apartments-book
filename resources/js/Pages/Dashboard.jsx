import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import HouseList from "@/Pages/HouseList.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {React, useState} from "react";
import Modal from "@/Components/Modal.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import {Inertia} from "@inertiajs/inertia";

export default function Dashboard({auth}) {
    const [creatingHouse, setCreatingHouse] = useState(false);

    const {
        data,
        setData,
        post,
        delete: destroy,
        processing,
        reset,
    } = useForm({
        state: 'design',
        entrances: '',
        total_floors: '',
        total_apartments: '',
    });

    const handleCreate = (e) => {
        e.preventDefault();
        axios.post('api/house', data)
            .then(() => {
                Inertia.visit('/houses'); // Redirect to the homepage after deleting the house
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const closeModal = () => {
        setCreatingHouse(false);

        reset();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Electronic apartments book</h2>
                    <PrimaryButton onClick={() => setCreatingHouse(true)}>
                        Create House
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <HouseList/>
                    <Modal show={creatingHouse} onClose={closeModal}>
                        <form onSubmit={handleCreate} className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                Create House
                            </h2>
                            <div className="mt-6 flex flex-col">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    State:
                                    <select value={data.state}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            onChange={(e) => setData('state', e.target.value)}>
                                        <option value="design">Design</option>
                                        <option value="construction">Construction</option>
                                    </select>
                                </label>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Entrances:
                                    <input type="number" value={data.entrances}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           onChange={(e) => setData('entrances', e.target.value)}/>
                                </label>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Floors:
                                    <input type="number" value={data.total_floors}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           onChange={(e) => setData('total_floors', e.target.value)}/>
                                </label>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Apartments:
                                    <input type="number" value={data.total_apartments}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           onChange={(e) => setData('total_apartments', e.target.value)}/>
                                </label>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                                <PrimaryButton className="ml-3" disabled={processing}>
                                    Create House
                                </PrimaryButton>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
