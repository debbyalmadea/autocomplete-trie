const END = '*';

class TrieNode {
    children: Map<string, TrieNode | undefined>;

    constructor() {
        this.children = new Map<string, TrieNode | undefined>();
    }

    insertChild(key: string, node: TrieNode | undefined) {
        this.children.set(key, node);
    }

    getChild(key: string) {
        return this.children.get(key);
    }

    childCount() {
        return Object.keys(this.children).length;
    }

    isLeaf() {
        return this.childCount() === 0;
    }

    hasChildren() {
        return !this.isLeaf;
    }
}

class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }
    
    private lookup(node: TrieNode = this.root, word: string = "", words: Array<string> = []) {
        node.children.forEach((child, key) => {
            console.log("KEY: ", key)
            if (child !== undefined)
            console.log("CHILD: ", Object.keys(child.children));
            if (key === END || child === undefined) {
                words.push(word);
                console.log("PUSH WORD: ", word)
            } else {
                console.log("PROCESSING WORD: ", word.concat(key));
                this.lookup(child, word.concat(key), words);
            }
        })
        return words;
    }

    private getStartNode(prefix: string) {
        let currentNode = this.root;

        for (let i = 0; i < prefix.length; i++) {
            console.log('PROCESSING: ', currentNode);
            let childNode = currentNode.getChild(prefix[i].toLowerCase());
            if (childNode === undefined) {
                return undefined;
            } else {
                currentNode = childNode;
            }
        }

        return currentNode;
    }

    insert(word: string) {
        let currentNode = this.root;
        let lowercaseWord = word.toLowerCase();

        for (let i = 0; i < lowercaseWord.length; i++) {
            let childNode = currentNode.getChild(lowercaseWord[i]);
            if (childNode === undefined) {
                let newTrieNode = new TrieNode();
                currentNode.insertChild(lowercaseWord[i], newTrieNode);
                currentNode = newTrieNode;
            } else {
                currentNode = childNode;
            }

        }
    
        currentNode.insertChild(END, undefined);
    }

    insertAll(words: Array<string>) {
        words.forEach((word) => {
            this.insert(word);
        })
    }

    getWords(prefix: string) {
        let startNode = this.getStartNode(prefix);
        if (startNode !== undefined) {
            return this.lookup(startNode, prefix);
        } 

        return [];
    }

}

export { Trie }