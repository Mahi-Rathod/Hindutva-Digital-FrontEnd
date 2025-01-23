import React, {useEffect, useState} from "react";
const TextAnimation = React.memo(({name}) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => (prevCount >= 50 ? 0 : prevCount + 1));
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div id='slogan' className=' md:w-[80%] m-auto text-center p-10 flex justify-center'>
            <div className='md:text-4xl duration-700  font-extrabold ease-in-out transition-transform text-[#FFFF00]'>
                <h2>ऑनलाइन माहिती शोधा आणि ज्ञान वाढवा </h2>
                <span className='text-black font-light'>@</span>
                <span className='text-white font-mono'>{name.slice(0, count)}</span>
                <span className='text-black font-extralight'>|</span>
            </div>
        </div>
    );
});

export default TextAnimation;