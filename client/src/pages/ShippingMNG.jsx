import Typography from '@mui/material/Typography';
import { Button, FormControl, MenuItem, Select } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react';
import { apiUrl } from '../utils/Constants.js';
import { toast } from 'react-toastify';
import axios from "axios";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const DeliveryDetails = () => {
    const [shipping, setShipping] = useState([]);
    const [vehicles, setVehicle] = useState([]);
    const [open2, setOpen2] = useState(false);
    const [updateFormData, setUpdateFormData] = useState({
        _id: '',
        vehicle: '',
        status: '',
    });

    const handleUpdateUser = (row) => {
        setOpen2(true);
        setUpdateFormData({
            _id: row._id,
            vehicle: row.vehicle,
            status: row.status,
        });
    };

    const handleDialogClose = () => {
        setOpen2(false);
        setFormData({
            vehicle: '',
            status: '',
        });
    };

    const handleUpdate = async () => {
        try {
            const result = await axios.put(`${apiUrl}/shipping/${updateFormData._id}`, updateFormData);
            if (result) {
                getAllShipping();
                handleClose2()
                toast.success('Updated Successfully');
                handleDialogClose();
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const getAllShipping = async () => {
        try {
            const response = await axios.get(`${apiUrl}/shipping`);
            setShipping(response.data);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    };

    const getAllVehicles = async () => {
        try {
            const response = await axios.get(`${apiUrl}/vehicle`);
            setVehicle(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    };

    useEffect(() => {
        getAllVehicles();
        getAllShipping();
    }, []);

    const handleClose2 = () => {
        setOpen2(false);
    };

    const MyDocument = (
        <Document>
            <Page style={styles.page}>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.headerCell}>No</Text>
                        <Text style={styles.headerCell}>User Name</Text>
                        <Text style={styles.headerCell}>User Mobile</Text>
                        <Text style={styles.headerCell}>User Address</Text>
                        <Text style={styles.headerCell}>Vehicle Number</Text>
                        <Text style={styles.headerCell}>Status</Text>
                    </View>
                    {shipping.map((order, index) => (
                        <View key={order._id} style={styles.tableRow}>
                            <Text style={styles.cell}>{index + 1}</Text>
                            <Text style={styles.cell}>{order.userName}</Text>
                            <Text style={styles.cell}>{order.userMobile}</Text>
                            <Text style={styles.cell}>{order.userAddress}</Text>
                            <Text style={styles.cell}>{order.vehicle ? order.vehicle.vehicleNumber : 'N/A'}</Text>
                            <Text style={styles.cell}>{order.status}</Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );

    return (
        <>
            <div className="flex justify-end pt-20 mr-20 mb-10">

                <PDFDownloadLink document={MyDocument} fileName="deliveries.pdf">
                    {({ blob, url, loading, error }) =>
                        loading ? 'Loading document...' : <Button variant='contained'>Download PDF</Button>
                    }
                </PDFDownloadLink>
            </div>
            <div className="w-4/6 mx-auto bg-transparent  rounded-lg overflow-hidden me-20 pt-26">
                <h2 className="text-3xl font-semibold text-center bg-gray-500 text-white py-4">Delivery Details</h2>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white">
                        {/* Table header */}
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-400 px-4 py-2">ID</th>
                                <th className="border border-gray-400 px-4 py-2">User Name</th>
                                <th className="border border-gray-400 px-4 py-2">User Mobile</th>
                                <th className="border border-gray-400 px-4 py-2">User Address</th>
                                <th className="border border-gray-400 px-4 py-2">Vehicle Number</th>
                                <th className="border border-gray-400 px-4 py-2">Delivery Status</th>
                                <th className="border border-gray-400 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        {/* Table body */}
                        <tbody>
                            {shipping.map((delivery, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                    <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                                    <td className="border border-gray-400 px-4 py-2">{delivery.userName}</td>
                                    <td className="border border-gray-400 px-4 py-2">{delivery.userMobile}</td>
                                    <td className="border border-gray-400 px-4 py-2">{delivery.userAddress}</td>
                                    <td className="border border-gray-400 px-4 py-2">{delivery.vehicle ? delivery.vehicle.vehicleNumber : 'N/A'}</td>
                                    <td className="border border-gray-400 px-4 py-2">{delivery.status}</td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        <button
                                            onClick={() => handleUpdateUser(delivery)}
                                            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Display message if no deliveries */}
            </div>


            <Dialog
                open={open2}
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
                <DialogTitle id="alert-dialog-title">
                    {"Update Details"}
                </DialogTitle>
                <DialogContent>

                    <FormControl fullWidth variant="outlined">
                        <Typography component="legend">Vehicle</Typography>
                        <Select
                            labelId="category-label"
                            onChange={(e) => setUpdateFormData({ ...updateFormData, vehicle: e.target.value })}

                        >
                            {vehicles.map((vehicle, index) => (
                                <MenuItem key={index} value={vehicle._id}>{vehicle.vehicleNumber}</MenuItem> // Update this line
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth variant="outlined">
                        <Typography component="legend">Vehicle</Typography>
                        <Select
                            labelId="category-label"
                            onChange={(e) => setUpdateFormData({ ...updateFormData, status: e.target.value })}
                            defaultValue={updateFormData.status}
                        >
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Shipped">Shipped</MenuItem>
                        </Select>
                    </FormControl>



                </DialogContent>

                <DialogActions>
                    <Button onClick={handleUpdate}>Publish</Button>
                    <Button onClick={handleClose2} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
};


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

export default DeliveryDetails;
