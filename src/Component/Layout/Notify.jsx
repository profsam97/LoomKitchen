import { Alert, Snackbar } from '@mui/material';
import React, {useContext, useEffect} from 'react'
import ContextApi from '../../Context/ContentApi'
const Snapbar = () => {

    const open  = useContext(ContextApi).open;
    const message = useContext(ContextApi).message;
    const severity = useContext(ContextApi).severity;
    const endSnackBar = useContext(ContextApi).closeSnackBar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        endSnackBar();
    }
    return (

        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert variant='filled' elevation={4} onClose={handleClose} severity={severity=== 'warning' ? 'warning' : 'error'} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Snapbar