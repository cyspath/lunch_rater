### Heroku URL
https://protected-atoll-95594.herokuapp.com

### Features:
parses Guardant Health lunch menu from https://docs.google.com/spreadsheets/d/1VhHL-5Oq9Y9kceM-qcFBf-zlfdyEVvog76WFw52uBYc/pubhtml
updates realtime of food's rating

### git ignore
$ touch .gitignore
```
/node_modules
npm-debug.log
.DS_Store
/*.env
```
### Running the App
locally: $ node ./bin/www
locally with heroku: $ heroku local web

### deployment
App deployment guide: https://devcenter.heroku.com/articles/deploying-nodejs

```
heroku login
Enter your Heroku credentials.
...
$ heroku create
Creating arcane-lowlands-8408... done, stack is cedar
http://arcane-lowlands-8408.herokuapp.com/ | git@heroku.com:arcane-lowlands-8408.git
Git remote heroku added
$ git push heroku master
...
-----> Node.js app detected
...
-----> Launching... done
      http://arcane-lowlands-8408.herokuapp.com deployed to Heroku
```
