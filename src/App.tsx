import React from 'react';
import Autocomplete from './components/Autocomplete';

function App() {
  let words = ["Romane", "Romance","Ramune", "Bali", "Bana", "Banana", "Romeo pergi berkata bahwa"]
  return (
    <div className="bg-black w-screen h-screen flex flex-col justify-center items-center">
      <h1 className='text-white font-extrabold text-8xl mb-8'>Trie Autocomplete</h1>
      <div className='text-white mb-10 flex flex-row items-center space-x-1'>
        <span>
          Start by typing <span className='underline'>{words[0]}</span> or 
        </span>
        <span>
          <button className='text-black bg-yellow-300 px-2 py-1 rounded-lg font-semibold'> Create Suggestions</button>
        </span>
      </div>
      <Autocomplete words={words} />
    </div>
  );
}

export default App;
