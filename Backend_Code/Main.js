function generateRandomNumbers(min, max, count) {
  let randomNumbers = [];

  for (let i = 0; i < count; i++) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
}

main()
{
  const min = 1;
  const max = 612;
  const count = 9;

  const randomNumbers = generateRandomNumbers(min, max, count);
  do{
    
  }while(randomNumbers != null)

};

