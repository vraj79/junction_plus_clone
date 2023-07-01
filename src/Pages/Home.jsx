import React, { useEffect, useState } from 'react'
import HomePageCarousel from '../Components/HomePageCarousel'
import axios from "axios"
import CommonSlider from '../Components/CommonSlider';
import { Box, Container, Text } from '@chakra-ui/react'
import { Tabs, TabList, Tab } from '@chakra-ui/react'
import Navbar from '../Components/Navbar';
import GetTrailers from '../Components/Youtube_Trailers/GetTrailers';
import Footer from '../Components/Footer';

const Home = () => {

  //* THIS IS THE STATES DECLARING ARE.
  const [popularMovieData, setPupularMovieData] = useState([]);
  const [tvShowsData, setTvShowsData] = useState([]);



  // GET THE DATA OF POPULAR MOVIES FOR SLIDER ONE.

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=26b4b6b67e3c0341ce0cf1dc7ce746d9&language=en-US&page=1`)
      .then((res) => {
        setPupularMovieData(res.data.results)
      })
      .catch((err) => console.log(err));



    axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=26b4b6b67e3c0341ce0cf1dc7ce746d9&language=en-US&page=1`)
      .then((res) => {
        setTvShowsData(res.data.results)
      })
      .catch((err) => console.log(err))

  }, [])


  // HERE WE ARE CREATING A FUNCTION WHO WILL ACCEPT THE TYPE IN WHICH USER WANTS TO SEE MOVIES 

  const handleStateAndTypeOfMovie = (val) => {

    let query = ""
    if (val === "Popular") {
      query = "popular";
    }
    else if (val === "In Threatre") {
      query = "now_playing";
    }
    else if (val === "Top Rated") {
      query = "top_rated"
    }
    axios.get(`https://api.themoviedb.org/3/movie/${query}?api_key=26b4b6b67e3c0341ce0cf1dc7ce746d9&language=en-US&page=1`)
      .then((res) => {
        setPupularMovieData(res.data.results)
      })
      .catch((err) => console.log(err))

  }

  // HERE WE ARE CREATING A FUNCTION WHO WILL ACCEPT THE TYPE IN WHICH USER WANTS TO SEE THE TV SHOWS

  const handleStateAndTypeOfTVShows = (val) => {
    let query = ""
    if (val === "Popular") {
      query = "popular"
    }
    else if (val === "Top Rated") {
      query = "top_rated"
    }
    else if (val === "On The Air") {
      query = "on_the_air";
    }
    else if (val === "Airing Today") {
      query = "airing_today"
    }

    axios.get(`https://api.themoviedb.org/3/tv/${query}?api_key=26b4b6b67e3c0341ce0cf1dc7ce746d9&language=en-US&page=1`)
      .then((res) => {
        setTvShowsData(res.data.results)
      })
      .catch((err) => console.log(err))

  }



  return (
    <div>

      <Navbar />
      <HomePageCarousel />
      <Container maxWidth="100%" p={0}>
        <Box padding="3% 0" position="relative">
          <Container maxWidth="100%" px={["5", "10", "12"]}>
            <Tabs size='md' variant='enclosed' padding="20px 0">
              <TabList >
                <Text w={["100", "150px", "200px"]} fontWeight="700" fontSize={["16px", "18px", "25px"]} color="rgb(234,234,234)" display="flex" justifyContent="left" alignItems="center"  >What's Popular</Text>
                <Tab onClick={() => handleStateAndTypeOfMovie("Popular")} color="rgb(234,234,234)">Popular</Tab>
                <Tab onClick={() => handleStateAndTypeOfMovie("Top Rated")} color="rgb(234,234,234)" >Top Rated</Tab>
                <Tab onClick={() => handleStateAndTypeOfMovie("In Threatre")} color="rgb(234,234,234)" >In Theatres</Tab>
              </TabList>
            </Tabs>
          </Container>
          <CommonSlider popularMovieData={popularMovieData} />
        </Box>

        {/*  THIS SECTION FOR TV SHOWS */}

        <Box position="relative">
          <Container maxWidth="100%" px={["5", "10", "12"]}>
            <Tabs size='md' variant='enclosed' padding="20px 0">
              <TabList >
                <Text w={["100px", "150px", "fit-content"]} fontWeight="700" fontSize={["16px", "18px", "25px"]} color="rgb(234,234,234)" display="flex" justifyContent="left" alignItems="center" paddingRight={"10px"} >What's New On TV</Text>
                <Tab onClick={() => handleStateAndTypeOfTVShows("Popular")} color="rgb(234,234,234)">Popular TV Shows</Tab>
                <Tab onClick={() => handleStateAndTypeOfTVShows("Top Rated")} color="rgb(234,234,234)" >Top Rated</Tab>
                <Tab onClick={() => handleStateAndTypeOfTVShows("On The Air")} color="rgb(234,234,234)" >On the Air</Tab>
                <Tab onClick={() => handleStateAndTypeOfTVShows("Airing Today")} color="rgb(234,234,234)" >Airing Today</Tab>
              </TabList>
            </Tabs>
          </Container>
          <CommonSlider popularMovieData={tvShowsData} />
        </Box>


        {/*  GETTING YOUTUBE TRAILERS OF TRENDING MOVIES  */}

        <Box position="relative">

          <GetTrailers />
        </Box>
        <Footer />
      </Container>


    </div>
  )
}

export default Home