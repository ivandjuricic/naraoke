import React from 'react';
import { images } from '../consts'


const RandomImage = (props) => {
    const src = images[props.randomIndex];
    return (
        <div>
            <img className="App-RandomImage" src={src} alt="singing" />
        </div>
    );
}
 
export default RandomImage;