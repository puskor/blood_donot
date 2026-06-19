import React from 'react';

const StatusCard = ({status}) => {
    // console.log(status.label)
    return (
        <div>
            <div  className="text-center flex flex-col justify-center space-y-1">
                <span className="text-3xl font-bold text-rose-600 font-poppins">{status.value}</span>
                <span className="text-sm text-slate-500 font-inter">{status.label}</span>
            </div>
        </div>
    );
};

export default StatusCard;