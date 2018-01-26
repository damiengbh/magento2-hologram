# HOLOGRAM POUR MAGENTO 2

Petit guide pour l'install et le déploiement d'Hologram

## INSTALL D'HOLOGRAM

### 1. Installer Ruby

Télécharger la dernière version du RubyInstaller : 
https://rubyinstaller.org/downloads/

### 2. Installer RubyGem
https://rubygems.org/pages/download?locale=fr

### 3. Installer hologram via Gem
`gem install hologram`


## INIT DU REPO
#### 1. Installer les dépendances (dont gulp-hologram)
`npm install`

#### 2. Créer le styleguide
`hologram -c hologram_config.yml`

#### 3. Lancer gulp (watch est dans la task gulp) 
`gulp`

#### 4. Aller sur 
http://localhost:3000

#### 5. Pour du local , penser à configurer Wamp en mettant comme chemin 
CHEMINDUREPO/styleguide


## COMMANDES POUR DEPLOYER LE STYLEGUIDE

#### Supprimer le répertoire styleguide
`gulp clear`

#### Créer le styleguide
`hologram -c hologram_config.yml`

#### Init le styleguide 
`hologram init`
(attention, cela crée le fichier hologram_config.yml avec les paramètres par défaut)


## THEME HOLOGRAM DE BASE
https://github.com/wearecube/hologram-github-theme

Lancer :
`npm install --save-dev hologram-github-theme`


## SOURCES

TUTO GULP ET HOLOGRAM :
https://blog.thebrickfactory.com/2016/09/generate-style-guide-using-hologram-gulp/

GULP HOLOGRAM
https://www.npmjs.com/package/gulp-hologram

SITE OFFICIEL
http://trulia.github.io/hologram/

UN BON KIT FRONT
https://github.com/jsheffers/frontend_starter_kit