# reveal.js [![Build Status](https://travis-ci.org/scips/reveal.js.svg?branch=master)](https://travis-ci.org/scips/reveal.js) <a href="https://slides.com?ref=github"><img src="https://s3.amazonaws.com/static.slid.es/images/slides-github-banner-320x40.png?1" alt="Slides" width="160" height="20"></a>

## Original version

https://github.com/hakimel/reveal.js

## Modification

In order to easily start a presentation:

1. Run the socket.io server and get a token


>     npm run socketio

2. Go to [http://localhost:1948/token](http://localhost:1948/token)
3. Copy the **secret** and paste it in ./Gruntfile.js line: 168 instead of MUST_REPLACE_THIS_PART (leave the \' alone)

>     content = content.replace('\'SECRET_UID\'','\'MUST_REPLACE_THIS_PART\'');

4. Copy the socketId and paste it in ./index.html line 148 (leave the ' alone)

> 			        id: 'fc5bac8456f4939d', // Obtained from socket.io server

5. Package everything to **./public** for the public verion and **./presenter** for the presenter version

>     npm run pack-pres

6. Run the presentation

>     npm run present


## TODO

Automate the whole task or put everything into a single server.js plugin and rewrite the plugin

## License

MIT licensed

Copyright (C) 2016 Hakim El Hattab, http://hakim.se
