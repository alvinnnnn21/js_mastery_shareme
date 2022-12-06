import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from "../client";
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from "./MasonryLayout";
import Spinner from './Spinner';

const Feed = () => {

    const [loading, setLoading] = useState(true);
    const [pin, setPin] = useState(null)
    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);

        if(categoryId)
        {
            const query = searchQuery(categoryId); 

            client.fetch(query)
                .then((res) => {
                    setPin(res);
                    setLoading(false);
                })
        }   
        else 
        {
            client.fetch(feedQuery)
                .then((res) => {
                    setPin(res);
                    setLoading(false);
                })
        }
    }, [categoryId]);

    if(loading) return <Spinner message="We are adding new ideas to your feed !"/>

    if(!pin?.length) return <h2>No Pins Available</h2>

    return (
        <div>
            {pin && <MasonryLayout pins={pin}/>}
        </div>
    )
}

export default Feed
