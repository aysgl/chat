import React from 'react'
import { auth } from '../firebase/config'

const Messages = ({ data }) => {
    return (
        <div className={`${auth.currentUser?.uid === data.author.id ? "right" : "left"}`}>
            {auth.currentUser?.uid === data.author.id ? (
                <div className='comment-right'>
                    {data.text && <p>{data.text}</p>}
                    {data.fileURL &&
                        <img className='img' src={data.fileURL} />
                    }
                </div>
            ) : (
                <div className='comment-left'>
                    <div className='user'>
                        <img className='user-img' src={data.author.photo} />
                        <span>{data.author.name}</span>
                    </div>
                    {data.text && <p>{data.text}</p>}
                    {data.fileURL &&
                        <img className='img' src={data.fileURL} />
                    }
                </div>
            )}
        </div>
    );
};


export default Messages