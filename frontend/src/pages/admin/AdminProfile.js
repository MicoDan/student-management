import React, { useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../../redux/userRelated/userHandle';
import { useNavigate } from 'react-router-dom'
import { authLogout } from '../../redux/userRelated/userSlice';
import { Button, Collapse, Container, Paper, Typography } from '@mui/material';


const AdminProfile = () => {
    const [showTab, setShowTab] = useState(false);
    const buttonText = showTab ? 'Cancel' : 'Edit profile';

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { currentUser, response, error } = useSelector((state) => state.user);
    const address = "Admin"

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState("");
    const [schoolName, setSchoolName] = useState(currentUser.schoolName);

    const fields = password === "" ? { name, email, schoolName } : { name, email, password, schoolName }

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(updateUser(fields, currentUser._id, address))
    }

    const deleteHandler = () => {
        try {
            dispatch(deleteUser(currentUser._id, "Students"));
            dispatch(deleteUser(currentUser._id, address));
            dispatch(authLogout());
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Admin Profile
                </Typography>
                <Typography variant="subtitle1">
                    Name: {currentUser.name}<br />
                    Email: {currentUser.email}<br />
                    School: {currentUser.schoolName}<br />
                </Typography>
                <Button variant="contained" color="error" onClick={deleteHandler} sx={{ mr: 2, mt: 2 }}>
                    Delete
                </Button>
                <Button variant="contained" onClick={() => setShowTab(!showTab)} sx={{ mt: 2 }}>
                    {showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}{buttonText}
                </Button>
                <Collapse in={showTab} timeout="auto" unmountOnExit>
                    <form onSubmit={submitHandler} sx={{ mt: 2 }}>
                        <Typography variant="h5" gutterBottom>
                            Edit Details
                        </Typography>
                        <label>Name</label>
                        <input type="text" placeholder="Enter your name..."
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            autoComplete="name" required />

                        <label>School</label>
                        <input type="text" placeholder="Enter your school name..."
                            value={schoolName}
                            onChange={(event) => setSchoolName(event.target.value)}
                            autoComplete="name" required />

                        <label>Email</label>
                        <input type="email" placeholder="Enter your email..."
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            autoComplete="email" required />

                        <label>Password</label>
                        <input type="password" placeholder="Enter your password..."
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="new-password" />

                        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                            Update
                        </Button>
                    </form>
                </Collapse>
            </Paper>
        </Container>
    )
}

export default AdminProfile;
