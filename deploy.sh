#!/bin/sh

if [ "$1" != "-DskipBuild" ]; then
mvn clean package -DskipTests
fi

HOST="10.30.82.159"
USERNAME="fusion"


#scp target/home-angular-*.jar "$USERNAME"@"$HOST":/u01/wk/mywork/home-angular/home-angular.jar 
rsync -vzP target/home-angular-*.jar "$USERNAME"@"$HOST":/u01/wk/mywork/home-angular/home-angular.jar
ssh -T "$USERNAME"@"$HOST" <<'ENDSSH'
ps aux | grep -i "\-jar [h]ome.*jar" | awk '{print $2}' | xargs --no-run-if-empty kill -9
cd /u01/wk/mywork/home-angular/
rm -rf home.jar
cp home-angular.jar home.jar
nohup /usr/bin/java -jar home.jar &
ENDSSH
