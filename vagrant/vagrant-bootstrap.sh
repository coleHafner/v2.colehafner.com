#friendly up passed vars
HOST=$2
APP_ROOT=$3
CLIENT_ROOT=$4
MYSQL_PASSWORD='vagrant'
DOC_ROOT='/var/www/'
APP_CONFIG_PATH=$DOC_ROOT'config'

#Prevent debconf from having to look for stdin
export DEBIAN_FRONTEND=noninteractive
sudo debconf-set-selections <<< "grub-pc	grub-pc/install_devices	multiselect	/dev/sda"
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password password $MYSQL_PASSWORD"
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password_again password $MYSQL_PASSWORD"

#LAMP SETUP

# update / upgrade
sudo apt-get update
sudo apt-get -y upgrade

# install apache 2.x and php 5.x
sudo apt-get install -y apache2
sudo apt-get install -y php5
sudo apt-get install libapache2-mod-php5

# install php dev tools (necessary for some other shit)
sudo apt-get install -y php5-dev

# install mysql
sudo apt-get install -y mysql-server
sudo apt-get install -y php5-mysqlnd

#LAMP EXTRAS

# install gd and/or image magic
sudo apt-get install -y php5-gd

# install dumb old mcrypt
sudo apt-get install -y mcrypt php5-mcrypt
sudo php5enmod mcrypt

# install imap for php
sudo apt-get install -y libc-client-dev
sudo apt-get install -y php5-imap
sudo php5enmod imap

# install curl
sudo apt-get install -y curl
sudo apt-get install -y php5-curl

#install server utils
sudo apt-get install -y vim
sudo apt-get install -y htop

# enable apache mods
sudo a2enmod headers
sudo a2enmod php5
sudo a2enmod rewrite

# install node.js
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install -y nodejs

# install grunt & bower
sudo npm install -g bower
sudo npm install -g grunt
sudo npm install -g grunt-cli
cd /var/www/$CLIENT_ROOT
bower install --allow-root

# Install Mailcatcher and run it on port 1080
sudo apt-get -y install ruby-dev libsqlite3-dev
sudo gem install mailcatcher
mailcatcher --http-ip=0.0.0.0

# VHOST CONFIG
# setup hosts file
VHOST=$(cat <<EOF
<Directory /var/www/$APP_ROOT>
    AllowOverride All
    Order Allow,Deny
    Allow from All
</Directory>
<VirtualHost *:80>
    ServerName $HOST
    DocumentRoot /var/www/$APP_ROOT/
</VirtualHost>
EOF
)
echo "${VHOST}" > /etc/apache2/sites-available/$HOST.conf

#start site
sudo a2dissite 000-default.conf
sudo a2ensite $HOST.conf

# Load Application Local Config
if [ ! -f $APP_CONFIG_PATH/connections.ini ]; then
	cp $APP_CONFIG_PATH/connections.ini.sample $APP_CONFIG_PATH/connections.ini
	echo "Please configure your connections.ini at $APP_CONFIG_PATH/connections.ini"
fi

if [ ! -f $APP_CONFIG_PATH/local-config.php ]; then
	cp $APP_CONFIG_PATH/local-config.php.sample $APP_CONFIG_PATH/local-config.php
	echo "Please configure your local-config.php at $APP_CONFIG_PATH/local-config.php"
fi

if [ ! -f $DOC_ROOT/vagrant/local-vagrant-bootstrap.sh ]; then
	cp $DOC_ROOT/vagrant/local-vagrant-bootstrap.sh.sample $DOC_ROOT/vagrant/local-vagrant-bootstrap.sh
fi

. $DOC_ROOT/vagrant/local-vagrant-bootstrap.sh

service apache2 reload