const readline = require('readline');

function binarySearch(array, target) {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (array[mid] === target) {
            return mid;
        }

        if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}

function startBinarySearch() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    console.log(`The array: [${sortedArray.join(', ')}]`);

    rl.question('Enter the target element: ', (input) => {
        const target = parseInt(input, 10);

        if (isNaN(target)) {
            console.log('Please enter a valid number.');
        } else {
            const index = binarySearch(sortedArray, target);

            if (index !== -1) {
                console.log(`Element ${target} is found at index ${index}.`);
            } else {
                console.log(`Element ${target} is not in the array.`);
            }
        }

        rl.close();
    });
}

startBinarySearch();