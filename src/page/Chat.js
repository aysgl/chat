import React, { useEffect, useState, useRef } from 'react';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, where } from "firebase/firestore";
import { auth, db, storage } from '../firebase/config';
import Arrow from '../components/Icons/Arrow';
import Messages from '../components/Messages';
import Send from '../components/Icons/Send';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const Chat = ({ room, setRoom }) => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    const scrollToBottom = () => {
        const isScrolledToBottom = chatContainerRef.current.scrollHeight - chatContainerRef.current.clientHeight <= chatContainerRef.current.scrollTop + 1;
        if (isScrolledToBottom) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const uploadImg = async (file) => {
        if (!file || !file.type.startsWith("image")) return null;
        const fileRef = ref(storage, file.name);
        await uploadBytes(fileRef, file);
        return await getDownloadURL(fileRef);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const text = e.target[0].value;
        const img = e.target[1].files[0];
        const url = await uploadImg(img);

        await addDoc(collection(db, "messages"), {
            text: text,
            room: room,
            createdAt: serverTimestamp(),
            fileURL: url,
            author: {
                id: auth.currentUser.uid,
                name: auth.currentUser.displayName,
                photo: auth.currentUser.photoURL
            }
        });

        setText('');
        e.target[1].value = "";
    };

    const handleChange = (e) => {
        setText(e.target.files[0].name);
    };

    useEffect(() => {
        const q = query(collection(db, "messages"), where("room", "==", room), orderBy("createdAt", "asc"));

        const unsub = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.docs.forEach((doc) => {
                const temp = doc.data();
                data.push(temp);
            });
            setMessages(data);
            scrollToBottom();
        });
        scrollToBottom();

        return unsub;
    }, [room]);

    return (
        <div className='chat' ref={chatContainerRef}>
            <header>
                <div className='user' onClick={() => setRoom(null)}>
                    <Arrow />
                    <img className='user-img' src={auth.currentUser.photoURL} />
                    {auth.currentUser.displayName}
                </div>
                <p>{room}</p>
            </header>
            <main>
                <div className='comment'>
                    {messages.map((message, index) => (
                        <div key={index}>
                            <Messages data={message} />
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </main>
            <form onSubmit={handleSubmit}>
                <input placeholder='Enter messages' value={text} onChange={(e) => setText(e.target.value)} />
                <div className="file-input-container">
                    <input onChange={handleChange} type="file" id="customFileInput" className="custom-file-input" accept="image/*" />
                    <label htmlFor="customFileInput" className="custom-file-label">
                        +
                    </label>
                </div>
                <button>
                    <Send />
                </button>
            </form>
        </div>
    );
};
