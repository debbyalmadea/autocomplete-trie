const END = '$';
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
        return this.childCount() > 0;
    }
}

class CompactTrie {
    root: CompactTrieNode;

    constructor() {
        this.root = new CompactTrieNode(START);
    }
    
    private lookup(node: CompactTrieNode = this.root, word: string = "", words: Array<string> = []): Array<string> {

        if (node.children.size === 0) {
            words.push(word.slice(0, word.length - 1));
        }
        node.children.forEach((child) => {
            if (child !== undefined)  {
                if (child.value[child.value.length - 1] === END) {
                    words.push(word.concat(child.value.slice(0, child.value.length - 1)));
                } else  {
                    this.lookup(child, word.concat(child.value), words);
                }
            }
        })
        return words;
    }

    private getStartNode(prefix: string): {startNode: CompactTrieNode, startIdx: number, newPrefix: string} | undefined {
        let newPrefix = "";
        let currentNode = this.root;
        let childNode;
        let i = 0;
        console.log(prefix)
        while (i < prefix.length) {
            childNode = currentNode.getChild(prefix[i]);
            if (childNode === undefined) {
                return undefined;
            } else {
                currentNode = childNode;
                if (prefix.length - i <= currentNode.value.length) {
                    if (prefix.slice(i, prefix.length) === currentNode.value.slice(0, prefix.length - i).toLowerCase()) {
                        if (newPrefix === "") {
                            newPrefix = currentNode.value;
                        } else {
                            newPrefix = newPrefix.concat(currentNode.value);
                        }
                        return {startNode: currentNode, startIdx: i, newPrefix: newPrefix };
                    } else {
                        return undefined;
                    }
                } else {
                    if (newPrefix === "") {
                        newPrefix = currentNode.value;
                    } else {
                        newPrefix = newPrefix.concat(currentNode.value);
                    }
                    i += currentNode.value.length;
                }
            }
        }

        return {startNode: currentNode, startIdx: i, newPrefix: newPrefix};
    }

    insert(word: string) {
        let parentNode = this.root;
        let concatedWord = word.concat(END);
        let lowercaseWord = concatedWord.toLowerCase();
        let j = 0;
        let childNode;

        while (j < lowercaseWord.length) {
            childNode = parentNode.getChild(lowercaseWord[j]); // get child with key value
            if (childNode === undefined) { 
                // if there is no child found, create new node
                let newCompactTrieNode = new CompactTrieNode(concatedWord.slice(j));
                parentNode.insertChild(lowercaseWord[j], newCompactTrieNode);
                return true;
            } else {
                let minLength = Math.min(lowercaseWord.length, childNode.value.length);
                for (let i = 1; i < minLength; i++) {
                    if (childNode.value[i].toLowerCase() !== lowercaseWord[i + j]) {
                        let newCompactTrieNode1 = new CompactTrieNode(childNode.value.slice(i));
                        let newCompactTrieNode2 = new CompactTrieNode(concatedWord.slice(i + j));
                        if (childNode.hasChildren()) {
                            newCompactTrieNode1.children = childNode.children;
                            childNode.children = new Map<string, CompactTrieNode | undefined>();
                        } 
                        childNode.insertChild(childNode.value[i].toLowerCase(), newCompactTrieNode1);
                        childNode.insertChild(lowercaseWord[i + j], newCompactTrieNode2);
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
            this.insert(word)
        })
    }

    getWords(prefix: string) {
        let lowercasePrefix = prefix.toLowerCase();
        let start = this.getStartNode(lowercasePrefix);

        if (start !== undefined) {
            return this.lookup(start.startNode, start.newPrefix);
        } 

        return [];
    }

}

export { CompactTrie }