import React from 'react'
import { Avatar, Box, Heading, Link, Text } from '@chakra-ui/react'

const ReviewCard = ({userName,content,created_at,updated_at,link,avatar_path,name}) =>
{
    let firstLetter=userName.split("");
    let splittedData=created_at.split("-");
    
    return (
        <Box
            // h="500px"
            display="flex"
            width={'100%'}
            mb="20px"
           
        >
             <Box
                        width={["20%","15%","10%"]}
                        height="100%"
                        display="flex"
                        justifyContent="right"
                        flexDirection='column'
                        alignItems='center'

                        >
                            {/* user are  */}
                            <Avatar src={avatar_path?`https://image.tmdb.org/t/p/w500${avatar_path}`:firstLetter[0]} mt="30px" size={["sl","sl","md","lg"]}/>
                            <Text m="20px" fontWeight='600' textDecoration='underline'
                            _hover={{color:"gray",cursor:"pointer"}}
                            >{userName}</Text>
                        </Box>
                        <Box
                        width="90%"
                        height="100%"
                        padding="30px"
                        >
                        <Text color={'gray'}>Featured Review</Text>
                        <Text 
                        fontWeight="700" 
                        fontSize={["15px","17px","22px","25px"]} 
                        color="cyan"
                        m="10px 0"
                        _hover={{color:"gray",cursor:"pointer",textDecoration:'underline'}}
                        >
                        {`A review by ${name?name:userName}`}</Text>
                        <Text color="gray" fontSize={'18'}>{`Written by ${userName} in ${splittedData[0]}`}</Text>
                        <Text mt={'20px'} letterSpacing="1px" noOfLines={["3","5","10","15"]}>{content}</Text>
                        <Link 
                        mt="20px" color={'gray'} 
                        textDecoration="underline"  
                        _hover={{cursor:'pointer',color:'cyan'}}
                        href={link}
                        >Read the on site</Link>
                        </Box>


        </Box>
    )
}

export default ReviewCard