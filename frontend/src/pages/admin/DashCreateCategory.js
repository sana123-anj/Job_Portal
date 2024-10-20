import { Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createJobTypeAction } from '../../redux/actions/jobtypeactions';

const validationSchema = yup.object({
    JobTypeName: yup
        .string('Enter a Category')
        .required('Category is required'),
});

const DashCreateCategory = () => {
    const { user } = useSelector(state => state.userProfile);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            user: user ? user._id : null, // Ensure this gets the user's ID correctly
            JobTypeName: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            const requestData = {
                user: values.user, // Ensure the user is defined here
                JobTypeName: values.JobTypeName // Ensure the property name matches
            };
            dispatch(createJobTypeAction(requestData));
            actions.resetForm();
        },
    });

    return (
        <Box sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}>
            <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style'>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                    <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
                        Create a Category
                    </Typography>
                    <TextField
                        sx={{ mb: 3 }}
                        fullWidth
                        id="JobTypeName"
                        label="category"
                        name='JobTypeName' // This must match with the validation schema
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="category name"
                        value={formik.values.JobTypeName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.JobTypeName && Boolean(formik.errors.JobTypeName)}
                        helperText={formik.touched.JobTypeName && formik.errors.JobTypeName}
                    />
                    <Button fullWidth variant="contained" type='submit'>Create category</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default DashCreateCategory;
