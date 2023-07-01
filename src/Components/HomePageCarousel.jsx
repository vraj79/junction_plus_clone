import React, { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  Button,
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};



export default function HomePageCarousel() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  //TODO:- STATES AREA
  const [slider, setSlider] = React.useState(null);
  const [apiData, setApiData] = useState([])


  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });

  // This list contains all the data for carousels
  // This can be static or loaded from a server




  //TODO:- MAKING REQUEST TO GET DATA FROM MOVIEDB DATABASE FOR TRENDING MOVIES 

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=26b4b6b67e3c0341ce0cf1dc7ce746d9`)
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.log(err))
  }, []);



  return (
    <Box
      position={'relative'}
      height={'600px'}
      width={'full'}
      overflow={'hidden'}>
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}>
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}>
        <BiRightArrowAlt size="40px" />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {apiData.map((card, index) => (
          <Box
            key={card.id}
            height={'6xl'}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(https://image.tmdb.org/t/p/original/${card.backdrop_path})`}>
            {/* https://image.tmdb.org/t/p/w500/${apiData.backdrop_path} */}
            {/* This is the block you need to change, to customize the caption */}
            <Container maxWidth="100%" height="600px" position="relative"  >
              <Stack
                p="20px 20px"
                bgGradient='linear(to-bl, #fafafa00 70%, black)'
                px={12}
                textAlign="left"
                spacing={2}
                w={'fit-content'}
                position="absolute"
                bottom="0px"
                left={'0px'}
              // transform="translate(0, -50%)"
              >
                <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} color="rgb(235,235,235)">
                  {card.name ? card.name : card.title}
                </Heading>
                <Text fontSize={{ base: 'md', lg: 'lg' }} color="rgb(159,159,159)" fontWeight="700">
                  {`original language ${card.original_language}`}
                </Text>
                <Link to={`details/${card.id}`}>
                  <Button fontWeight="700" width={'200px'}>{`Go to ${card.media_type}`}</Button>
                </Link>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

