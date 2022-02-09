const login = async (req, res) => [res.send("Dummy Register and Login Route")];

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  // get random numbers between 1 and 100
  res.status(200).json({
    message: `Hello Placeholder User`,
    secret: `Here is your authorised data, your lucky number is ${luckyNumber}`,
  });
};

export { login, dashboard };
