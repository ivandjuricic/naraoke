import React from 'react';


const RandomImage = (props) => {
    const srcs = [
        'http://www.tyanpsc.com/wp-content/uploads/2016/12/The-microphone.jpg',
        'https://www.voices.com/blog/wp-content/uploads/old_assets/blogs/voxdaily/woman-smiling-singing-into-microphone.jpg',
        'https://522bb370f5443d4fe5b9-f62de27af599bb6703e11b472beadbcc.ssl.cf2.rackcdn.com/landing_pages/motiv-product-pages/assets/img/gallery/mv51/gallery-recording-musician-mv51-03.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdz5QjYSQjbmzrgj3fxtJlmmzMStxybHq9ZnTir5sy2UDzp-3-',
        'https://i.ytimg.com/vi/67w4om8_UyM/maxresdefault.jpg',
        'https://image.freepik.com/free-photo/man-singing-through-microphone-with-his-mouth-open_1187-2865.jpg',
        'https://www.sweetwater.com/insync/media/2019/07/best-singing-mic-hero-650x340.jpg',
        'https://previews.123rf.com/images/bluejeanimages/bluejeanimages1703/bluejeanimages170329303/74920908-young-people-singing-karaoke.jpg',
        'https://lovelace-media.imgix.net/getty/478039992.jpg'
    ]
    const src = srcs[props.randomIndex];
    return (
        <div>
            <img className="App-RandomImage" src={src} alt="singing" />
        </div>
    );
}
 
export default RandomImage;