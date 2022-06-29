import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import { Cancel, Delete } from '@mui/icons-material';
import ContentApi from '../../Context/ContentApi';
const style  = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 6,
};
export default function BasicModal() {
  const isDeleting = React.useContext(ContentApi).isDeleting
  const open = React.useContext(ContentApi).modalIsOpen;
  const closeModalHandler = React.useContext(ContentApi).closeModal
  const handleClose = () => closeModalHandler();
  const confirmDelete = React.useContext(ContentApi).confirmDelete;
  const deleteHandler = () => confirmDelete()
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography align='center' id="modal-modal-title" variant="h6" component="h2">
            Are you Sure 
          </Typography>
        <Stack direction='row' spacing={2} mt={5} sx={{justifyContent: 'space-between'}}>
            <Button variant='contained' endIcon={<Cancel/>} 
            onClick={handleClose} color='info' >Cancel</Button>
            <Button variant='contained' endIcon={<Delete/>}
             color='error' onClick={deleteHandler} disabled={isDeleting} >{isDeleting ? 'Deleting...' : 'Delete'}</Button>
        </Stack>
        </Box>
      </Modal>
    </div>
  );
}
