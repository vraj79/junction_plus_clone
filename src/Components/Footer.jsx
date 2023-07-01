import React from 'react'
import { Container, Box, HStack, VStack, Link, Heading, Text, Stack, Image, Center } from '@chakra-ui/react'
import { FaTelegramPlane } from 'react-icons/fa'
import { GrTwitter } from "react-icons/gr"
import { RiLinkedinFill } from "react-icons/ri"

const Footer = () => {
    return (
        <>
            <Container maxWidth="100%" color={"white"} p="40px 0" position={'relative'}>
                <Box display="flex" w="80%"  m="auto" justifyContent='space-between' flexDirection={["column", "column", "column", "row"]} order="2">
                    <Box w={["100%", "100%","100%", "45%"]}>
                        <Box ><Image src='https://i.ibb.co/fvW8PGm/logo-6.png' width={'80%'} /></Box>
                        <HStack mt="30px" fontSize="30px" display={'flex'}>
                            <Link href='#'>
                                {<FaTelegramPlane />}
                            </Link>
                            <Link href=''>
                                {<GrTwitter />}
                            </Link>
                            <Link>
                                {<RiLinkedinFill />}
                            </Link>

                        </HStack>

                    </Box>

                    {/* <Box w="25%" ></Box> */}

                    <HStack  Box w={["100%", "100%","100%", "45%"]} justifyContent="space-between" alignItems={'top'} order="1">

                        <VStack alignItems={'left'} fontSize="20px" letterSpacing="2px" color={'gray'} w="50%">
                            <Heading mb="20px" fontSize={'30px'}>Movies</Heading>

                            <Link href='https://gowatchseries.ch/black-adam-episode-0'>Black Adam</Link>
                            <Link href='https://gowatchseries.ch/troll-episode-0'>Troll</Link>
                            <Link href='https://gowatchseries.ch/hex-2022-episode-0'>Hex</Link>
                            <Link href='https://gowatchseries.ch/the-woman-king-episode-0'>The Woman King</Link>
                            <Link href='https://gowatchseries.ch/night-at-the-museum-kahmunrah-rises-again-episode-0'>Night at Museum</Link>

                        </VStack>
                        <VStack alignItems={'left'} fontSize="20px" letterSpacing="2px" color={'gray'} w="50%" >
                            <Heading mb="20px" fontSize={'30px'}>Shows</Heading>
                            <Link href={'https://gowatchseries.ch/wednesday-season-1-episode-1'}>Wednesday</Link>
                            <Link href={'https://gowatchseries.ch/chainsaw-man-season-1-episode-1'}>Chainsaw Man</Link>
                            <Link href={'https://gowatchseries.ch/money-heist-korea-joint-economic-area-season-1-episode-1'}>Money Heist: Korea</Link>
                            <Link href={'https://gowatchseries.ch/willow-season-1-episode-1'}>Willow</Link>
                            <Link href={'https://gowatchseries.ch/house-of-the-dragon-season-1-episode-1'}>House of the Dragon</Link>
                        </VStack>
                    </HStack>
                </Box>
                <Center textAlign='center'>
                    <Text w="80%" fontSize={'lg'} mt="30px">
                        © 2022 Junction Plus Private Limited. All rights reserved
                    </Text>

                </Center>
            </Container>
        </>
    )
}

export default Footer