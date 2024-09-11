import React, { useEffect, useRef, useState } from 'react'
import './titleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'


const titleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTIxYzU0M2QzOTE5ODM4NjdmOWUwNzNlMzg1YTc5MCIsIm5iZiI6MTcyNTk3MjE3NC42NjI3MjgsInN1YiI6IjY2NGY3MDQxODA5OWE2OWI3NDE4Y2E5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8p4IILxGzR2OqYsMjnlQ5MCfi-krQE8ayrVHpAUlQQ0'
    }
  };
  
  

const handleWheel = (event) =>{
    event.prenventDefault();
    cardsRef.current.scrollLeft  += event.deltaY;
}

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response =>setApiData(response.results))
    .catch(err => console.error(err));

   cardsRef.current.addEventListener('wheel', handleWheel);
})

  return (
    <div className='title-cards'>
        <h2>{title?title:"Popular on Netflix"}</h2>
        <div className="card-list"  ref={cardsRef}>
          {apiData.map((card, index)=>{
              return <Link to={`/player/${card.id}`} className='card' key={index}>
                <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                <p>{card.original_title}</p>
                </Link>
          })}
        </div>
    </div>
  )
}

export default titleCards