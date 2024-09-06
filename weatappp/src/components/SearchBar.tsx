import { Search } from 'lucide-react';
import React, { useState } from 'react';

interface SearchBarProps {
    setCity: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setCity }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCity(input);
    }

    return (
        <form onSubmit={handleSubmit} className="mb-4 w-full flex justify-center">
            <div className='flex items-center w-full max-w-md'>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter city name..."
                    className="p-2 rounded-l-lg bg-slate-100 text-black border-2 border-gray-300 focus:border-black -500 focus:outline-none w-full"
                />
                <button
                    type="submit"
                    className="p-2 rounded-r-lg bg-blue-500 text-white border-2 border-black  hover:bg-blue-600 focus:outline-none"
                >
                    <Search />
                </button>
            </div>
        </form>
    );
}

export default SearchBar;
