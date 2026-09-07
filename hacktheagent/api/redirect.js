module.exports = (req, res) => {
  if (typeof res.redirect === 'function') {
    return res.redirect(302, "http://localhost:5000/hackaicon_ethiack_1337_lmao");
  }
  res.writeHead(302, { Location: "http://localhost:5000/hackaicon_ethiack_1337_lmao" });
  res.end();
};


