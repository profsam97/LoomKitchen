import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import {useEffect, useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import axios from "axios";
import {useGetAllUsers} from "../../Hooks";
import {useNavigate} from "react-router";

const theme = createTheme();
const userLists = [
    {
        userName: 'user1',
        password: 'password1'
    },
    {
        userName: 'user2',
        password: 'password2'
    },
    {
        userName: 'user3',
        password: 'password3'
    }

]
export default function Login() {
    const [listOfUsers, setListofUsers] = useState([]); 
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const router = useNavigate();
    useEffect(() => {
    if(!!isLoggedIn){
        router('/');
    }
    },[])

    const onUserChange = e => {
        setUser(e.target.value);
    }
    const onPasswordChange = e => {
        setPassword(e.target.value);
    }
    const getAllUsers = data => {
        let intialData = [];
        data.records.forEach(data => {
            intialData.push(data.fields)
        })
        setListofUsers(intialData);
    //     Object.keys(data).map(record => {
    //         console.log(record)
    //         console.log(Object.keys(record));
    //     })
    // Object.keys(data).map(record => Object.keys(record).map(data => console.log(data)))
    };
    const checkAuth = (user1, password1) => {

        return listOfUsers.some(user => user.username == user1 && user.password === password1);

    }
    const { isLoading, refetch } = useGetAllUsers(getAllUsers);

    const handleSubmit = (event) => {
        event.preventDefault();
        const checkUserAuth = checkAuth(user, password);
        if(checkUserAuth){
            setUser('')
            setPassword('')
            setError(false)
            sessionStorage.setItem('username', user);
            sessionStorage.setItem('isLoggedIn', true);
            router('/');

        }else{
            setPassword('')
            setError(true)
        }

    };

    useEffect(() => {
        refetch();
    },[])
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={user}
                            onChange={onUserChange}
                            type='text'
                            id="user"
                            label="username "
                            name="user"
                            autoComplete="user"
                            autoFocus
                            helperText={error ? 'Invalid Username or Password': ''}
                            error={error}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={password}
                            onChange={onPasswordChange}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}