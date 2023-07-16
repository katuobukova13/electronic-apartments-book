import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {InertiaLink} from "@inertiajs/inertia-react";
import SecondaryButton from "@/Components/SecondaryButton.jsx";

function HouseList() {
    const [houses, setHouses] = useState([]);

    useEffect(() => {
        axios.get('/api/houses')
            .then(response => {
                setHouses(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const countFloors = (entrances) => {
        let total = 0;
        entrances.forEach(entrance => {
            total += entrance.total_floors;
        });
        return total;
    };

    const countApartments = (entrances) => {
        let total = 0;
        entrances.forEach(entrance => {
            entrance.floors.forEach(floor => {
                total += floor.total_apartments;
            });
        });
        return total;
    }

    return (
        <div>
            <table className="table-auto w-full">
                <thead>
                <tr>
                    <th scope="col">House</th>
                    <th scope="col">State</th>
                    <th scope="col">Entrance</th>
                    <th scope="col">Floor</th>
                    <th scope="col">Apartments</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {houses.map(house => (
                    <tr key={house.id}>
                        <td className="border px-4 py-2">{house.id}</td>
                        <td className="border px-4 py-2">{house.state}</td>
                        <td className="border px-4 py-2">{house.entrances.length}</td>
                        <td className="border px-4 py-2">{countFloors(house.entrances)}</td>
                        <td className="border px-4 py-2">{countApartments(house.entrances)}</td>
                        <td className="px-4 py-2">
                            <InertiaLink href={`/houses/${house.id}`}>
                                <SecondaryButton>View details</SecondaryButton>
                            </InertiaLink>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default HouseList;
