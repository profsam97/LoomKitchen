import React from 'react';

const ContentApi = React.createContext({
    isAdding: false,
    addNewMapHandler: () => {},
    open: false,
    severity: 'warning',
    message: '',
    startSnackBar: () => {},
    closeSnackBar: () => {},
    isDeleting: false,
    openModal: () => {},
    closeModal: () => {},
    modalIsOpen: false,
    postId: null,
    confirmDelete: () => {}
})
export default ContentApi;