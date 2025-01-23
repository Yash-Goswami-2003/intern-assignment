const fs = require('fs');

function calculateExpression(expression) {
    try {
        const cleanedExpression = expression.replace(/\^/g, '**').replace(/=/g, '').trim();
        const result = eval(cleanedExpression);
        return `${expression.trim()} ${result}`;
    } catch (err) {
        return `${expression.trim()} Error: Invalid expression`;
    }
}

function handleFile(inputPath, outputPath) {
    try {
        const lines = fs.readFileSync(inputPath, 'utf-8').split(/\r?\n/).filter(line => line.trim() !== '');
        const results = lines.map(calculateExpression);
        fs.writeFileSync(outputPath, results.join('\n'), 'utf-8');
        console.log(`Solved ${lines.length} expressions. Results saved in ${outputPath}.`);
    } catch (err) {
        console.error('Failed to process file:', err.message);
    }
}

const inputPath = 'expressions.txt';
const outputPath = 'results.txt';

handleFile(inputPath, outputPath);