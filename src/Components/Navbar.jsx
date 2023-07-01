import React, { useContext, useReducer, useState, useRef } from 'react'
import {
    Box,
    Flex,
    Avatar,
    HStack,
    IconButton,
    useDisclosure,
    useColorModeValue,
    Image,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    VStack,
    Container,
    Heading

} from '@chakra-ui/react';


import axios from "axios"
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Collapse, Center } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, SearchIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { MdManageAccounts } from 'react-icons/md';
import { AuthContext } from '../Context/AuthContext/AuthContextProvider';
import { Link } from "react-router-dom"
import { signOut, getAuth } from 'firebase/auth';

//! COMPONENTS IMPORTS
import Login_Signup_Modal from './Login_Signup_Modal';
import Nav_Reducer from './Nav_Reducer';
import Loader from './Loader';
import SearchCard from './SearchCard';


const Nav_InicialState =
{
    login_logout_toggle_state: false,
    account_toggle_state: false
}


const Navbar = () => {
    const [Nav_State, dispatch] = useReducer(Nav_Reducer, Nav_InicialState)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loginToggle, setLoginToggle] = useState(false);
    const { state,UserLogout } = useContext(AuthContext)
    const inputbox = useRef(null)
    const [searchBoxToggle, setSearchBoxToggle] = useState(false)
    const [searchedMovieData, SetSearchedMovieData] = useState([])
    const [loading, setLoading] = useState(false)


    //? NAVBAR FUNCTIONS

    const Login_Toggle = () => {
        dispatch({ type: "LOGIN_TOGGLE", payload: { login_logout_toggle_state: true } })
    }

    const Logout_Toggle = () => {
        // const auth = getAuth();
        // signOut(auth)
        //     .then((res) => console.log(res))
        //     .catch((err) => console.log(err));
        UserLogout();
        dispatch({ type: "LOGOUT_TOGGLE", payload: { login_logout_toggle_state: false } })
    }



    //TODO:- IMPLIMENTING THE SEARCH FUNCTIONALITY;



    const getSearchResult = (query) => {
        setLoading(true);
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=26b4b6b67e3c0341ce0cf1dc7ce746d9&query=${query}&page=1`)
            .then((res) => {
                SetSearchedMovieData(res.data.results)
                setLoading(false)

            })
            .catch((err) => console.log(err))
    }
    let timer;
    const debounce = (func, delay) => {

        clearTimeout(timer)

        timer = setTimeout(() => {
            func(inputbox.current.value)
        }, delay)

    }

    const handleSearch = () => {
        debounce(getSearchResult, 500)
    }

    const changeStateOfSearchModal = () =>{
        setSearchBoxToggle(false)
    }


    //* RETURN AREA
    return (
        <>

            <Box bg={useColorModeValue('black', 'white')} px={["5", "10", "12"]} position="relative" zIndex="100" w="100%">
                <Flex h={12} alignItems={'center'} justifyContent={'space-between'}>

                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={() => isOpen ? onClose() : onOpen()}
                        bg='none'
                        color='blue'

                    />
                    <Link to="/">
                    <Box h={12} display="flex" justifyContent={'center'} alignItems={'center'} >
                        <Image src="https://i.ibb.co/fvW8PGm/logo-6.png" h="35px" display={["none", "none", "block"]} />
                        <Image src="https://i.ibb.co/ts842G5/logo-7.png" h='35px' display={{ md: 'none' }} />
                    </Box>
                    </Link>
                    <HStack >
                        <InputGroup display={["none", "none", "block"]}>
                            <InputLeftElement
                                pointerEvents='none'
                                h="30px"

                                children={<SearchIcon color='gray.300' w={3} h={3} />}
                            />
                            <Input
                                w="200px"
                                h="30px"
                                display={["none", "none", "block"]}
                                color="white"
                                type='tel' placeholder='Search'
                                onChange={handleSearch}
                                onClick={() => setSearchBoxToggle(true)}
                                ref={inputbox}
                            />
                            <InputRightElement
                                display={searchBoxToggle ? "block" : "none"}
                                pointerEvents='cursor'
                                h="30px"
                                onClick={(e) => {
                                    inputbox.current.value = ""

                                    setSearchBoxToggle(false)
                                }}
                                children={<SmallCloseIcon color='gray.300' />}
                            />
                        </InputGroup>
                        {/* https://cdn.pixabay.com/photo/2013/07/12/15/24/woman-149861__340.png */}
                        <Box h={12} display="flex" justifyContent={'center'} alignItems={'center'} onClick={() => setLoginToggle(!loginToggle)} >
                            <Avatar size=" sm" src={state.isAuth?"https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png":null} h="35px" />
                        </Box>
                    </HStack>








                </Flex>
            </Box>
            <Collapse in={isOpen} animateOpacity display={{ md: 'none' }} >
                <Box display={isOpen ? "block" : "none"} bg='black' h="80px" w="100%" >
                    <Center display='flex' justifyContent="center" alignItems="center" border="1px solid red" h="100%">
                        <InputGroup border='none' borderBottom="1px solid gray" w={'85%'} display={{ md: 'none' }} >
                            <InputLeftElement
                                pointerEvents='none'
                                h="30px"

                                children={<SearchIcon color='gray.300' w={3} h={3} />}
                            />
                            <Input

                                h="30px"
                                display={{ md: 'none' }}
                                color="white"
                                type='tel' placeholder='Search'
                                border="none"
                                outline="none"
                                px={10}

                            />
                        </InputGroup>
                    </Center>
                </Box>
            </Collapse>

            {/* TODO:- Adding the Transition box for login / signin and account details option  */}
            <Collapse in={loginToggle} animateOpacity  >
                <Box
                    // p='20px'
                    zIndex="200"
                    color='white'
                    mt='2'
                    bg='#404951'
                    rounded='md'
                    shadow='md'
                    position="absolute"
                    right={["5", "10", "12"]}
                    opacity="0.7"
                    w="200px"


                >
                    <VStack>

                        {state.isAuth ?

                            <Button w="100%" rightIcon={<AiOutlineLogout />} variant='outline' display="flex" justifyContent="space-between" alignItems="center" border="none" onClick={() => Logout_Toggle()}>
                                Logout
                            </Button>

                            :
                            <Button w="100%" rightIcon={<AiOutlineLogin />} variant='outline' display="flex" justifyContent="space-between" alignItems="center" border="none" onClick={() => Login_Toggle()}>
                                Login
                            </Button>
                        }

                        <Link to="/account" style={{ width: "100%" }}>
                            <Button w="100%" rightIcon={<MdManageAccounts />} variant='outline' display="flex" justifyContent="space-between" alignItems="center" border="none">
                                Account
                            </Button>
                        </Link>
                    </VStack>
                </Box>
            </Collapse>

            {Nav_State.login_logout_toggle_state ? <Login_Signup_Modal /> : null}

            <Container maxWidth="100%" h={'100vh' }
             bg="rgba(0, 0, 0, 0.835)"
            display={searchBoxToggle ? "block" : 'none'} 
            position="absolute" top="45px" left="auto" zIndex="100" padding={0}
            >
                <Heading >
                    <Center>
                        {
                            loading ? <Loader /> : null
                        }
                    </Center>
                </Heading>

                <Box  w="60%" m="auto" height={'100vh'} overflowY="scroll" >
                    {
                        searchedMovieData.map((ele) => {
                            return <SearchCard key={ele.id} 
                            title={ele.title} release={ele.release_date} rating={ele.vote_average} 
                            poster={ele.poster_path} language={ele.original_language} genre={ele.genre_id}
                            id={ele.id} overView={ele.overview} changeStateOfSearchModal={changeStateOfSearchModal}/>
                        })
                    }
                </Box>

            </Container>


        </>
    )
}

export default Navbar