import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useState } from "react";
import { CompactTrie } from "../lib/CompactTrie";
import { Trie } from "../lib/Trie";

interface AutocompleteProps {
    words: Array<string>;
    style?: {input?: string, box?: {container?: string, element?: string}};
    onSubmit?: (value: string) => void;
    placeholder?: string;
}

interface SuggestionsBoxProps {
    suggestions: Array<string>;
    style?: {container?: string, element?: string};
    active: number;
    onClick: (value: string) => void;
}

interface ChangeProps {
    e: ChangeEvent<HTMLInputElement>;
}

const SuggestionsBox = (props: SuggestionsBoxProps) => {
    const { suggestions, style, active, onClick } = props;
    const hoverStyle = style?.element?.split(' ').filter((value:string) => {return value.startsWith("hover:")}).join(" ").split("hover:").join("");

    return (
        <div className={`absolute top-16 z-10 bg-white w-full rounded-lg px-2 py-2 max-h-[300px] overflow-scroll ${style?.container}`}>
            {suggestions.length > 0 && suggestions.map((value, index) => {
                return (
                    <div 
                    id={`autocomplete-elmt-${index}`}
                    key={index}
                    className={`py-4 px-4 rounded-lg hover:cursor-pointer hover:bg-slate-200 
                                ${index === active && (hoverStyle?.includes("bg-") ? hoverStyle :`bg-slate-200`)} 
                                ${style?.element}`}
                    onClick={() => onClick(value)}
                    >
                        {value}
                    </div>
                )
            })}

            {suggestions.length === 0 && 
            <div 
            className={`py-4 px-4 rounded-lg ${style?.element} italic`}>
                No items found
            </div>
            }
        </div>
    )
}

const Autocomplete = (props: AutocompleteProps) => {
    const { words, style, onSubmit, placeholder } = props; 
    const [trie, setTrie] = useState(new CompactTrie());
    const [value, setValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Array<string>>([]);
    const [toggleSuggestion, setToggleSuggestion] = useState<boolean>(false);
    const [activeIdx, setActiveIdx] = useState<number>(0);

    useMemo(() =>{
        try {
            trie.insertAll(words);
            setTrie(trie);
        } catch (err) {
            console.log(err);
        }
        // eslint-disable-next-line
    },[words])

    useEffect(() => {
        if (toggleSuggestion) {
            let newSuggestions = trie.getWords(value);
            setSuggestions(newSuggestions);
        }
        // eslint-disable-next-line
    }, [value])

    const handleChange = (props: ChangeProps) => {
        const {e} = props;
        // console.log("Input value: ", e.target.value);
        setValue(e.target.value);
    }

    const handleSubmit = () => {
        if (onSubmit && !toggleSuggestion) {
            onSubmit(value)
            // console.log("KEY SUBMIT: ", value);
        };
    }

    const handleClick = (value: string) => {
        setValue(value);
        setToggleSuggestion(false);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter" && !toggleSuggestion) {
            handleSubmit();
        }
        else if (e.key === "Enter" && suggestions.length > 0) {
            setValue(suggestions[activeIdx]);
            setToggleSuggestion(false);
        } else if (e.key === 'ArrowDown' && toggleSuggestion && activeIdx < suggestions.length - 1) {
            setActiveIdx(activeIdx + 1);
        } else if (e.key === 'ArrowUp' && toggleSuggestion && activeIdx > 0) {
            setActiveIdx(activeIdx - 1);
        } else {
            setActiveIdx(0);
            setToggleSuggestion(true);
        }
    }

    return (
        <form
        className="relative w-fit"
        onSubmit={handleSubmit}
        >
            <input 
            className={`w-[500px] rounded-xl px-4 py-4 bg-white ${style?.input}`}
            disabled
            placeholder={(toggleSuggestion || value.length === 0) ? (suggestions.length > 0 ? value.concat(suggestions[activeIdx].slice(value.length)) : value.length > 0 ? '' : placeholder) : ''} />
           
            <input
            className={`absolute left-0 w-[500px] rounded-xl px-4 py-4 focus:outline-none active:outline-none
                       ${style?.input?.split(' ').filter((value: string) => {return value.slice(0, 3) !== "bg-"}).join(' ')}
                       bg-transparent`}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange({e})}
            value={value}
            onKeyDown={(e: KeyboardEvent) => {handleKeyDown(e)}}
            tabIndex={-1}
            />

            {toggleSuggestion && 
            <SuggestionsBox 
            active={activeIdx} 
            onClick={(value) => handleClick(value)} 
            suggestions={suggestions} 
            style={style?.box}/>}
        </form>
    )
}

export default Autocomplete;