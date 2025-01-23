import React from 'react';

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "flex", justifyContent:'center',alignItems:'center', width:'2rem', height:'2rem', background: '#581845', zIndex:1,borderRadius:'10%' }}
            onClick={onClick}
        />
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "flex", justifyContent:'center',alignItems:'center', width:'2rem', height:'2rem', background: '#581845', zIndex:1,borderRadius:'10%' }}
            onClick={onClick}
        />
    );
}

export {
    NextArrow,
    PrevArrow
}