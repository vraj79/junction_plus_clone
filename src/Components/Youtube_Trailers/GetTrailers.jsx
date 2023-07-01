import React, { useEffect, useRef, useState } from 'react'
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Box,
    Text,
    Container,

} from '@chakra-ui/react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,

} from '@chakra-ui/react'



import { MdGraphicEq } from "react-icons/md"
import styles from "./GetTrailers.module.css"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import axios from "axios"
import YtVideoCard from './YtVideoCard'




const GetTrailers = () => {
    const thumbnails = useRef(null)
    const [ytData, setYtData] = useState([])
    const boxBgImage = useRef(null)
    const [videoStateId, setVideoId] = useState()

    const clickNext = (val) => {

        let width = (val / 100) * (Math.abs(thumbnails.current?.clientWidth - 6300)) // Multiply the with of the card number with their total qauntity

        thumbnails.current.scrollLeft = width;

    }

    useEffect(() => {
        axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=hollywood movie trailer&key=AIzaSyAJ_l-qloiu0uwUZqtNkRS3PBx3LZAnDeA`)
            .then((res) => {
                setYtData(res.data.items)
            })
            .catch((err) => console.log(err));
    }, [])



    const handleYTrequest = (query) => {


        //TODO:- GET THE DATA FROM YOUTUBE API

        axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=AIzaSyAJ_l-qloiu0uwUZqtNkRS3PBx3LZAnDeA`)
            .then((res) => {
                setYtData(res.data.items)
            })
            .catch((err) => console.log(err));
    }

    const handleMouseOver = (val) => {
        boxBgImage.current.style.backgroundImage = `url(${val})`;
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    const OpenYtModal = (val) => {
        setVideoId(val)
        onOpen()
    }


    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const [overlay, setOverlay] = React.useState(<OverlayOne />)



    return (
        <Box >
            <Box ref={boxBgImage} className={styles.ytMain}></Box>
            <Box className={styles.ytMainContainer} >

                <Box position="relative">
                    <Container maxWidth="100%" px={["5", "10", "12"]}>
                        <Tabs size='md' variant='enclosed' padding="20px 0">
                            <TabList >
                                <Text
                                    w={["100px", "150px", "fit-content"]}
                                    fontWeight="700" fontSize={["15px", "20px", "25px"]}
                                    color="rgb(234,234,234)" display="flex"
                                    justifyContent="left" alignItems="center"
                                    paddingRight={["2px", "5px", "10px"]} >
                                    Latest Trailers
                                </Text>

                                <Tab
                                    onClick={() => handleYTrequest("hollywood trending movie trailer")}
                                    color="rgb(234,234,234)"
                                    p={["0px", "1px", "2px", "20px"]}>
                                    Trending
                                </Tab>

                                <Tab
                                    onClick={() => handleYTrequest("apple tv trailer")}
                                    color="rgb(234,234,234)"
                                    p={["0px", "1px", "2px", "20px"]}
                                >
                                    Apple Tv+
                                </Tab>

                                <Tab
                                    onClick={() => handleYTrequest("netflix english trailer")}
                                    color="rgb(234,234,234)"
                                    p={["0px", "1px", "2px", "20px"]}>

                                    Netflix
                                </Tab>

                                <Tab
                                    onClick={() => handleYTrequest("paramount trailer 2022")}
                                    color="rgb(234,234,234)"
                                    p={["0px", "1px", "2px", "20px"]}
                                >
                                    Airing Today
                                </Tab>
                            </TabList>
                        </Tabs>
                    </Container>
                </Box>

                <Container maxWidth="100%" px={["5", "10", "12"]}>

                    <div className={styles.thumbnailsContainer} ref={thumbnails}>
                        {
                            ytData.map((ele) => {
                                return <YtVideoCard key={ele.id.videoId} onMouseOver={handleMouseOver} titleName={ele.snippet.title} videoId={ele.id.videoId} thumbnailImage={ele.snippet.thumbnails.high.url} playButoon={OpenYtModal} />
                            })
                        }

                    </div>
                </Container>

                <div>
                    <Slider aria-label='slider-ex-5' onChange={(val) => {
                        clickNext(val)

                    }} w="30%" defaultValue={0}>
                        <SliderTrack>
                            <SliderFilledTrack bg='tomato' />
                        </SliderTrack>
                        <SliderThumb boxSize={6}>
                            <Box color='tomato' as={MdGraphicEq} />
                        </SliderThumb>
                    </Slider>
                </div>
            </Box>

            <Modal isCentered isOpen={isOpen} onClose={onClose} size="el" >
                {overlay}
                <ModalContent bg={'black'}>
                    {/* <ModalHeader>Modal Title</ModalHeader> */}
                    <ModalCloseButton zIndex="100" color={'white'}/>
                    <ModalBody display={"flex"} justifyContent="center">
                        <iframe width="965" height="450" src={`https://www.youtube.com/embed/${videoStateId}?autoplay=1&mute=1`} 
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


        </Box>
    )
}

export default GetTrailers