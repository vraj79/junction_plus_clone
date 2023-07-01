import { Image, Text,Box, Heading } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const CastSlider = ({profile_path,name,character}) => {
    return (
        <Link>
            <Box  h="260px" w="150px"  
            overflow="hidden" borderRadius="10px" 
            box-shadow= "box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;"
            border="1px solid gray"
            >
           
                <Box maxHeight="180px" overflow="hidden">
                    <Image src={`https://image.tmdb.org/t/p/w154/${profile_path}`}/>
                </Box>
                <Box p="5px"  w="100%">
                    <Text fontWeight="700" _hover={{color:" rgb(156, 156, 156);"}} fontSize={["8px", "10px", "12px", "14px"]}>{name}</Text>
                    <Text  fontSize={["6px", "8px", "10px", "14px"]}>{character}</Text>
                </Box>
            </Box>
        </Link>
    )
}

export default CastSlider