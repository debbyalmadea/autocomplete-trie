import { ChangeEvent, useEffect, useState } from "react";
import { CompactTrie } from "../lib/CompactTrie";

interface AutocompleteProps {
    words: Array<string>;
}

interface SuggestionsBoxProps {
    suggestions: Array<string>;
}

interface ChangeProps {
    e: ChangeEvent<HTMLInputElement>;
}

const SuggestionsBox = (props: SuggestionsBoxProps) => {
    const { suggestions } = props;
    return (
        <div className="absolute top-16 bg-white w-full rounded-lg px-2 py-4">
            {suggestions.map((suggestion, index) => {
                return (
                    <div key={index} className="py-2 px-2 rounded-lg hover:cursor-pointer hover:bg-slate-200">
                        {suggestion}
                    </div>
                )
            })}
        </div>
    )
}

const Autocomplete = (props: AutocompleteProps) => {
    const { words } = props;
    const [trie, setTrie] = useState(new CompactTrie());
    const [prefix, setPrefix] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Array<string>>([]);

    useEffect(() => {
        trie.insertAll(words);
        setTrie(trie);
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        let newSuggestions = trie.getSuggestions(prefix);
        setSuggestions(newSuggestions);
        console.log("Prefix: ", prefix);
        // eslint-disable-next-line
    }, [prefix])

    useEffect(() => {
        console.log("Suggestions: ", suggestions);
    }, [suggestions])

    const handleChange = (props: ChangeProps) => {
        const {e} = props;
        console.log("Input value: ", e.target.value);
        setPrefix(e.target.value);
    }

    return (
        <div className="relative w-[500px]">
            <input 
            className="absolute w-[500px] rounded-xl px-4 py-4 bg-white"
            disabled
            placeholder={suggestions.length > 0 ? suggestions[0] : prefix.length > 0 ? '' : 'Type for suggestions'} />
            <input
            className="absolute w-[500px] rounded-xl px-4 py-4 bg-transparent"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange({e})}
            >
            </input>
            {suggestions.length > 0 && <SuggestionsBox suggestions={suggestions} />}
        </div>
    )
}

export default Autocomplete;