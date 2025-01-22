import React, { useState, useRef, useEffect } from 'react';
import axios from '../../node_modules/axios/index'

interface GalleryCardProps {
    imageUrl: string;
    title: string;
    releaseYear: string;
    type: string;
    isExpanded: boolean;
    onToggle: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({
    imageUrl, title, releaseYear, type, isExpanded, onToggle
}) => {
    const [itemData, setItemData] = useState<any>(null);
    const [scrollVisible, setScrollVisible] = useState(false);
    const leftSectionRef = useRef<HTMLDivElement | null>(null);
    let scrollTimeout: NodeJS.Timeout;

    const fetchData = async () => {
        try {
            const url = `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_CINESPOT_API_KEY}&t=${title}`;
            const response = await axios.get(url);
            setItemData(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    
    const handleToggle = async () => {
        onToggle();
        if (!isExpanded) {
            await fetchData();
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            setScrollVisible(true);
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                setScrollVisible(false);
            }, 1000);
        };

        const leftSection = leftSectionRef.current;

        if (leftSection) {
            leftSection.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (leftSection) {
                leftSection.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    if (imageUrl === 'N/A') {
        imageUrl = 'src/assets/question-mark.png';
    }
    if (type === 'movie') {
        type = 'Movie';
    } else if (type === 'series') {
        type = 'Series';
    } else {
        type = 'Episode';
    }

    return (
        <div className={`gallery-card ${isExpanded ? 'expanded' : ''}`}>
            <div className="left-section" ref={leftSectionRef}>
                <p className="card-title">{title}</p>
                <img src={imageUrl} alt={title} className="image" />
                <p className="card-date">Release Year: {releaseYear}</p>
                <p className="card-type">Type of Media: {type}</p>
                <button onClick={handleToggle} className="show-more">{isExpanded ? 'Show Less' : 'Show More'}</button>
            </div>
            {isExpanded && itemData && (
                <div>
                    <div className="right-section">
                        <div className="card-info">
                            {itemData.Rated && <p><strong>Rating:</strong> {itemData.Rated}</p>}
                            {itemData.imdbRating && <p><strong>IMDb Rating:</strong> {itemData.imdbRating}</p>}
                            {itemData.Ratings?.[1]?.Value && <p><strong>Rotten Tomatoes:</strong> {itemData.Ratings[1].Value}</p>}
                            <hr />
                            {itemData.Released && <p><strong>Release Date:</strong> {itemData.Released}</p>}
                            {itemData.Runtime && <p><strong>Runtime:</strong> {itemData.Runtime}</p>}
                            <hr />
                            {itemData.Genre && <p><strong>Genres:</strong> {itemData.Genre}</p>}
                            {itemData.Plot && <p><strong>Plot:</strong> {itemData.Plot}</p>}
                            <hr />
                            {itemData.Director && <p><strong>Directors:</strong> {itemData.Director}</p>}
                            {itemData.Writer && <p><strong>Writers:</strong> {itemData.Writer}</p>}
                            {itemData.Actors && <p><strong>Actors:</strong> {itemData.Actors}</p>}
                            <hr />
                            {itemData.Language && <p><strong>Language:</strong> {itemData.Language}</p>}
                            {itemData.Awards && <p><strong>Awards:</strong> {itemData.Awards}</p>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryCard;