import React, {useState} from 'react';
import ContentApi from "./ContentApi";

const ContextProvider = (props) => {
    const [isAdding, setIsAdding] = useState(false);
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [postId, setPostId] = useState(null);
    const openModal = (postId) => {
        setPostId(postId)
        setModalIsOpen(true)
    }
    const closeModal = () => {
        setPostId(null)
        setModalIsOpen(false)
        setIsDeleting(false)
    }
    const confirmDelete = () => {
        setIsDeleting(true)
    }
    const closeSnackBar = () => {
        setOpen(false)
        setMessage('')
    }
    const startSnackBar = (message, severity) => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true)
    }
    const addNewMapHandler = () => {
        setIsAdding(curVal => !curVal);
    }
    const context = {
        isAdding,
        startSnackBar,
        closeSnackBar,
        open,
        message,
        severity,
        isDeleting,
        openModal,
        closeModal,
        modalIsOpen,
        postId,
        confirmDelete,
        addNewMapHandler
    }
    return (
        <ContentApi.Provider value={context}>
            {props.children}
        </ContentApi.Provider>
    )
};

export default ContextProvider;