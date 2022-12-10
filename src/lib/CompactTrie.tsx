const END = '*';
const START = '';

class CompactTrieNode {
    value: string;
    children: Map<string, CompactTrieNode | undefined>;

    constructor(str: string) {
        this.value = str;
        this.children = new Map<string, CompactTrieNode | undefined>();
    }

    insertChild(key: string, node: CompactTrieNode | undefined) {
        this.children.set(key, node);
    }

    getChild(key: string) {
        return this.children.get(key);
    }

    childCount() {
        return this.children.size;
    }

    isLeaf() {
        return this.childCount() === 0;
    }

    hasChildren() {
        return this.children.size > 0;
    }
}

class CompactTrie {
    root: CompactTrieNode;

    constructor() {
        this.root = new CompactTrieNode(START);
    }
    
    private collect(node: CompactTrieNode = this.root, word: string = "", words: Array<string> = []) {
        console.log("COLLECT NODE: ", node, node.children);

        if (node.children.size === 0) {
            words.push(word.slice(0, word.length - 1));
            console.log("COLLECT PUSH WORD: ", word.slice(0, word.length - 1))
        }
        node.children.forEach((child) => {
            if (child !== undefined)
            console.log("COLLECT CHILD: ", child.value);
            if (child !== undefined)  {
            if (child.value[child.value.length - 1] === END) {
                words.push(word.concat(child.value.slice(0, child.value.length - 1)));
                console.log("COLLECT PUSH WORD: ", word.concat(child.value))
            } else  {
                console.log("COLLECT PROCESSING WORD: ", word.concat(child.value));
                this.collect(child, word.concat(child.value), words);
            }
        }
        })
        return words;
    }

    private getStartNode(prefix: string) {
        let currentNode = this.root;
        let childNode;
        let i = 0;

        while (i < prefix.length) {
            childNode = currentNode.getChild(prefix[i]);
            if (childNode === undefined) {
                return undefined;
            } else {
                currentNode = childNode;
                console.log("GETSTART LENGTH: ", prefix.length - i, currentNode.value.length);
                if (prefix.length - i <= currentNode.value.length) {
                    console.log("GETSTART PREFIX: ", prefix.slice(i + 1, prefix.length), currentNode.value.slice(0, prefix.length - i - 1));
                    if (prefix.slice(i, prefix.length) === currentNode.value.slice(0, prefix.length - i)) {
                        return {startNode: currentNode, startIdx: i};
                    } else {
                        return undefined;
                    }
                } else {
                    i += currentNode.value.length;
                    console.log("GETSTART NEXT I: ", i);
                }
            }
        }
    }

    insert(word: string) {
        let parentNode = this.root;
        let lowercaseWord = word.toLowerCase().concat(END);
        let j = 0;
        let childNode;

        while (j < lowercaseWord.length) {
            childNode = parentNode.getChild(lowercaseWord[j]);
            console.log("CHILD NODE: ", childNode?.value);
            if (childNode === undefined) {
                let newCompactTrieNode = new CompactTrieNode(lowercaseWord);
                parentNode.insertChild(lowercaseWord[j], newCompactTrieNode);
                console.log("INSERT: ", lowercaseWord[j], newCompactTrieNode);
                return true;
            } else {
                let minLength = Math.min(lowercaseWord.length, childNode.value.length);
                console.log("INSERT MIN LENGTH: ", minLength);
                for (let i = 1; i < minLength; i++) {
                    if (childNode.value[i] !== lowercaseWord[i + j]) {
                        console.log("INSERT BREAK: ", childNode.value, "at index", i + j);
                        let newCompactTrieNode1 = new CompactTrieNode(childNode.value.slice(i));
                        let newCompactTrieNode2 = new CompactTrieNode(lowercaseWord.slice(i + j));
                        if (childNode.hasChildren()) {
                            console.log("INSERT here");
                            newCompactTrieNode1.children = childNode.children;
                            console.log("INSERT NCT1 CHILD: ", newCompactTrieNode1.children)
                            childNode.children = new Map<string, CompactTrieNode | undefined>();
                        } 
                        childNode.insertChild(childNode.value[i], newCompactTrieNode1);
                        console.log("INSERT: ", childNode.value[i], childNode.value.slice(i), newCompactTrieNode1);
                        childNode.insertChild(lowercaseWord[i + j], newCompactTrieNode2);
                        console.log("INSERT: ", lowercaseWord[i + j], lowercaseWord.slice(i + j), newCompactTrieNode2);
                        childNode.value = childNode.value.slice(0, i);
                        
                        return true;
                    }
                }

                parentNode = childNode;
                j += parentNode.value.length;
            }
        }

        return false;
    }

    insertAll(words: Array<string>) {
        words.forEach((word) => {
            console.log("INSERTING: ", word);
            this.insert(word);
            console.log("INSERT RESULT: ", this.root);
        })

    }

    getSuggestions(prefix: string) {
        console.log("GETSTART LOOKUP: ", prefix);
        let lowercasePrefix = prefix.toLowerCase();
        let start = this.getStartNode(lowercasePrefix);
        console.log("GETSTART START NODE: ", start?.startNode);
        if (start !== undefined && prefix !== '') {
            console.log("COLLECT: ", prefix);
            return this.collect(start.startNode, prefix.concat(start.startNode.value.slice(prefix.length - start.startIdx)));
        } 

        return [];
    }

}

export { CompactTrie }