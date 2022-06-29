import {
    Drawer,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    AppBar,
    Toolbar,
    Avatar,
    Container,
    ListItemButton,
    IconButton,
    Menu,
    MenuItem,
    Box, Autocomplete, TextField, Stack
} from '@mui/material'
import { AccountCircle, AddCircleOutlineOutlined, Dashboard, Logout, Person, Visibility } from '@mui/icons-material';
import React, {ReactNode, useContext, useEffect, useState} from 'react'
import classes from './Layout.module.css'
// import { Box } from '@mui/system';

import {useLocation, useNavigate} from "react-router";
import Button from "@mui/material/Button";
import {useGetAllMap, useGetAllResturants, usePostNewMap} from '../../Hooks/Index';
import ContentApi from "../../Context/ContentApi";


const Layout = ({children}) => {
    const [allMaps, setAllMaps] = useState([]);
    const getAllMap =  (data)  => {
        let initialData = [];
        for (const index in data){
            const hello = {
                id: index,
                name: data[index].name,
                isBookmark: data[index].isBookmark
            }
            initialData.push(hello)
        }
        setAllMaps(initialData);
    }
     useGetAllMap(getAllMap);

    let resturantName = [];
    const [resturantLists, setResturantLists] = useState([]);
    const [selectedResturants, setSelectedResturants] = useState(null);
    const getAllResturants = (data) => {
        data.records.forEach(data => {
         resturantName.push(data.fields) 
        })
        setResturantLists(resturantName)
    }
    const {isSuccess} = useGetAllResturants(getAllResturants)
    const [value, setValue] = useState(resturantLists[0])
    const router = useNavigate();
    const location = useLocation();
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
   useEffect(() => {
    if(!!isLoggedIn){

    }else{
        router('/Login')
    }
   },[])
    const username = sessionStorage.getItem('username');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };      const menuItems = [
        {
            text: 'Dashboard',
            icon: <Dashboard color='secondary'/>,
            path: '/'
        },
        {
            text: 'Bookmarks',
            icon: <Visibility color='secondary'/>,
            path: '/bookmarks'
        }
    ]
    // const dispatch = useDispatch();
    // const username = useSelector((state: auth) => state.auth.username).toUpperCase();
    // useAuth();

    const logoutHandler = () => {
        sessionStorage.removeItem('isLoggedIn');
        router('/login');
    }
    const {mutate, isLoading} = usePostNewMap();
    const isAdding = useContext(ContentApi).addNewMapHandler
    const addNewMap = () => {
        if(value){
            if (!allMaps.some(data => data.name === value)){
            mutate({
                name: value,
                isBookmark: false
            })
            isAdding();
            }
        }
    }
    return (
        <div className={classes.root} >
            <Drawer variant="permanent" anchor="left" >
                <div>
                    <Typography variant="h5"
                                color="secondary" sx={(theme) => ({
                        padding: theme.spacing(2)
                    })}> OSC </Typography>
                </div>
                <List>

                    {menuItems.map(item => (
                        <ListItemButton divider  key={item.text}
                                        onClick={() => router(item.path)} selected={location.pathname===item.path}>
                            <ListItemIcon  >{item.icon}</ListItemIcon>
                            <ListItemText  primary={item.text}/>
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            <AppBar position="fixed"   elevation={0}
                    sx={(theme) => ({
                        color: 'black',
                        background: '#fff',
                        width:`100% - 280px`
                        // ...theme.typography.overline,
                    })}
                    className={classes.appbar}>
                <Toolbar>
                    <Box flexGrow={1}>
                    <Stack direction='row' spacing={2} maxWidth='sm' sx={{width: 400, flexGrow: 1, display: {xs: 'none', sm: 'flex'}}}>
                    <Autocomplete
                        disablePortal
                        onChange={(event, newValue) => setValue(newValue.Name)}
                        id="combo-box-demo"
                        options={resturantLists}                      
                        getOptionLabel={(option) => option.Name}
                        fullWidth={true}
                        renderInput={(params) => <TextField {...params} label="Resturant"  />}
                    />
                        <Button variant='contained' disabled={isLoading}  type='submit' onClick={addNewMap} >{isLoading ? 'Adding...' : 'Add'}</Button>
                    </Stack>
                    </Box>
                    <Typography variant='h6' color='text.secondary' sx={{flexGrow:{xs:1, sm:0}}}>Hi, {username} </Typography>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem  onClick={logoutHandler}>
                                Logout &nbsp;
                                <Logout/>
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Container sx={{width:`100% - 280px`, mx:15}}>
                <Box sx={{mt:{xs: 10, md: 8}, mx: 10, display: 'flex', flexDirection:'column' }}>
                    {children}
                </Box>
            </Container>
        </div>
    )
}
export default Layout;
