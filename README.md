# HOLOGRAM POUR MAGENTO 2

Petit guide pour l'install et le déploiement d'Hologram

## INSTALL D'HOLOGRAM

### 1. INSTALLATION DE RUBY

Télécharger la dernière version du RubyInstaller : 
https://rubyinstaller.org/downloads/

### 2. INSTALLER RUBYGEM
https://rubygems.org/pages/download?locale=fr

### 3. INSTALL D'HOLOGRAM VIA GEM
gem install hologram


## INIT DU REPO
#### 1. Installer les dépendances (dont gulp-hologram)
> npm install

#### 2. Lancer gulp (watch est dans la task gulp) 
> gulp

#### 3. Aller sur 
> http://localhost:3000

#### 4. Penser à configurer Wamp en mettant comme chemin 
> CHEMINDUREPO/styleguide


## COMMANDES POUR DEPLOYER LE STYLEGUIDE

CLEAN THE STYLEGUIDE
> gulp clear

BUILD THE STYLEGUIDE
> hologram -c hologram_config.yml



## THEME HOLOGRAM DE BASE
https://github.com/wearecube/hologram-github-theme

Lancer :
> npm install --save-dev hologram-github-theme


## SOURCES

TUTO GULP ET HOLOGRAM :
https://blog.thebrickfactory.com/2016/09/generate-style-guide-using-hologram-gulp/

GULP HOLOGRAM
https://www.npmjs.com/package/gulp-hologram

SITE OFFICIEL
http://trulia.github.io/hologram/

UN BON KIT FRONT
https://github.com/jsheffers/frontend_starter_kit