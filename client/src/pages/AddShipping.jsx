import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper } from "@mui/material";
import { toast } from 'react-toastify';
import axios from 'axios';
import { apiUrl } from '../utils/Constants.js';

const AddShipping = () => {


    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const payload = {
            userName: data.get('userName'),
            userMobile: data.get('userMobile'),
            userAddress: data.get('userAddress')
        };
        console.log(payload);
        try {
            const isLoggedin = await axios.post(`${apiUrl}/shipping`, payload);
            if (isLoggedin) {
                toast.success('Added Successfully!');
                navigate('/shippings');
            }
        } catch (error) {
            if (error.message) {
                toast.error(error.message);
            }
            toast.error(error.response.data.message);
        }
    };

    return (

        <Container component="main" maxWidth="lg"  className=' pt-20 '>
            <Box
                sx={{
                    marginTop: 20, // Increase this value to move the form further down
                    my: 8,
                    mx: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Grid container >
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        mx={'auto'}
                        component={Paper}
                        elevation={6}
                        square
                    >
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography component="h1" variant="h4">
                                Add Shipping Details
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

                                <Grid container spacing={2}>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="userName"
                                            required
                                            fullWidth
                                            id="userName"
                                            label="Name"
                                            autoFocus
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="userMobile"
                                            type='number'
                                            required
                                            fullWidth
                                            id="userMobile"
                                            label="Mobile"
                                            autoFocus
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            name="userAddress"
                                            required
                                            fullWidth
                                            multiline
                                            rows={4}
                                            id="userAddress"
                                            label="Address"
                                            autoFocus
                                        />
                                    </Grid>


                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Add Shipping Details
                                </Button>
                                <Grid container justifyContent="flex-end"
                                    sx={{ mb: 0.5 }}>

                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default AddShipping;

