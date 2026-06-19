import Footer from '@/components/sheard/Footer';
import Navbar from '@/components/sheard/Navbar';
import React from 'react';

const MainLayout = ({ children }) => {
    return (
        <div>
            <Navbar/>
            <div className='bg-pink-100'>
                {
                    children
                }
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;