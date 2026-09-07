export default function handler(req, res) {
  res.writeHead(302, { Location: "http://localhost:5000/ethiack_1337_lmao" });
  res.end();
}