# HOLOGRAM POUR MAGENTO 2

## INSTALL D'HOLOGRAM EN LOCAL

### INSTALLATION DE RUBY

Télécharger la dernière version du RubyInstaller : 
https://rubyinstaller.org/downloads/

Installer dans C:/Ruby/

### INSTALLER LE DEV KIT RUBY

https://github.com/oneclick/rubyinstaller/wiki/Development-Kit#installation-instructions

Ajouter les lignes dans C:\Ruby\config.yml
---
- C:/Ruby/Ruby25-x64

### INSTALLER GEM
https://rubygems.org/pages/download?locale=fr

### GEM ET SON HTTPS BUG
Pour éviter le pb de https
(https://gist.github.com/eyecatchup/20a494dff3094059d71d)

#### 1. Add insecure source
> gem sources -a http://rubygems.org/
https://rubygems.org is recommended for security over http://rubygems.org/

Do you want to add this insecure source? [yn]  y
http://rubygems.org/ added to sources

#### 2. Remove secure source
> gem sources -r https://rubygems.org/
https://rubygems.org/ removed from sources

#### 3. Update source cache
> gem sources -u
source cache successfully updated


### FINAL STEPS
#### 1. Installer bundler
> gem install bundler

#### 2. Installer redcarpet
> gem install redcarpet --platform=ruby --verbose

#### 3. Installer hologram
> gem install hologram


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
Front-end Starter Kit
https://github.com/jsheffers/frontend_starter_kit

TUTO GULP ET HOLOGRAM :
https://blog.thebrickfactory.com/2016/09/generate-style-guide-using-hologram-gulp/

GULP HOLOGRAM
https://www.npmjs.com/package/gulp-hologram

SITE OFFICIEL
http://trulia.github.io/hologram/