"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { SearchBar } from "@/components/ui/SearchBar"
import getAvatarSrc from "@/lib/avatar"

export function Navbar () {
    const { user, logout } = useAuth();
    const router = useRouter()
    const [showDropDown, setShowDropDown] = useState(false)

    const handleLogout = async () => {
        await logout()
        router.push("/login")
    }

   return(
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex justify-between items-center px-4 h-14 ">
        { /* Logo */}
        <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
            <svg viewBox="0 0 30 20" className="h-6 text-red-600 fill-current">
              <path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="#FF0000" />
              <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white" />
            </svg>
            <span className=" font-bold">Vtube</span>
            </Link>
        </div>
        { /* Search Bar */}
        <div className="hidden md:block flex-grow max-w-2xl mx-4"><SearchBar /></div>
        { /* User Menu */}
        <div className="flex items-center">
            <Link href="/upload" className="text-blue-600 font-medium mx-4">Upload</Link>
            {user ? (
                <div className="relative">
                    <button onClick={() => setShowDropDown(!showDropDown) } className="flex items-center">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image 
    src={getAvatarSrc(user.avatar)} 
    alt={user.username} 
    width={32} 
    height={32}
    className="object-cover"
    onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = `${process.env.NEXT_PUBLIC_API_URL}/uploads/avatars/default-avatar.png`;
    }}
/>
                        </div>
                    </button>
                    {showDropDown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                            <Link href={`/profile/${user.id}`} className="block px-4 py-2 hover:bg-gray-100">Your Channel</Link>
                            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100" >Sign Out</button>
                        </div>
                    )}

                </div>
            ) : (
                <Link href='/login' className="flex items-center border border-blue-600 text-blue-600 px-4 py-1 rounded-sm"><span className="material-icons-outlined text-sm mr-1">account_circle</span>Sign In</Link>
            )}

        </div>
        </div>
    </header>
   ) 
}