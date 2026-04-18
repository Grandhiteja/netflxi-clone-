const axios = require('axios');

axios.get('https://api.tmdb.org/3/trending/all/week?api_key=7b74f90ee20dbd73f24ad60a364e927e')
  .then(res => console.log('Success!', res.status, res.data.results[0].title || res.data.results[0].name))
  .catch(err => console.log('Failed:', err.message));
