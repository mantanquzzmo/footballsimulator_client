import JtockAuth from "j-tockauth";

const auth = new JtockAuth({
  host: "http://localhost:3000/api",
  debug: false
});

export default auth;
