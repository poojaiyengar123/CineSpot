import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GalleryCard from './GalleryCard';
import './styles.css';

const DisplayPage: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = location.state;

    useEffect(() => {
        setIsExpanded(false);
    }, [currentIndex]);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? data.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === data.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goBack = () => {
        navigate('/');
    };

    const handleToggle = () => {
        setIsExpanded((prevExpanded) => !prevExpanded);
    }

    return (
        <div className="gallery">
            <button onClick={goBack} className="back">Back</button>
            <div className="gallery-area">
                <img src="src/assets/left-arrow.png" alt="left arrow" onClick={goToPrevious} className="left-arrow"/>
                <div className="cards">
                    <GalleryCard 
                        imageUrl={data[currentIndex].Poster}
                        title={data[currentIndex].Title}
                        releaseYear={data[currentIndex].Year}
                        type={data[currentIndex].Type}
                        isExpanded={isExpanded}
                        onToggle={handleToggle}
                    />
                </div>
                <img src="src/assets/right-arrow.png" alt="right arrow" onClick={goToNext} className="right-arrow"/>
            </div>
        </div>
    );
};

export default DisplayPage;