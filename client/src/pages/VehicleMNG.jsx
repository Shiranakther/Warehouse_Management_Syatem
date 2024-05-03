import React, { useState, useEffect } from "react";
import axios from "axios";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { apiUrl } from '../utils/Constants.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, Select, Typography } from "@mui/material";

export default function VehicleMNG() {
    const [vehicles, setVehicles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [vehicleData, setVehicleData] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [open2, setOpen2] = useState(false);

    const handleClose2 = () => {
        setShowForm(false);
    };

    const getAllVehicles = async () => {
        try {
            const response = await axios.get(`${apiUrl}/vehicle`);
            setVehicles(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            setError(error);
        }
    };

    const handleUpdatevehicle = async (id, data) => {
        try {
            const response = await axios.put(`${apiUrl}/vehicle/${id}`, data);
            console.log("vehicle updated:", response.data);
            toast.success("vehicle Data updated successfully!");
            getAllVehicles();
        } catch (error) {
            console.error("Update error:", error);
        }
    };


    const handleDeletevehicle = async (id) => {
        try {
            const response = await axios.delete(`${apiUrl}/vehicle/${id}`);
            console.log("vehicle deleted:", response.data);
            toast.success("Vehicle Deleted Successfully!", {
                onClose: () => {
                    window.location.reload();
                }
            });
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to Delete Vehicle.");
        }
    };

    const handleEditvehicle = (vehicleData) => {
        setShowForm(true);
        setVehicleData(vehicleData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleUpdatevehicle(vehicleData._id, vehicleData);
            setShowForm(false);
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    useEffect(() => {
        getAllVehicles();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const filteredvehicles = vehicles.filter(vehicle =>
        vehicle.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const MyDocument = (
        <Document>
            <Page style={styles.page}>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.headerCell}>vehicle Number</Text>
                        <Text style={styles.headerCell}>owner Name</Text>
                        <Text style={styles.headerCell}>manufactured Year</Text>
                        <Text style={styles.headerCell}>brand</Text>
                        <Text style={styles.headerCell}>model</Text>
                        <Text style={styles.headerCell}>mileage</Text>
                    </View>
                    {filteredvehicles.map(vehicle => (
                        <View key={vehicle._id} style={styles.tableRow}>
                            <Text style={styles.cell}>{vehicle.vehicleNumber}</Text>
                            <Text style={styles.cell}>{vehicle.ownerName}</Text>
                            <Text style={styles.cell}>{vehicle.manufacturedYear}</Text>
                            <Text style={styles.cell}>{vehicle.brand}</Text>
                            <Text style={styles.cell}>{vehicle.model}</Text>
                            <Text style={styles.cell}>{vehicle.mileage}</Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );

    return (
        <div className="container mx-auto px-4 py-8 pt-20 w-4/6 me-36   ">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="shadow appearance-none border rounded w-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="flex justify-end p-4 mt-9">
                <PDFDownloadLink document={MyDocument} fileName="vehicles.pdf">
                    {({ blob, url, loading, error }) =>
                        loading ? 'Loading document...' : <Button variant='contained'>Download PDF</Button>
                    }
                </PDFDownloadLink>
            </div>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Vehicle Number</th>
                        <th className="border border-gray-300 px-4 py-2">Owner Name</th>
                        <th className="border border-gray-300 px-4 py-2">Manufactured Year</th>
                        <th className="border border-gray-300 px-4 py-2">Brand</th>
                        <th className="border border-gray-300 px-4 py-2">Model</th>
                        <th className="border border-gray-300 px-4 py-2">Mileage</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredvehicles.map(vehicle => (
                        <tr key={vehicle._id} className="bg-white">
                            <td className="border border-gray-300 px-4 py-2">{vehicle.vehicleNumber}</td>
                            <td className="border border-gray-300 px-4 py-2">{vehicle.ownerName}</td>
                            <td className="border border-gray-300 px-4 py-2">{vehicle.manufacturedYear}</td>
                            <td className="border border-gray-300 px-4 py-2">{vehicle.brand}</td>
                            <td className="border border-gray-300 px-4 py-2">{vehicle.model}</td>
                            <td className="border border-gray-300 px-4 py-2">{vehicle.mileage}</td>
                            <td className="border border-gray-300 px-4 py-2">

                                <div className="justify-items-start">
                                    <Button onClick={() => handleEditvehicle(vehicle)} size="small" variant="outlined" color="success">
                                        Update
                                    </Button>
                                    <Button onClick={() => handleDeletevehicle(vehicle._id)} variant="outlined" size="small" color="error">
                                        Delete
                                    </Button>
                                </div>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            <Dialog
                open={showForm}
                onClose={handleClose2}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: {
                        width: '33%',
                        minWidth: '200px',
                        maxWidth: '500px',
                    },
                }}
            >
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold mb-4">Update vehicle</h2>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicleNumber">
                            Vehicle Number
                        </label>
                        <input
                            id="vehicleNumber"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={vehicleData.vehicleNumber}
                            onChange={(e) => setVehicleData({ ...vehicleData, vehicleNumber: e.target.value })}
                            placeholder="Vehicle Number"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ownerName">
                            Owner Name
                        </label>
                        <input
                            id="ownerName"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={vehicleData.ownerName}
                            onChange={(e) => setVehicleData({ ...vehicleData, ownerName: e.target.value })}
                            placeholder="Owner Name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="manufacturedYear">
                            Manufactured Year
                        </label>
                        <input
                            id="manufacturedYear"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={vehicleData.manufacturedYear}
                            onChange={(e) => setVehicleData({ ...vehicleData, manufacturedYear: e.target.value })}
                            placeholder="manufacturedYear"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">
                            Brand Name
                        </label>
                        <input
                            id="brand"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={vehicleData.brand}
                            onChange={(e) => setVehicleData({ ...vehicleData, brand: e.target.value })}
                            placeholder="brand"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">
                            Model Name
                        </label>
                        <input
                            id="model"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={vehicleData.model}
                            onChange={(e) => setVehicleData({ ...vehicleData, model: e.target.value })}
                            placeholder="model"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mileage">
                            Mileage
                        </label>
                        <input
                            id="mileage"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={vehicleData.mileage}
                            onChange={(e) => setVehicleData({ ...vehicleData, mileage: e.target.value })}
                            placeholder="mileage"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Update
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Dialog>

        </div>
    );
}

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 20
    },
    table: {
        width: '100%',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#000',
        marginBottom: 20
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        alignItems: 'center',
        minHeight: 24,
        paddingVertical: 10, // Adjusted padding for better readability
        paddingHorizontal: 5 // Adjusted padding for better readability
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center', // Center align header cells
    },
    cell: {
        flex: 1,
        textAlign: 'center' // Center align content cells
    }
});

