import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import HouseList from "@/Pages/HouseList.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Electronic apartments book</h2>
                <PrimaryButton>
                    Create House
                </PrimaryButton>
            </div>
            }
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <HouseList />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
