"use client"

import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Return = () => {
    return (
        <div 
            className="hover:text-[#0CFF21] cursor-pointer transform transition-transform duration-200 "
            onClick={() => window.location.href = '/shop'}
        >
            <ArrowBackIcon style={{ fontSize: 35 }} />
        </div>
    );
};

export default Return;