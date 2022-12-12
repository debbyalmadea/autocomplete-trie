# Autocomplete Input Component for React.js Using Compact Trie

This project was created to fulfill Discrete Mathematics final term paper assignment. This project implements compact trie data structure in building autocomplete input component for react.js

## Author

Made Debby Almadea Putri - 13521153

## Web Preview

To see the preview of this project you can visit the website [https://autocomplete-trie.vercel.app/](https://autocomplete-trie.vercel.app/)

## Local Usage

1. Clone this repository 
2. In the project directory, run `npm start`, voila your app is running in your local server
3. To customize the data for autocomplete, go to `App.tsx`, add this line of code 
```function App() {
    const [selected, setSelected] = useState<string>("");
    const [data, setData] = useState<Array<string>>([]);

    let newData = [<your data>] // <-- add this line

    useEffect(() => {
      let name: string[] = [];
      university.map((value: any) => {
    ...
``` 
change the words attributes to newData
```
    <Autocomplete 
      words={newData}
      onSubmit={(value) => {setSelected(value)}}
      placeholder="Type something"
    />
```
4. To custom the style, you can add style props to Autocomplete component in `App.tsx`, note this project use tailwind css
```
    <Autocomplete 
      words={newData}
      onSubmit={(value) => {setSelected(value)}}
      placeholder="Type something"
      style={input?: "px-6 py-6", 
             box?: {container?: "bg-black border-2 border-white",
             element?: "text-2xl"}}
    />
```

## Credit
University data [Hipo](https://github.com/Hipo/university-domains-list)
