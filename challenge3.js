const readline = require('readline');

function checkPalindrome(text) {
    const normalizedText = text.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const reversedText = normalizedText.split('').reverse().join('');
    return normalizedText === reversedText;
}

function startPalindromeChecker() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question('Enter a string: ', (userInput) => {
        if (checkPalindrome(userInput)) {
            console.log(`The string '${userInput}' is a palindrome.`);
        } else {
            console.log(`The string '${userInput}' is not a palindrome.`);
        }
        rl.close();
    });
}

startPalindromeChecker();