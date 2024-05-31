import * as readline from 'readline';
import * as fs from 'fs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to take user input for name and age
function takeUserInput(): void {
  rl.question('Enter your name: ', (name: string) => {
    rl.question('Enter your age: ', (age: string) => {
      const userData = { name, age };
      const userDataString = JSON.stringify(userData, null, 2);

      // Append user data to a text file
      fs.appendFile('userData.txt', userDataString + '\n', (err) => {
        if (err) {
          console.error('Error appending to file:', err);
        } else {
          console.log('User data appended to userData.txt');
        }
        rl.close();
      });
    });
  });
}

// Call the function to take user input
takeUserInput();
