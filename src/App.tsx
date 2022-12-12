import { useEffect, useState } from 'react';
import Autocomplete from './components/Autocomplete';
import university from './data/data.json';

function App() {
  const [selected, setSelected] = useState<string>("");
  const [data, setData] = useState<Array<string>>([]);

  useEffect(() => {
      let name: string[] = [];
      university.map((value: any) => {
        name.push(value.name);
      })
      setData(name);
  }, [])

  useEffect(() => {
    console.log(data);
  },[data])

  return (
    <div className=" bg-black w-screen h-screen flex flex-col justify-center items-center">
      <h1 className='text-white font-extrabold text-8xl mb-8 max-w-[800px] text-center'><span className='text-teal-400 underline'>Compact</span> Trie Autocomplete</h1>
      <div className='text-white text-xl mb-10 flex flex-row items-center space-x-1'>
        <span>
          Start by typing <span className='underline'>i</span> 
        </span>
      </div>
      <Autocomplete 
      words={data.slice(0,160)}
      onSubmit={(value) => {setSelected(value)}}
      placeholder="Type something"
      />
      <p className='text-white w-[500px] text-left text-sm mt-2'>Selected: {selected ? selected : "none selected. try to click enter once again."}</p>


      <div id="footer" className='w-full'>
        <p className='text-white text-xs fixed bottom-0 w-full text-center mb-8 opacity-50'>This page use university API by <a className='underline' href='https://github.com/Hipo/university-domains-list'>hipolabs</a></p>
      </div>
    </div>
  );
}

export default App;
