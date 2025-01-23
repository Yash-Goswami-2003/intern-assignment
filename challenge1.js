const fs = require('fs');
const readline = require('readline');
const { distance } = require('fastest-levenshtein');

function readFileContent(fileName) {
    try {
        const content = fs.readFileSync(fileName, 'utf-8');
        return content.split(/\r?\n/).filter(line => line.trim() !== '');
    } catch (error) {
        console.error('Error reading file:', error.message);
        process.exit(1);
    }
}

function getSimilarWords(inputWord, wordsList, limit) {
    const rankedWords = wordsList.map(word => ({
        word,
        score: distance(inputWord, word),
    }));

    rankedWords.sort((a, b) => a.score - b.score);

    return rankedWords.slice(0, limit).map(entry => entry.word);
}

async function startInteractiveMode(wordsList) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    console.log('Enter a word to find similar matches (type "exit" to quit):');

    for await (const userInput of rl) {
        const word = userInput.trim();

        if (word.toLowerCase() === 'exit') {
            console.log('Goodbye!');
            rl.close();
            break;
        }

        if (word.length === 0) {
            console.log('Please enter a valid word.');
            continue;
        }

        const matches = getSimilarWords(word, wordsList, 3);
        console.log(`Suggestions for "${word}":`, matches.join(', ') || 'No matches found');
    }
}

const fileName = 'strings.txt';
const wordsList = readFileContent(fileName);

console.log(`Loaded ${wordsList.length} words from file.`);

startInteractiveMode(wordsList);
