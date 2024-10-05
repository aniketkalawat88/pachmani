// src/components/RatingReview.js

import React from 'react'

function ReviewStar({ rating, setRating }: {rating:number , setRating:any}) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => {
        return (  
          <span
            className='start'
            style={{
              cursor: 'pointer',
              color: rating >= star ? '#00AB55' : 'gray',
              fontSize: `35px`,
            }}
            onClick={() => {
              setRating(star)
            }}
          >
            {' '}
            ★{' '}
          </span>
        )
      })}
    </div>
  )
}

export default ReviewStar;