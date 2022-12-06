import React, { useState, useEffect } from 'react'

import MasonryLayout from './MasonryLayout';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import Spinner from './Spinner';

const Search = ({searchKeyword, setSearchKeyword}) => {

    const[pins, setPins] = useState(null);
    const[loading, setLoading] = useState(false);

    useEffect(() => {
        if(searchKeyword)
        {
            setLoading(true);
        
            const query = searchQuery(searchKeyword.toLowerCase());

            client.fetch(query)
                .then((res) => {
                    setPins(res);
                    setLoading(false);
                })
        }   
        else
        {
            client.fetch(feedQuery)
                .then((res) => {
                    setPins(res);
                    setLoading(false);
                })
        }
    }, [searchKeyword])

    return (
        <div>
            {loading && <Spinner message="Search for pins..."/>}
            {pins?.length !== 0 && <MasonryLayout pins={pins}/>}
            {pins?.length === 0 && searchKeyword !== "" && !loading && (
                <div className="mt-10 text-center text-xl">
                    No Pins Found!
                </div>
            )}
        </div>
    )
}

export default Search