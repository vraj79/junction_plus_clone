import { Button, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { Box, Container, Heading, Image, Text } from "@chakra-ui/react"
import { BsList, BsFillBookmarkFill, BsPlayFill } from "react-icons/bs"
import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineFavorite, MdGraphicEq } from "react-icons/md"
import { useParams } from 'react-router-dom'
import axios from "axios"
import CastSlider from '../Components/CastSlider'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import CommonSlider from "../Components/CommonSlider"
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react'

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import Reviews from '../Components/Reviews'

const Details = () => {
  const { id } = useParams();
  const [selectedMovieData, setSelectedMovieData] = useState({})
  const [movieRecommendation, setMovieRecommendation] = useState([])
  const [arrayOfGenre, setArrayOfGenre] = useState([])
  const [movieReview, setMovieReview] = useState([])
  const [youtubeKey, setYoutubeKey] = useState([])
  const [yearValue, setYearValue] = useState([])
  const [castData, setCastData] = useState([])
  const cardSlider = useRef(null)

  const { isOpen, onOpen, onClose } = useDisclosure()

  //TODO:- CALLING THE API WITH THE PERTICULAR MOVIE OR SHOW'S ID FOR GETTING MORE INFOMATION
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=26b4b6b67e3c0341ce0cf1dc7ce746d9&language=en-US`)
      .then((res) => {
        setSelectedMovieData(res.data)
        setYearValue(res.data.release_date.split("-"))
        let genreArray = []
        res.data.genres.map((ele) => genreArray.push(ele.name))
        setArrayOfGenre(genreArray)
      })
      .catch((err) => console.log(err));

    //* HERE WE ARE GETTING THE CAST DETAILS OF THE SELECTED MOVIE
    axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=26b4b6b67e3c0341ce0cf1dc7ce746d9&language=en-US`)
      .then((res) => {
        setCastData(res.data.cast)
      })
      .catch((err) => console.log(err));

    //* GETTING YOU TUBE KEY FROM MOVIE DB API 
    axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=26b4b6b67e3c0341ce0cf1dc7ce746d9&language=en-US`)
      .then((res) => setYoutubeKey(res.data.results))
      .catch((err) => console.log(err));


    // https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=<<api_key>>&language=en-US&page=1
    axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=26b4b6b67e3c0341ce0cf1dc7ce746d9&language=en-US`)
      .then((res) => setMovieRecommendation(res.data.results))
      .catch((err) => console.log(err));


    //* GETTING THE REVIEW OF THE MOVIE
    axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=26b4b6b67e3c0341ce0cf1dc7ce746d9&language=en-US&page=1`)
      .then((res) => setMovieReview(res.data.results))
      .catch((err) => console.log(err));

  }, [id])



  // movieReview


  //TODO:- GET THE TRAILER OF THE SELECTED VIDEO

  const getMovietrailer = () => {
    onOpen()
  }


  //TODO:- SCROLLING THE CAST SLIDER;

  const getSliderValue = (val) => {
    let width = (val / 100) * (Math.abs(cardSlider.current?.clientWidth - (castData.length * 150) + (castData.length * 25)))
    // Multiply the with of the card number with their total qauntity
    cardSlider.current.scrollLeft = width;
  }



  //TODO:- GETTING THE GENRE 
  return (
    <>
      <Container
        maxWidth="100%"
        p="0"
      >
        <Navbar />
        <Box
          position="relative"
          w="100%"
          height={["200px", "270px", "400px", "600px"]}
          display="flex"
          alignItems="center"
          color="rgb(234,234,234)"
        >
          <Box position='absolute' top="0" left="0" height={["200px", "270px", "400px", "600px"]} w="100%" filter="blur(3px)"
            backgroundImage={`url(https://image.tmdb.org/t/p/original/${selectedMovieData.backdrop_path})`}
            bgRepeat="no-repeat"
            bgSize="cover"
          ></Box>
          <Box
            px={["0", "5", "10", "12"]}
            display="flex"
            justifyContent='space-between'
            alignItems='center'
          >

            {/* First Child  */}
            <Box
              w='28%'
              h="100%"
              bg='black'
              // p="20px 0"
              display='flex'
              alignItems='center'
              borderRadius='10px'
              zIndex='10'

            >
              <Image src={`https://image.tmdb.org/t/p/original/${selectedMovieData.poster_path}`} borderRadius="10px" />
            </Box>

            {/* Second Child */}
            <Box
              // border='10px solid green'
              w="68%"
              p="20px 0"
              zIndex='10'
              display="flex"
              flexDirection="column"
              gap={["0", "5px", "10px", "15px"]}

            >
              <Box>
                <Heading fontSize={["18px", "20px", "25px", "35px"]}>
                  {selectedMovieData.title} {`(${yearValue[0]})`}
                </Heading>
                <Text color=" rgb(247, 210, 210)" fontSize={["10px", "12px", "14px", "16px"]}>{`${selectedMovieData.release_date} / ${arrayOfGenre.join(",")} / ${selectedMovieData.runtime}m  `}</Text>
              </Box>
              <Box display='flex' justifyContent="space-between" alignItems="center" width={["100%", "90%", "85%", "80%"]}>
                <Box
                  borderRadius='50%'
                  bgColor="rgb(45,45,45)"
                  _hover={{ transformsScale: "1.5", cursor: "cursor" }}
                >
                  <CircularProgress
                    m="3px"
                    size={["25px", "40px", "50px", "60px"]}
                    color={Math.floor(selectedMovieData.vote_average * 10) > 70 ? "green" : Math.floor(selectedMovieData.vote_average * 10) > 30 ? "yellow" : "red"} value={Math.floor(selectedMovieData.vote_average * 10)}

                  >
                    <CircularProgressLabel>{Math.floor(selectedMovieData.vote_average * 10)}%</CircularProgressLabel>
                  </CircularProgress>
                </Box>
                <Box
                  bgColor='rgb(45,45,45)'
                  borderRadius='50%'
                  w={["20px", "30px", "45px", "50px"]}
                  h={["20px", "30px", "45px", "50px"]}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  _hover={{ fontWeight: 'semibold', color: 'gray' }}
                ><BsList fontSize={["12px", "14px", "18px", "20px"]} /></Box>
                <Box
                  bgColor='rgb(45,45,45)'
                  borderRadius='50%'
                  w={["20px", "30px", "45px", "50px"]}
                  h={["20px", "30px", "45px", "50px"]}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  _hover={{ fontWeight: 'semibold', color: 'gray' }}
                ><MdOutlineFavorite fontSize={["12px", "14px", "18px", "20px"]} /></Box>
                <Box
                  bgColor='rgb(45,45,45)'
                  borderRadius='50%'
                  w={["20px", "30px", "45px", "50px"]}
                  h={["20px", "30px", "45px", "50px"]}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  _hover={{ fontWeight: 'semibold', color: 'gray' }}
                ><BsFillBookmarkFill fontSize={["12px", "14px", "18px", "20px"]} /></Box>
                <Button
                  border='none'
                  bg='transparent'
                  onClick={getMovietrailer}
                  _hover={{ fontWeight: 'semibold', color: 'gray' }}
                ><BsPlayFill />Play Trailer</Button>
              </Box>
              <Text
                _hover={{ color: "gray" }}
              >{selectedMovieData.tagline}</Text>
              <Box>
                <Text fontSize={["14px", "16px", "18px", "22px"]} fontWeight="600" display={["none", "none", "block", "block"]}>Overview</Text>


                <Popover placement='top-start' >
                  <PopoverTrigger>
                    <Button

                      display={["block", "block", "none", "none"]}
                      h={["20px", "30px", "25px"]}
                      fontSize={["10px", "12px", "14px", "16px"]}
                      bg="rgb(45,45,45)">

                      Overview

                    </Button>

                  </PopoverTrigger>
                  <PopoverContent bg="rgb(45,45,45)" p="5px">
                    <PopoverArrow />
                    <PopoverCloseButton bg="black" />
                    <PopoverBody >
                      {selectedMovieData.overview}
                    </PopoverBody>
                  </PopoverContent>
                </Popover>



                <Text color=" rgb(247, 210, 210);" fontSize={["10px", "12px", "14px", "16px"]} display={["none", "none", "block", "block"]} >{selectedMovieData.overview}</Text>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box position="relative"
          // border="5px solid blue"
          // h="400px"
          px={["0", "5", "10", "12"]}
          color={'rgb(234,234,234)'}
        >
          <Box display="flex" alignItems="center" justifyContent="left" h="100px">
            <Heading>Cast</Heading>
          </Box>
          <Box display="flex" gap="0 15px" overflow="hidden" ref={cardSlider}>
            {
              castData.map((ele) => {
                return <CastSlider
                  key={ele.carst_id}
                  known_for_department={ele.known_for_department}
                  name={ele.name}
                  character={ele.character}
                  profile_path={ele.profile_path}
                  castId={ele.cast_id}
                />
              })

            }
          </Box>

          <Box display="flex" alignItems="center" justifyContent="center" h="70px">
            <Slider aria-label='slider-ex-4' defaultValue={0} onChange={(val) => getSliderValue(val)} width="60%">
              <SliderTrack bg='red.100'>
                <SliderFilledTrack bg='tomato' />
              </SliderTrack>
              <SliderThumb boxSize={6}>
                <Box color='tomato' as={MdGraphicEq} />
              </SliderThumb>
            </Slider>

          </Box>

        </Box>

        {/* Review section  */}
        <Box position='relative'>
        <Reviews reviewData={movieReview}/>
        </Box>


        {/* Movie recommendations slider  */}
        <Box >
          <Box
            px={["0", "5", "10", "12"]}
            color={'rgb(234,234,234)'}
            display="flex" alignItems="center" justifyContent="left" h="100px">
            <Heading>Recommendations</Heading>
          </Box>
          <Box>
            {
              <CommonSlider popularMovieData={movieRecommendation} />
            }
          </Box>

        </Box>

        <Modal isOpen={isOpen} onClose={onClose} size="el">
          <ModalOverlay />
          <ModalContent bg="black">
            <ModalHeader>{selectedMovieData.title}</ModalHeader>
            <ModalCloseButton zIndex="100" color={'white'} />
            <ModalBody display={"flex"} justifyContent="center">
              <iframe width="965" height="450" src={`https://www.youtube.com/embed/${youtubeKey[0]?.key}?autoplay=1&mute=1`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; 
                        autoplay=true;
                         picture-in-picture"
                allowfullscreen="true" >
              </iframe>
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Footer />
      </Container>
    </>
  )
}

export default Details