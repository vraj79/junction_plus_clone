import { Stack, Text } from '@chakra-ui/react';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import styles from "./CommonSliderCards.module.css"
import GenreData, { GenreUniversal } from './GenreData'
import { Progress } from '@chakra-ui/react'
import { BsEmojiSunglassesFill } from "react-icons/bs"
import { FaRunning } from "react-icons/fa"
import { RiEmotionHappyFill } from "react-icons/ri"



const CommonSliderCards = ({ image, genre, id, adult, title, release_date, vote_average, title_name,first_air_date}) => {

  //TODO:- STATE AREA
  const { genreData } = useContext(GenreUniversal);

  // image={ele.poster_path} 
  // genre={ele.genre_ids}
  // id={ele.id}
  // adult={ele.adult}
  // title={ele.title}
  // release_date={ele.release_date}
  let genreArray = []
  let i = 0;
  genreData.map((gEle, ind) => {
    if (gEle.id == genre[i]) {
      genreArray.push(gEle.name);
      i++
    }
  })

  return (
    <Link to={`/details/${id}`}>
      <div className={styles.sliderCards}>
        <div className={styles.titleImage}>
          <img src={`https://image.tmdb.org/t/p/original/${image}`} />
        </div>
        <div>
          <Stack p="10px 0">
            <Progress colorScheme={Math.floor(vote_average * 10) > 70 ? "green" : Math.floor(vote_average * 10) > 30 ? "yellow" : "red"} size='sm' value={Math.floor(vote_average * 10)} />
          </Stack>
        </div>
        <Text fontSize='17px' fontWeight="600" marginTop="10px" noOfLines={2}>
          {title ? title : title_name}
        </Text>
        <p style={{ color: 'gray' }}>{release_date?release_date:first_air_date}</p>
        <p><span>Rating</span>: {vote_average}</p>
        <p><span style={{ fontWeight: "600" }}>Genre:</span> {genreArray.join(", ")}</p>

        {adult ? <p><span style={{ color: "red" }}>Age Limit</span>NC-17 🔞</p> : null}
        <span className={styles.voteIcon} >
          {Math.floor(vote_average * 10) > 70 ? <BsEmojiSunglassesFill /> : Math.floor(vote_average * 10) > 30 ? <RiEmotionHappyFill /> : <FaRunning />}
        </span>
      </div>
    </Link>
  )
}

export default CommonSliderCards