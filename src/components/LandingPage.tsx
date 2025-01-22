import React, { useState } from 'react';
import axios from '../../node_modules/axios/index'
import { useNavigate } from 'react-router-dom';
import './styles.css';

interface FormParameters {
    phrase: string;
    releaseYear: string | number;
}

const LandingPage: React.FC = () => {
    const [formData, setFormData] = useState<FormParameters> ({
        phrase: '',
        releaseYear: 2025
    })
    const [releaseYear, setReleaseYear] = useState<string | number>('Any');
    const [showError, setShowError] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name]: value}))
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            formData.releaseYear = releaseYear;
            const formattedPhrase = formData.phrase.replace(/ /g, '+');
            const year = formData.releaseYear !== 'Any' ? `&y=${String(formData.releaseYear)}` : '';
            const url = `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_CINESPOT_API_KEY}&s=${formattedPhrase}${year}`;
            const response = await axios.get(url);

            if (response.data.Search.length > 0) {
                navigate('/display', { state: { data: response.data.Search } });
                setShowError(false);
            } else {
                setShowError(true);
            }
        } catch (error) {
            setShowError(true);
            console.error(error);
        }
    }

    const generateYearOptions = (start: number, end: number): (string | number)[] => {
        return [...Array.from({ length: end - start + 1 }, (_, i) => start + i), 'Any'];
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const value = event.target.value === 'Any' ? 'Any' : parseInt(event.target.value, 10);
        setReleaseYear(value);
    }

    return (
        <div className="mediaSearch">
            <div className="title">
                <h1>CineSpot</h1>
            </div>
            <div className="directions">
                <p>Search for Movies / TV Shows!</p>
            </div>
            <form onSubmit={handleSubmit} className="search-form">
                <div className="phrase">
                    <input type="text" name="phrase" onChange={handleChange} placeholder="Enter in phrase" id="phrase" required />
                </div>
                <div className="years">
                    <p>Select Release Year: </p>
                    <div className="dropdown">
                        <label>
                            <select name="releaseYear" value={releaseYear} onChange={handleYearChange} id="releaseYear">
                                {generateYearOptions(1888, 2025).map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>
                {showError && (
                    <p className="error-message">
                        No results found. Please try a different search phrase or choose a different year.
                    </p>
                )}
                <button type="submit" className="search">Search!</button>
            </form>
        </div>
    );
};

export default LandingPage;