import React, { useEffect, useState } from 'react';
import {
    Box, Button, Paper, Typography, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Snackbar, Alert, CircularProgress
} from '@mui/material';
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { jobLoadAction, deleteSingleJobAction } from '../../redux/actions/jobactions';

const DashJobs = () => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);  // Dialog state
    const [selectedJobId, setSelectedJobId] = useState(null);  // ID of the job to delete
    const [snackbarOpen, setSnackbarOpen] = useState(false);  // Snackbar state

    useEffect(() => {
        dispatch(jobLoadAction());  // Load all jobs
    }, [dispatch]);

    const { jobs = [], loading, error } = useSelector(state => state.loadJobs || {});

    const handleClickOpen = (id) => {
        console.log('Opening delete confirmation for job with ID:', id);
        setSelectedJobId(id);
        setOpen(true);
        console.log('Dialog open state:', open);  // Check if state is being set
    };
    
    const handleDeleteJob = (id) => {
        console.log('Deleting job with ID:', id);
        dispatch(deleteSingleJobAction(id))
            .then(() => {
                console.log('Job deleted successfully');
                setSnackbarOpen(true); // Show success notification
                dispatch(jobLoadAction()); // Refresh job list
            })
            .catch((error) => {
                console.error('Error deleting job:', error); // Log errors
            });
    };
    // Define columns for DataGrid
    const columns = [
        { field: '_id', headerName: 'Job ID', width: 150 },
        { field: 'Title', headerName: 'Job Name', width: 150 },
        {
            field: 'Jobtype',
            headerName: 'Category',
            width: 150,
            renderCell: (params) => (params.row.Jobtype.JobTypeName)
        },
        {
            field: 'Firstname',
            headerName: 'First Name',
            renderCell: (params) => params.row ? params.row.Firstname : 'N/A'
        },
        {
            field: 'available',
            headerName: 'Available',
            width: 150,
            renderCell: (params) => (params.row.available ? "Yes" : "No"),
        },
        {
            field: 'Salary',
            headerName: 'Salary',
            type: 'number',
            width: 150,
            renderCell: (params) => (params.row.Salary !== undefined ? `$${params.row.Salary}` : 'N/A'),
        },
        {
            field: 'Actions',
            width: 200,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '170px' }}>
                    <Button variant="contained">
                        <Link style={{ color: 'white', textDecoration: 'none' }} to={`/admin/edit/job/${params.row._id}`}>
                            Edit
                        </Link>
                    </Button>
                    <Button onClick={() => handleDeleteJob(params.row.id)} variant="contained" color="error">
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography variant="h6" color="error" sx={{ textAlign: 'center' }}>
                {error}
            </Typography>
        );
    }

    return (
        <Box>
            <Typography variant="h4" sx={{ color: 'white', pb: 3 }}>
                Jobs List
            </Typography>
            <Box sx={{ pb: 2, display: 'flex', justifyContent: 'right' }}>
                <Button variant='contained' color="success" startIcon={<AddIcon />}>
                    <Link style={{ color: 'white', textDecoration: 'none' }} to="/admin/job/create">Create Job</Link>
                </Button>
            </Box>
            <Paper sx={{ bgcolor: 'secondary.midNightBlue' }}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        sx={{
                            '& .MuiTablePagination-displayedRows': {
                                color: 'black',
                            },
                            '& .MuiDataGrid-cell': {
                                color: 'black',
                            },
                            '& .MuiDataGrid-cell:hover': {
                                bgcolor: 'skyblue',
                                color: 'black',
                            },
                            '& .MuiDataGrid-row:hover': {
                                bgcolor: 'skyblue',
                            },
                            color: 'black',
                            [`& .${gridClasses.row}`]: {
                                bgcolor: 'blue',
                            },
                        }}
                        rows={jobs}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        components={{ Toolbar: GridToolbar }}
                    />
                </Box>
            </Paper>

            {/* Confirmation dialog for delete action */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Job"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this job? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleDeleteConfirmed} color="error" autoFocus>Confirm</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for showing success message */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Job deleted successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default DashJobs;
