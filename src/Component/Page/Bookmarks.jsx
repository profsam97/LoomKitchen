import React, {useContext, useEffect, useState} from 'react';
import Layout from "../Layout/Layout";
import {useGetAllMap} from "../../Hooks/Index";
import Masonry from "react-masonry-css";
import Cards from "../Layout/Cards";
import axios from "axios";
import Grid from "@mui/material/Grid";
import ContentApi from "../../Context/ContentApi";
import { CircularProgress } from '@mui/material';

const Bookmarks = () => {
    const [initialBookmark, setInitialBookmark] = useState([])
    const [isSuccess , setIsSuccess] = useState(false)
    const getAllMap =  (data)  => {
        setIsSuccess(true)
        let initialData = [];
        for (const index in data){
                const hello = {
                    id: index,
                    name: data[index].name,
                    isBookmark: data[index].isBookmark
                }
            initialData.push(hello)
        }
        const filteredBookmark = initialData.filter(data => data.isBookmark === true);
        setInitialBookmark(filteredBookmark);
    }
 const {isLoading, isFetching} =   useGetAllMap(getAllMap);
    const openModal = useContext(ContentApi).openModal;
    const startSnackBar = useContext(ContentApi).startSnackBar;
    const isDeleting = useContext(ContentApi).isDeleting;
    const postId = useContext(ContentApi).postId;
    const closeModal = useContext(ContentApi).closeModal;
    const handleDelete =  id => {
        openModal(id);
    }
    const confirmDelete = async () => {
        if(postId){
        let message;
        let severity;
        startSnackBar(message = 'Successfully Deleted ', severity = 'error')
        const filteredData = initialBookmark.filter(data => data.id !== postId);
        setInitialBookmark(filteredData)
        const response = await axios.delete(`https://loop-bfc9d-default-rtdb.firebaseio.com/maps/${postId}.json`)
        closeModal()
    }else{
        closeModal()
    }
    }
    const bookmarkData ={
        isBookmark: false
    }
    const snackBar = useContext(ContentApi).startSnackBar;
    const bookmarkHandler = async (id) => {
        let message;
        let severity;
        snackBar(message = 'Removed from Bookmark', severity = 'warning')
        const newFilteredData = initialBookmark.filter(data => data.id !== id)
        setInitialBookmark(newFilteredData);
        const response = await axios.patch(`https://loop-bfc9d-default-rtdb.firebaseio.com/maps/${id}/.json`, bookmarkData)
    }
        useEffect(() => {
        if(isDeleting){
        confirmDelete()
        }
    }, [isDeleting])
        return (
           <Layout>
               {isSuccess && initialBookmark?.length === 0 && <h2>Such Empty!</h2>}
                {isFetching && <CircularProgress mt={1}/>}
               {!isLoading &&
               <Grid container spacing={2} mt={1}>
                   {initialBookmark.map(data => {
                       return (
                           <Grid item xs={12} sm={6} md={5} lg={4} key={data.id}>
                               <Cards  {...data} handleDelete={handleDelete} handleBookmark={bookmarkHandler} />
                           </Grid>
                       )
                   })}
               </Grid>
               }
           </Layout>
        );
}

export default Bookmarks;