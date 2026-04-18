const axios = require('axios');
const dns = require('dns');

// Force IPv4
dns.setDefaultResultOrder('ipv4first');

axios.get('https://api.themoviedb.org/3/trending/all/week?api_key=7b74f90ee20dbd73f24ad60a364e927e')
  .then(res => console.log('Success!', res.status))
  .catch(err => console.log('Failed:', err.message));
