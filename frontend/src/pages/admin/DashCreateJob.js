import { Box, MenuItem, Typography, TextField, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { jobTypeLoadAction } from '../../redux/actions/jobtypeactions';
import { registerAjobAction } from '../../redux/actions/jobactions';

// Validation schema for the form
const validationSchema = yup.object({
    Title: yup.string('Enter a job title').required('Title is required'),
    Description: yup
        .string('Enter a description')
        .min(6, 'Description should be at least 6 characters long')
        .required('Description is required'),
    Salary: yup.number('Enter a salary').required('Salary is required'),
    location: yup.string('Enter a location').required('Location is required'),
});

const DashCreateJob = () => {
    const dispatch = useDispatch();

    // Load job types on component mount
    useEffect(() => {
        dispatch(jobTypeLoadAction());
    }, [dispatch]);

    // Access job types from Redux store
    const { jobTypes } = useSelector(state => state.jobTypeAll);

    // Formik setup for managing form state and validation
    const formik = useFormik({
        initialValues: {
            Title: '',
            Description: '',
            Salary: '',
            location: '',
            Jobtype: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("Form Data Submitted:", values); // Log the form values
            dispatch(registerAjobAction(values));
        },
    });

    return (
        <Box sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}>
            <Box component="form" className='form_style border-style' onSubmit={formik.handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                    <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
                        Register a Job
                    </Typography>

                    {/* Title Input */}
                    <TextField
                        fullWidth
                        id="Title"
                        label="Title"
                        name="Title"
                        placeholder="Enter job title"
                        value={formik.values.Title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.Title && Boolean(formik.errors.Title)}
                        helperText={formik.touched.Title && formik.errors.Title}
                        sx={{ mb: 3 }}
                    />

                    {/* Description Input */}
                    <TextField
                        fullWidth
                        id="Description"
                        label="Description"
                        name="Description"
                        placeholder="Enter job description"
                        value={formik.values.Description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.Description && Boolean(formik.errors.Description)}
                        helperText={formik.touched.Description && formik.errors.Description}
                        sx={{ mb: 3 }}
                    />

                    {/* Salary Input */}
                    <TextField
                        fullWidth
                        id="Salary"
                        label="Salary"
                        name="Salary" // Ensure it matches the validation schema
                        type="number"
                        placeholder="Enter job salary"
                        value={formik.values.Salary}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.Salary && Boolean(formik.errors.Salary)}
                        helperText={formik.touched.Salary && formik.errors.Salary}
                        sx={{ mb: 3 }}
                    />

                    {/* Location Input */}
                    <TextField
                        fullWidth
                        id="location"
                        label="Location"
                        name="location"
                        placeholder="Enter job location"
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.location && Boolean(formik.errors.location)}
                        helperText={formik.touched.location && formik.errors.location}
                        sx={{ mb: 3 }}
                    />

                    {/* Job Type Select */}
                    <TextField
                        select
                        fullWidth
                        label="Job Type"
                        name="Jobtype"
                        value={formik.values.Jobtype}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.Jobtype && Boolean(formik.errors.Jobtype)}
                        helperText={formik.touched.Jobtype && formik.errors.Jobtype}
                        sx={{ mb: 3 }}
                    >
                        <MenuItem key="" value="">
                            <em>Select Job Type</em>
                        </MenuItem>
                        {jobTypes && jobTypes.length > 0 ? (
                            jobTypes.map(cat => (
                                <MenuItem key={cat._id} value={cat._id}>
                                    {cat.JobTypeName}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>No Job Types Available</MenuItem>
                        )}
                    </TextField>

                    {/* Submit Button */}
                    <Button fullWidth variant="contained" type='submit'>
                        Create Job
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default DashCreateJob;
