import React from 'react';

const MainLayout = ({children}) => {
    return (
        <div className='bg-pink-200'>
            {
                children
            }
        </div>
    );
};

export default MainLayout;