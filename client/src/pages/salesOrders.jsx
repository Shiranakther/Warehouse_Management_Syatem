import React, { useEffect, useState } from 'react';

const SupplierItemsList = () => {
    const [supplierItems, setSupplierItems] = useState([]);

    useEffect(() => {
        const fetchSupplierItems = async () => {
            try {
                const response = await fetch('/api/supplier-items');
                if (!response.ok) {
                    throw new Error('Failed to fetch supplier items');
                }
                const data = await response.json();
                setSupplierItems(data);
            } catch (error) {
                console.error('Error fetching supplier items:', error);
            }
        };

        fetchSupplierItems();
    }, []);

    return (
        <div>
            <h1>Supplier Items List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Supplier Name</th>
                        <th>Item Name</th>
                        <th>Unit Price</th>
                        {/* Add additional table headers as needed */}
                    </tr>
                </thead>
                <tbody>
                    {supplierItems.map(item => (
                        <tr key={item._id}>
                            <td>{item.supplierName}</td>
                            <td>{item.itemName}</td>
                            <td>{item.unitPrice}</td>
                            {/* Render additional item details as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SupplierItemsList;
