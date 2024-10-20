import React, { useEffect } from 'react';
import { Box, Button, Paper, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { jobTypeLoadAction, deletejobtypeaction } from '../../redux/actions/jobtypeactions'; // Import the delete action
import moment from 'moment';

const DashCategory = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState(null); // Store the selected job type ID for deletion

    useEffect(() => {
        dispatch(jobTypeLoadAction());
    }, [dispatch]);

    const { jobType, loading } = useSelector(state => state.jobTypeAll);
    let data = [];
    data = (jobType !== undefined && jobType.length > 0) ? jobType : [];

    // Open confirmation dialog
    const handleClickOpen = (id) => {
        setSelectedId(id);
        setOpen(true);
    };

    // Close confirmation dialog
    const handleClose = () => {
        setOpen(false);
        setSelectedId(null);
    };

    // Delete job category by ID
    const handleDeleteJobCategory = () => {
        if (selectedId) {
            dispatch(deletejobtypeaction(selectedId)) // Dispatch delete action
                .then(() => {
                    handleClose(); // Close dialog after deletion
                    dispatch(jobTypeLoadAction()); // Refresh job types
                })
                .catch(error => {
                    console.error('Error deleting job type:', error);
                });
        }
    };

    const columns = [
        {
            field: '_id',
            headerName: 'Category ID',
            width: 150,
            editable: true,
        },
        {
            field: 'JobTypeName',
            headerName: 'Category',
            width: 150,
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 150,
            renderCell: (params) => (
                moment(params.row.createdAt).format('YYYY-MM-DD HH:mm:ss')
            ),
        },
        {
            field: 'Actions',
            width: 200,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <Button variant="contained">
                        <Link style={{ color: "black", textDecoration: "none" }} to={`/admin/edit/user/${values.row._id}`}>Edit</Link>
                    </Button>
                    <Button onClick={() => handleClickOpen(values.row._id)} variant="contained" color="error">Delete</Button>
                </Box>
            ),
        },
    ];

    return (
        <Box>
            <Typography variant="h4" sx={{ color: "black", pb: 3 }}>
                Jobs Category
            </Typography>
            <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                <Button variant="contained" color="success" startIcon={<AddIcon />}>
                    <Link style={{ color: "#ffffff", textDecoration: "none" }} to='/admin/category/create'>Create Category</Link>
                </Button>
            </Box>
            <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        sx={{
                            '& .MuiTablePagination-displayedRows': {
                                color: 'black', // Pagination text color to black
                            },
                            '& .MuiDataGrid-row': {
                                color: 'black', // Row text color to black
                            },
                            '& .MuiDataGrid-cell': {
                                color: 'black', // Cell text color to black
                                borderColor: 'rgba(255, 255, 255, 0.12)', // Optional: Cell border color
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#1565C0', // Column header background color (blue)
                                color: 'black', // Column header text color to black
                            },
                            '& .MuiCheckbox-root svg': {
                                fill: 'black', // Checkbox color to black
                            },
                            '& .MuiDataGrid-footerContainer': {
                                color: 'black', // Footer text color to black
                            },
                            button: {
                                color: '#000000', // Button text color (black)
                            },
                            [`& .${gridClasses.row}`]: {
                                bgcolor: (theme) => theme.palette.secondary.main, // Row background color
                            },
                        }}
                        rows={data}
                        columns={columns}
                        pageSize={3}
                        rowsPerPageOptions={[3]}
                        checkboxSelection
                    />
                </Box>
            </Paper>

            {/* Confirmation Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this job category? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteJobCategory} color="secondary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DashCategory;
