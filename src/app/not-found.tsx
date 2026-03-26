"use client"


import Image from 'next/image';
import NotfoundImg from "../../public/errorPages.png"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
const NotFoundPages = () => {
    const router =useRouter()
    useEffect(()=>{
        const time =setTimeout(()=>{router.push("/")},3000)
        return ()=>clearTimeout(time)
    },[router])
    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <Image src={NotfoundImg} alt='Picture not-found' style={{width:"100%",height:"auto"}} priority/>
        </div>
    );
};

export default NotFoundPages;