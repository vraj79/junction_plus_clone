import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const GenreUniversal = createContext()


const GenreData = ({children}) => {
    const [genreData, setGenreData] = useState([]);

    useEffect(() => {

        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=26b4b6b67e3c0341ce0cf1dc7ce746d9&language=en-US`)
            .then((res) => setGenreData(res.data.genres,))
            .catch((err) => console.log(err))

    }, [])


    return (
        <GenreUniversal.Provider value={{genreData}}>{children}</GenreUniversal.Provider>
    )
}

export default GenreData