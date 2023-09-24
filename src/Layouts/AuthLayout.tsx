import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import MainHead from './MainHeadLayout';

interface props {
    children: React.ReactNode;
    title: string;
    description: string;
}

export default function MainLayout({ children, title, description }: props) {
    const router = useRouter();
    const { data: user } = useSession();


    return (
        <>
            <MainHead title={title} description={description} />

            <div className="min-h-screen bg-gray-100">

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>

                <div className=''>
                    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white flex justify-between py-2 px-4">
                        <button className="focus:outline-none" onClick={() => void router.push('/')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H6a1 1 0 110-2h4V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <button className="focus:outline-none" onClick={() => void router.push('/add-art')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H6a1 1 0 110-2h4V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <button className="focus:outline-none" onClick={() => void router.push('/cart')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M2.293 4.293A1 1 0 013 4h14a1 1 0 01.707 1.707l-4.5 4.5a1 1 0 01-1.414 0l-1.793-1.793-1.793 1.793a1 1 0 01-1.414 0l-4.5-4.5z"
                                    clipRule="evenodd"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M16 8a2 2 0 11-4 0 2 2 0 014 0zm-3 0a1 1 0 11-2 0 1 1 0 012 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        {user && (
                            <button className="focus:outline-none" onClick={() => void router.push('/profile')}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 11a3 3 0 100-6 3 3 0 000 6zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </>
    );
}
