# Obvision BOT (OPEN SOURCE PROJECT)

> (Instruction pour les utilisateurs français)

## Configuration

### Dans le fichier config.json (racine du document) 
```json
{
    "token":"YOUR TOKEN",
    "owner": {
        "id": "YOUR ID"
    },
    "owners": [
        "SOME ID",
        "SOME ID"
    ]
}
```

> Remplacé "YOUR TOKEN" par votre token de bot, et YOUR ID et SOME ID, avec les IDs des propriétaire du robot

### Dans le fichier index.js > Ligne 24
```js
 const db = mysql.createPool({ host: "YOUR HOST", port: "3306", user:  "YOUR USER", password:  "YOUR PASS", database:  "YOUR DATABASE", waitForConnections: true, connectionLimit: 10, queueLimit: 0 });
```

Remplacé les informations entre guillement par vos informations de connexion

### Dans le fichier /commands/vocal/tts.js > ligne 7
```js
  var subscriptionKey = "YOUR subscriptionKey";
```

https://azure.microsoft.com/fr-fr/services/cognitive-services/text-to-speech/ rendez vous à cette URL et souscrivez à un abonnement pour obtenir une clé "susbcriptionKey" tout est indiqué sur la documentation Azure

Autrement la commande tts ne sera pas fonctionnel

## Installation

### Mettre en place les fichier du robot

Sur un environnement Cloud ou un VPS (Le bot ne peut pas fonctionné sur un environnement Docker Type pterodactyl)
Cloné le repo, en le téléchargeant et en téléversant les fichiers là ou ce trouve le robot
### Installé les scripts néscessaire 

```sh
sudo apt install curl npm -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
nvm install 16.6.0
nvm use 16.6.0
npm i -g npm@latest
```
### Installé les fichier de base de donnée

Récupèré le fichier "obvision.sql" et importé le dans votre gestionnaire de base de donnée SQL (phpmyadmin ou Adminer) et importé y le fichier

### Démarré le robot
Deux options s'offre à vous installé le bot à l'aide des scripts ou manuellement
1. 
```sh
cd PATH/TO/YOUR/ROBOT
# 4 scripts sont présent dans le fichier package.json
# install (installe les module et pm2 afin de le lancé avec)
# start (démarre le bot avec pm2)
# install-without-pm2 (installe les modules et démarre le bot avec node)
# start-without-pm2 (démarre le bot avec node)
npm install
```
2. 
```sh
cd PATH/TO/YOUR/ROBOT
npm ci
npm i -g pm2
pm2 start index.js --name "your bot name"
# OU
npm ci
node index.js
```

> (Instruction for English users)

## Configuration

### In the config.json file (root of the document) 
```json
{
    "token": "YOUR TOKEN",
    "owner": {
        "id": "YOUR ID"
    },
    "owners": [
        "SOME ID",
        "SOME ID"
    ]
}
```

> Replace "YOUR TOKEN" by your bot token, and YOUR ID and SOME ID, with the bot owner IDs

### In the index.js file > Line 24

```js
 const db = mysql.createPool({ host: "YOUR HOST", port: "3306", user: "YOUR USER", password: "YOUR PASS", database: "YOUR DATABASE", waitForConnections: true, connectionLimit: 10, queueLimit: 0 });
```

Replace the information in quotes with your connection information

### In the file /commands/vocal/tts.js > line 7
```js
  var subscriptionKey = "YOUR subscriptionKey";
```

https://azure.microsoft.com/fr-fr/services/cognitive-services/text-to-speech/ go to this URL and subscribe to a subscription to get a "susbcriptionKey" everything is indicated on the Azure documentation

Otherwise the tts command will not work

## Installation

### Set up the robot files

On a Cloud environment or a VPS (The bot can not work on a Docker environment Type pterodactyl)
Clone the repo, downloading it and uploading the files where the bot is located
### Installed the necessary scripts 

```sh
sudo apt install curl npm -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
nvm install 16.6.0
nvm use 16.6.0
npm i -g npm@latest
```

### Installed the database files

Recovered the file "obvision.sql" and imported it in your SQL database manager (phpmyadmin or Adminer) and imported the file

### Start the bot
You have two options to install the bot using the scripts or manually
1. 
```sh
cd PATH/TO/YOUR/ROBOT
# 4 scripts are present in the package.json file
# install (installs the module and pm2 to launch it with)
# start (start the bot with pm2)
# install-without-pm2 (install the modules and start the bot with node)
# start-without-pm2 (start the bot with node)
npm install
```
2. 
```sh
cd PATH/TO/YOUR/ROBOT
npm ci
npm i -g pm2
pm2 start index.js --name "your bot name"
# OR
npm ci
node index.js
```