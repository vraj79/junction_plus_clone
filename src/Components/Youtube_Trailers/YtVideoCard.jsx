import React from 'react'
import {Link} from "react-router-dom"
import { Box } from '@chakra-ui/react'
import styles from "./YtVideoCard.module.css";
import { FaPlay } from "react-icons/fa"

const YtVideoCard = ({titleName,thumbnailImage,videoId, onMouseOver,playButoon }) => {
  return (
    <Link>
    <div onMouseOver={() => onMouseOver(thumbnailImage)} className={styles.cardContainer}>
      <Box position="relative" onClick={()=>playButoon(videoId)}>
        <img src={thumbnailImage}/>

        <span>
          <FaPlay />
        </span>
      </Box>
      <Box>
        <p>{titleName}</p>
      </Box>
    </div>
    </Link>
  )
}
export default YtVideoCard;