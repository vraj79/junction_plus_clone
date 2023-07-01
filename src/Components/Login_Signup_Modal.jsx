import React, { useContext, useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Lorem,
  VStack,
  Image,
  Text,
  Center,
  InputGroup,
  Input,
  InputRightElement,
  Spacer,
  Stack,
  Box,
  Alert,
  Flex
} from '@chakra-ui/react'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { AiOutlineCloseCircle } from "react-icons/ai"

import { FcGoogle } from "react-icons/fc"
import { AuthContext } from '../Context/AuthContext/AuthContextProvider'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { AlertIcon } from '@chakra-ui/react'
import auth from './FirebaseAuthentication'
import { useNavigate } from 'react-router-dom'

// TODO:-  LOGIN AND SIGNUP MODAL (FOR GETTING DATA FROM USER)

function Login_Signup_Modal() {

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const [modalChange, setModalChange] = useState(true)
  const { state, UserLogin } = useContext(AuthContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [nameInput, setNameInput] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [theError, setTheError] = useState("")
  const navigate = useNavigate()
  const [tagsValue, setTagsValue] = useState({ name: "", email: "", password: "" })

  const [loginTagsValue, setLoginTagsValue] = useState({ email: "", password: "" })


  useEffect(() => {
    onOpen()
  }, [])


  const loginGetValue = () => {

    setLoading(true)
    let text = loginTagsValue.email


    if (loginTagsValue.email == "" && loginTagsValue.password == "") {
      setNameInput("Please enter your full name 'ex- Abhishek Ojha' ")
      setEmailInput("Please enter your email 'ex- abhishekojhe@gmail.com")
      setPasswordInput("Please enter your password 'ex- Abhishek6543@'")
      setLoading(false)
      return;
    }

    else if (loginTagsValue.email == "" && loginTagsValue.password !== "") {
      setEmailInput("Please Enter Your Email 🙏")
      setPasswordInput("")
      setLoading(false)
      return;
    }
    else if (loginTagsValue.email !== "" && loginTagsValue.password == "") {
      setPasswordInput("Please Enter Your Password 🙏'")
      setEmailInput("")
      setLoading(false)
      return;
    }

    //TODO:- THIS THE TYPE BASES ON VALIDATION 

    else if (!text.includes("@", "gmail", ".", "com", "in")) {
      setEmailInput("Please Write Current Email Address ex-'tony@gmail.com' 🙏")
      setPasswordInput("")
      setLoading(false)

      return;
    }

    //TODO:- THIS IS THE FINAL CONDITION IN WHICH WE ARE SENDING THE USER DATA TO FIREBAE
    else if (loginTagsValue.email !== "" && loginTagsValue.password !== "" && text.includes("@", "gmail", ".", "com", "in")) {
      setPasswordInput("")
      setEmailInput("")

      signInWithEmailAndPassword(auth, loginTagsValue.email, loginTagsValue.password)
        .then((res) => {
          UserLogin(res.user)
          setLoading(false)
          onClose()
          navigate('/')
        })
        .catch((err) => {
          console.log(err.message)
          setLoading(false)
          setErrorMessage(true);
          setTheError(err.message)
        })
    }



  }

  //TODO:- HERE WE ARE CREATING A FUNCTION WHO WILL GET THE VALUE FROM INPUT BOXES AND MAKE REQUEST TO THE FIREBASE SERSER
  const getValue = () => {



    setLoading(true)

    let text = tagsValue.email

    //TODO:- HERE WE ARE VALIDATING THE FORM OR CHECKING THE DATA WHICH IS COMIMG FROM DOM

    if (tagsValue.name == "" && tagsValue.email == "" && tagsValue.password == "") {
      setNameInput("Please enter your full name 'ex- Abhishek Ojha' ")
      setEmailInput("Please enter your email 'ex- abhishekojhe@gmail.com")
      setPasswordInput("Please enter your password 'ex- Abhishek6543@'")
      setLoading(false)
      return;
    }
    else if (tagsValue.name == "" && tagsValue.email !== "" && tagsValue.password !== "") {
      setNameInput("Please Enter Your Full Name 🙏")
      setPasswordInput("")
      setEmailInput("")
      setLoading(false)

      return;
    }

    else if (tagsValue.name !== "" && tagsValue.email == "" && tagsValue.password !== "") {
      setEmailInput("Please Enter Your Email 🙏")
      setNameInput("")
      setPasswordInput("")
      setLoading(false)


      return;
    }
    else if (tagsValue.name !== "" && tagsValue.email !== "" && tagsValue.password == "") {
      setPasswordInput("Please Enter Your Password 🙏'")
      setNameInput("")
      setEmailInput("")
      setLoading(false)

      return;
    }
    else if (tagsValue.name == "" && tagsValue.email == "" && tagsValue.password !== "") {
      setNameInput("Please Enter Your Full Name 🙏")
      setEmailInput("Please Enter Your Email 🙏")
      setPasswordInput("")
      setLoading(false)

      return;
    }
    else if (tagsValue.name == "" && tagsValue.email !== "" && tagsValue.password == "") {
      setNameInput("Please Enter Your Full Name 🙏")
      setPasswordInput("Please Enter Your Password 🙏'")
      setEmailInput("")
      setLoading(false)

      return;
    }
    else if (tagsValue.name !== "" && tagsValue.email == "" && tagsValue.password == "") {
      // setNameInput("Please Enter Your Full Name 🙏")
      setEmailInput("Please Enter Your Email 🙏")
      setPasswordInput("Please Enter Your Password 🙏'")
      setNameInput("")
      setLoading(false)
      return;
    }


    //TODO:- THIS THE TYPE BASES ON VALIDATION 

    else if (!text.includes("@", "gmail", ".", "com", "in")) {
      setEmailInput("Please Write Current Email Address ex-'tony@gmail.com' 🙏")
      setNameInput("")
      setPasswordInput("")
      setLoading(false)

      return;
    }

    //TODO:- THIS IS THE FINAL CONDITION IN WHICH WE ARE SENDING THE USER DATA TO FIREBAE
    else if (tagsValue.name !== "" && tagsValue.email !== "" && tagsValue.password !== "" && text.includes("@", "gmail", ".", "com", "in")) {
      setPasswordInput("")
      setEmailInput("")
      setNameInput("")

      createUserWithEmailAndPassword(auth, tagsValue.email, tagsValue.password)
        .then((res) => {
          let user = res.user;
          updateProfile(user, {
            displayName: tagsValue.name
          })
          UserLogin(res.user)
          setLoading(false)
          onClose()
          navigate('/')
        })
        .catch((err) => {
          console.log(err.message)
          setLoading(false)
          setErrorMessage(true);
          setTheError(err.message)
        })
    }

  }
  return modalChange ? (
    <>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg={'rgb(45,45,45)'}>
          <ModalHeader h={'40px'} >
            <Image src='https://i.ibb.co/TkXWGQ2/logo-8.png' h="35px" />
            <ModalCloseButton color="black" position="absolute" top="15px" right="20px" />
          </ModalHeader>
          <ModalBody mt="40px">

            <Center>
              <VStack>


                <Box display="flex" justifyContent="center" alignItems="center"  >
                  <Image src='https://i.ibb.co/9Y8L45w/logo-5.png' width="50%" />
                </Box>

                <Box display={"flex"} flexDirection="column" gap="10px 10px" w="100%" textAlign='center'>
                  <Text fontSize={35} fontWeight="700" color={'rgb(234,234,234)'} mt="30px">Log in with your email</Text>
                  <Input
                    variant='flushed'
                    placeholder='Email'
                    fontSize="20px"
                    color="rgb(234,234,234)"
                    borderRadius={"5px"}
                    padding="20px 10px"
                    marginTop="10px"
                    onChange={(e) => setLoginTagsValue((prev) => ({ ...prev, email: e.target.value }))}
                  />
                  <b>{emailInput}</b>
                  <Spacer />
                  <Spacer />
                  <Spacer />
                  <InputGroup size='md'>
                    <Input
                      pr='4.5rem'
                      type={show ? 'text' : 'password'}
                      placeholder="Password"
                      bg={'rgb(45,45,45)'}
                      variant='flushed'
                      fontSize="20px"
                      color="rgb(234,234,234)"
                      borderRadius={"5px"}
                      padding="20px 10px"
                      onChange={(e) => setLoginTagsValue((prev) => ({ ...prev, password: e.target.value }))}
                    />
                    <InputRightElement width='4.5rem' bg="rgb(45,45,45)">
                      <Button h='1.75rem' size='el' onClick={handleClick}
                        _hover={{
                          color: "teal.500",
                        }}

                      >
                        {show ? <AiFillEye fontSize="23px" /> : <AiFillEyeInvisible fontSize="23px" />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <b>{passwordInput}</b>
                </Box>
                <Alert status='error' display={errorMessage ? "block" : "none"} borderRadius="5px">
                  <Flex justifyContent="space-between">
                    <AlertIcon /> <AiOutlineCloseCircle fontSize="23px" color="red" onClick={() => setErrorMessage(!errorMessage)} />
                  </Flex>
                  {/* {theError} */}
                  {theError == "Firebase: Error (auth/invalid-email)." ? `Sorry 🙇‍♀️!, User not found on this this mail 👉  ${loginTagsValue.email}` : null}
                </Alert>

              </VStack>


            </Center>

          </ModalBody>
          <ModalFooter bg={'rgb(45,45,45)'} display="flex" justifyContent={"center"}>

            <Center>
              <VStack direction='row' p={1} mt="30px">
                <Button
                  // isLoading
                  isLoading={loading}
                  disabled={loading}
                  loadingText='Wait'
                  colorScheme='teal'
                  variant='outline'
                  color={'rgb(10,132,255)'}
                  fontSize="17px"
                  border="none"
                  width={'100%'}
                  onClick={loginGetValue}
                  _hover={{
                    color: "teal.500",
                  }}
                >
                  Login
                </Button>
                <Button variant='ghost'
                  onClick={() => setModalChange(!modalChange)}
                  color="rgb(10,132,255)"
                  fontSize="17px"
                  _hover={{
                    color: "teal.500",
                  }}

                >
                  Create new account</Button>
              </VStack>

            </Center>



          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
    :
    (
      <>
        {/* <Button onClick={onOpen}>Open Modal</Button> */}

        <Modal isOpen={isOpen} onClose={onClose} size="xl" >
          <ModalOverlay />
          <ModalContent bg={'rgb(45,45,45)'}>
            <ModalHeader h={'40px'} >
              <Image src='https://i.ibb.co/TkXWGQ2/logo-8.png' h="35px" />
              <ModalCloseButton color="black" position="absolute" top="15px" right="20px" />
            </ModalHeader>
            <ModalBody mt="10px">

              <Center>
                <VStack>

                  <Box display="flex" justifyContent="center" alignItems="center" >
                    <Image src='https://i.ibb.co/9Y8L45w/logo-5.png' width="50%" />
                  </Box>

                  <Box display={"flex"} flexDirection="column" gap="10px 10px" w="100%" textAlign='center'>
                    <Text fontSize={35} fontWeight="700" color={'rgb(234,234,234)'} mt="30px">Sign up with your email</Text>


                    {/* This is the first input tag for getting Name of the user */}

                    <Input

                      type="name"
                      variant='flushed'
                      placeholder='Name'
                      fontSize="20px"
                      color="rgb(234,234,234)"
                      borderRadius={"5px"}
                      padding="20px 10px"
                      marginTop="10px"
                      onChange={(e) => setTagsValue((prev) => ({ ...prev, name: e.target.value }))}
                    />
                    <b>{nameInput}</b>
                    <Spacer />

                    {/* This is the first input tag for getting Email of the user */}
                    <Input
                      type="email"
                      variant='flushed'
                      placeholder='Email'
                      fontSize="20px"
                      color="rgb(234,234,234)"
                      borderRadius={"5px"}
                      padding="20px 10px"
                      marginTop="10px"
                      onChange={(e) => setTagsValue((prev) => ({ ...prev, email: e.target.value }))}
                    />
                    <b>{emailInput}</b>
                    <Spacer />

                    {/* This is the first input tag for getting Password of the user */}
                    <InputGroup size='md'>
                      <Input
                        border="1px solid red"
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder="Password"
                        bg={'rgb(45,45,45)'}
                        variant='flushed'
                        fontSize="20px"
                        color="rgb(234,234,234)"
                        borderRadius={"5px"}
                        padding="20px 10px"
                        onChange={(e) => setTagsValue((prev) => ({ ...prev, password: e.target.value }))}
                      />
                      <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='el' onClick={handleClick}
                          _hover={{
                            color: "teal.500",
                          }}

                        >
                          {show ? <AiFillEye fontSize="23px" /> : <AiFillEyeInvisible fontSize="23px" />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <b>{passwordInput}</b>
                  </Box>


                </VStack>








              </Center>

              <Alert status='error' display={errorMessage ? "block" : "none"} borderRadius="5px">
                <Flex justifyContent="space-between">
                  <AlertIcon /> <AiOutlineCloseCircle fontSize="23px" color="red" onClick={() => setErrorMessage(!errorMessage)} />
                </Flex>
                {/* {theError} */}
                {theError == "Firebase: Error (auth/email-already-in-use)." ? `Sorry 🙇‍♀️!, This Email address 👉${tagsValue.email} is already in our database ` : null}
              </Alert>

            </ModalBody>
            <ModalFooter bg={'rgb(45,45,45)'} display="flex" justifyContent={"center"} borderRadius="10px" >

              <Center>
                <VStack direction='row' p={1} mt="30px">
                  <Button
                    isLoading={loading}
                    disabled={loading}
                    loadingText='Wait'
                    colorScheme='teal'
                    variant='outline'
                    color={'rgb(10,132,255)'}
                    fontSize="17px"
                    border="none"
                    width={'100%'}
                    onClick={getValue}
                    _hover={{
                      color: "teal.500",
                    }}
                  >
                    Sign up
                  </Button>
                  <Button variant='ghost'
                    onClick={() => setModalChange(!modalChange)}
                    color="rgb(10,132,255)"
                    fontSize="17px"
                    _hover={{
                      color: "teal.500",
                    }}

                  >
                    Log in with email</Button>

                  <Button rightIcon={<FcGoogle />} colorScheme='teal' variant='outline'>
                    Sign up with
                  </Button>
                </VStack>
              </Center>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )

}
export default Login_Signup_Modal