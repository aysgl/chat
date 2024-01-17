import React from 'react'

const Room = ({ setRoom, setIsAuth }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const room = e.target[0].value
        setRoom(room)
    }
    const handleLogout = () => {
        setIsAuth(false);
        localStorage.removeItem("token")
    }
    return (
        <form onSubmit={handleSubmit} className='login'>
            <div>
                <h1>Room</h1>
                <p>Enter room name...</p>
                <input />

                <button type='submit'>Enter</button>
                <button onClick={handleLogout}>Log out</button>
            </div>
        </form>
    )
}

export default Room