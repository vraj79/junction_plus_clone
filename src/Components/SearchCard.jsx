import React from 'react'
import styles from "./SearchCard.module.css"
import { Card, Image, Stack, CardBody, Heading, Text, Button, CardFooter, VStack, HStack } from "@chakra-ui/react"
import { BsBookmarkFill } from "react-icons/bs"
import { FcViewDetails } from "react-icons/fc"
import { BsListUl } from "react-icons/bs"
import { Link } from 'react-router-dom'
// title={ele.title} release_data={ele.data} rating={ele.vote_average} poster={ele.poster_path} language={ele.original_language} genre={genre_id} id={ele.id}
const SearchCard = ({ title, release, rating, poster, language, genre, id, overView,changeStateOfSearchModal }) => {




    return (
        <div className={styles.searchedMovieCard}>

            <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
            >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={poster ? `https://image.tmdb.org/t/p/w154/${poster}` : "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/9556d16312333.5691dd2255721.jpg"}
                    alt='Caffe Latte'
                />

                <Stack>
                    <CardBody>
                        <Heading size='md'>{title}</Heading>

                        <Text py='2' noOfLines={4} letterSpacing="1px" lineHeight="26px">
                            {overView}
                        </Text>
                        <Text>
                            {release}
                        </Text>
                    </CardBody>

                    <CardFooter>
                        <Stack direction={{ base: "column", md: "row" }}>
                            <Button variant='solid' colorScheme='blue' rightIcon={<BsBookmarkFill />}>
                                Bookmark
                            </Button>
                            <Button variant='solid' colorScheme='blue' rightIcon={<BsListUl />}>
                                Add to List
                            </Button>
                            <Link onClick={()=>changeStateOfSearchModal} to={`/details/${id}`}>
                                <Button variant='solid' colorScheme='blue' rightIcon={<FcViewDetails />} >
                                    More Details
                                </Button>
                            </Link>
                        </Stack>
                    </CardFooter>
                </Stack>
            </Card>

        </div>
    )
}

export default SearchCard