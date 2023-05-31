# Shopido
### There are 2 directories named as 'Shopido' and 'Shopido Backend'.
For running the backend, follow the below steps:
1. install XAMPP
2. install Node Js (node version - 16.14.0, npm version 8.3.1)
3. install VSCode (Editor)
4. Open XAMPP as administrator
5. start MYSQL and Apache Server
6. Open http://localhost/phpmyadmin/index.php?route=/server/databases in your browser
7. Import the provided 127_0_0_1.sql file in the phpmyadmin.
8. Open cmd
9. Run the following commands
10. cd Shopido Backend
11. cd Shopido
12. npm i
13. code .
14. Enter your database credentials in every service i.e. AirConditionarService.js, ClothService.js, MobileService.js, footwearService.js, furnitureService.js etc.
15. open 4 terminals in the same directory.
16. Run cd Backend in every terminal
17. In terminal 1 run nodemon server1.js
18. In terminal 2 run nodemon server2.js
19. In terminal 3 run nodemon server3.js
20. In terminal 4 run nodemon app.js

The servers and the gateway is now running.
## Now to run the frontend follow the below steps:
1. Open the vsCode in the same directory.
2. Go to extensions in the VSCode and download the extension named as 'live server'
3. After installation a option to 'Go live' will appear in the bottom on the VS Code.
4. Now open the auth.html and click on the live server.

