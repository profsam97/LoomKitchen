import React, {useContext, useEffect, useState} from 'react';
import Layout from "../Layout/Layout";
import {useGetAllMap} from "../../Hooks/Index";
import axios from "axios";
import Masonry from "react-masonry-css";
import Cards from "../Layout/Cards";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ContentApi from "../../Context/ContentApi";
import { CircularProgress } from '@mui/material';

const Home = ()  =>  {
    const [map, setMap] = useState([]);
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
        const filteredData = initialData.filter(data=> data.isBookmark === false);
        setMap(filteredData);
    }
    const isAdding = useContext(ContentApi).isAdding;
   const {isLoading, isFetching, data, refetch} = useGetAllMap(getAllMap);
    const snackBarData = {
        message: 'Successfully Deleted',
        severity: 'error'
    }
    const startSnackBar = useContext(ContentApi).startSnackBar;
    const openModal = useContext(ContentApi).openModal;
    const handleDelete = id => {
        openModal(id)
    }
    useEffect(() => {
        const clear =   setTimeout(()=> {
            refetch();
        },1000)
        return () => {
            clearTimeout(clear)
        }
    },[isAdding])
    const bookmarkData = {
        isBookmark: true
    }
    const isDeleting = useContext(ContentApi).isDeleting;
    const postId = useContext(ContentApi).postId;
    const closeModal = useContext(ContentApi).closeModal;
    const confirmDelete = async () => {
        if(postId){
        let message;
        let severity;
        startSnackBar(message = snackBarData.message, severity = snackBarData.severity)
        const filteredData = map.filter(data => data.id !== postId);
        setMap(filteredData)
        const response = await axios.delete(`https://loop-bfc9d-default-rtdb.firebaseio.com/maps/${postId}.json`)
        closeModal()
        }
    }
    useEffect(() => {
        if(isDeleting){
        confirmDelete()
        }
    }, [isDeleting])
    const snackBar = useContext(ContentApi).startSnackBar;
    const bookmarkHandler = async (id) => {
        let message;
        let severity;
        snackBar(message = 'Added to Bookmarks', severity = 'warning')
        const newFilteredData = map.filter(data => data.id !== id)
        setMap(newFilteredData);
        const response = await axios.patch(`https://loop-bfc9d-default-rtdb.firebaseio.com/maps/${id}/.json`, bookmarkData)
    }
        return (
            <Layout>
                {isSuccess && map?.length === 0 && <h2>Such Empty!</h2>}
                {isFetching && <CircularProgress mt={1}/>}
                {!isLoading &&
                    <Grid container spacing={4} mt={1}>
                    {map.map(data => {
                        return (
                            <Grid item sm={6} md={5} lg={4} key={data.id}>
                                <Cards  {...data} handleDelete={handleDelete} handleBookmark={bookmarkHandler} />
                            </Grid>
                        )
                    })}
                </Grid>
                }
            </Layout>
        );
}


export default Home;