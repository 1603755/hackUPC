!#/bin/bash
sudo apt-get install python3
sudo apt-get install python3-pip
sudo apt-get install apache2
sudo apt-get install libapache2-mod-wsgi-py3
sudo pip3 install flask, numpy, pandas
sudo apt install git
git clone https://github.com/1603755/hackUPC.git
cd ~
sudo ln -sT ~/server /var/www/html/hackUPC

data= head -13 /etc/apache2/sites-enabled/000-default.conf
data+= "WSGIDaemonProcess server threads=5
        WSGIScriptAlias / /var/www/html/server/server.wsgi
        WSGIApplicationGroup %{GLOBAL}
        <Directory flaskapp>
             WSGIProcessGroup server
             WSGIApplicationGroup %{GLOBAL}
             Order deny,allow
             Allow from all 
        </Directory>"
data+= tail -14 /etc/apache2/sites-enabled/000-default.conf 
echo $data > /etc/apache2/sites-enabled/000-default.conf
sudo service apache2 restart

