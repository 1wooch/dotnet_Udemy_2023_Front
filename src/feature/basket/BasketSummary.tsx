import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import { useStoreContext } from "../../app/context/StoreContext";
import { useEffect, useState } from "react";


export default function BasketSummary() {
    
    const [subtotal, setSubtotal] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(15);
    const { basket } = useStoreContext();

    useEffect(() => {
        let calculatedSubtotal = 0;
        // Calculate subtotal
        basket?.items.forEach(item => {
          calculatedSubtotal += item.quantity * item.price;
        });
        // Format subtotal as currency with two decimal places
            setSubtotal((calculatedSubtotal / 100).toFixed(2));
      }, [basket]);
      
    useEffect(() => {
        // Adjust delivery fee based on subtotal
        if (subtotal > 100) {
        setDeliveryFee(0);
        } else {
        setDeliveryFee(15);
        }
    }, [subtotal]);

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{subtotal}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{deliveryFee}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{subtotal + deliveryFee}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}