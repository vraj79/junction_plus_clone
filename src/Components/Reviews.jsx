import { Avatar, Box, Heading, Link, Text,Image } from '@chakra-ui/react'
import React from 'react'
import {
    Tab,
    Tabs,
    TabList,
    TabPanel,
    TabPanels
} from "@chakra-ui/react"
import ReviewCard from './ReviewCard'

const Reviews = ({reviewData}) => {
    
    
    return (
        <Box
            px={["0", "5", "10", "12"]}
            color={'rgb(234,234,234)'}
            width="100%"
        >
            <Tabs size='md' variant='enclosed'>
                <TabList>
                    <Tab>Review</Tab>
                    <Tab>Discusssions</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel 
                    p='0'
                    overflowY="scroll" 
                    h="100vh" 
                    width={'100%'}>

                    {
                        reviewData.map((ele)=>{
                                return <ReviewCard 
                                    userName={ele.author_details.username}
                                    content={ele.content}
                                    created_at={ele.created_at}
                                    updated_at={ele.updated_at}
                                    link={ele.url}
                                    avatar_path={ele.author_details.avatar_path}
                                    name={ele.author_details.name}

                                />    
                        })
                    }
                
                    </TabPanel>
                    <TabPanel  display='flex' alignItems={'center'}justifyContent="center">
                    <Image src="https://i.ibb.co/4s0bJ3c/Pngtree-flat-under-construction-sign-background-8801136.png"
                     w="30%"
                    />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default Reviews