import React, { useRef } from 'react'
import CommonSliderCards from './CommonSliderCards';
import styles from "./CommonSlider.module.css"
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im"

const CommonSlider = ({popularMovieData}) => {
    const container = useRef(null)


console.log(popularMovieData)


    const goToPrev = () => {
        console.log("dekho")
        let width = container.current.clientWidth;
        container.current.scrollLeft = container.current.scrollLeft - width;
        console.log(width)
    }

    const goToNext = () => {
        let width = container.current.clientWidth;
        container.current.scrollLeft = container.current.scrollLeft + width;
        console.log(width)
    }

    return (
        <div className={styles.sliderMainContainer}>
           
            <button className={styles.leftBtn} onClick={goToPrev}><ImArrowLeft2 /></button>
            <button className={styles.rightBtn} onClick={goToNext}><ImArrowRight2 /></button>
            <div className={styles.sliderCardContainer} ref={container}>
            
            {
                popularMovieData.map((ele)=>{
                return <CommonSliderCards key={ele.id} 
                image={ele.poster_path} 
                genre={ele.genre_ids}
                id={ele.id}
                adult={ele.adult}
                title={ele.title}
                title_name={ele.name}
                release_date={ele.release_date}
                first_air_date={ele.first_air_date}
                vote_average={ele.vote_average}
                />
                })
            }
            </div>

        </div>
    )
}

export default CommonSlider