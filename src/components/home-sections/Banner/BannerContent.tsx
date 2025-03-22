const BannerContent = ({ image, title }) => {
    return (
        <div className="flex flex-col items-center rounded-2xl shadow-md p-2 space-y-2">
            <img src={image.src} className="object-contain w-20 h-20 max-lg:w-12 max-lg:h-12" />
            <p className="text-xl text-black text-center max-lg:text-base max-lg:font-normal"> 
                {title}
            </p>
        </div>
    );
};

export default BannerContent;
