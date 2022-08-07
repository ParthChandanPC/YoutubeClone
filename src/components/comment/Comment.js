import React from 'react'
import moment from 'moment'
import './_comment.scss'
const Comment = () => {
   return (
      <div className='comment p-2 d-flex'>
         <img
            src='https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
            alt=''
            className='rounded-circle mr-3'
         />
         <div className='comment__body'>
            <p className='comment__header mb-1'>
               Parth Chandan • {moment('2022-08-08').fromNow()}
            </p>
            <p className='mb-0'>Nice!</p>
         </div>
      </div>
   )
}

export default Comment