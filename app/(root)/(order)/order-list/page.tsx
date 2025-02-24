"use client"

import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';

// Define the type for an order
type Order = {
    id: string;
    programCode: string;
    buyer: string;
    item: string;
    styleNo: string;
    orderQty: number;
    percentage: number;
    unitPrice: number;
    status: string;
};

export default function ProductionOrder() {
    // Use the Order type in the useState hook
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        async function fetchOrders() {
            const response = await fetch('/api/production-order');
            const data: Order[] = await response.json();
            setOrders(data);
            setLoading(false);
        }
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-400"></div>
                </div>
            </div>

        )
    }

    return (
        <div>
            <div>
                <div>
                    <div className='py-4'>
                        <h2 className='text-2xl font-bold'>Order List</h2>
                    </div>
                    <div className='border'>
                        <Table>
                            <TableCaption>A list of production orders.</TableCaption>
                            <TableHeader>
                                <TableRow className='bg-gray-100'>
                                    <TableHead>Program Code</TableHead>
                                    <TableHead>Buyer</TableHead>
                                    <TableHead>Item</TableHead>
                                    <TableHead>Style No</TableHead>
                                    <TableHead>Order Qty</TableHead>
                                    <TableHead>Percentage</TableHead>
                                    <TableHead>Unit Price</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order:any, index:number) => (
                                    <TableRow key={index}>
                                        <TableCell>{order.programCode}</TableCell>
                                        <TableCell>{order.buyer}</TableCell>
                                        <TableCell>{order.item}</TableCell>
                                        <TableCell>{order.styleNo}</TableCell>
                                        <TableCell>{order.orderQty}</TableCell>
                                        <TableCell>{order.percentage}</TableCell>
                                        <TableCell>{order.unitPrice}</TableCell>
                                        <TableCell>
                                            <Badge>{order.status}</Badge>
                                        </TableCell>
                                        {/* <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(order.updatedAt).toLocaleDateString()}</TableCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}