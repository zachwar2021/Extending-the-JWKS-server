# Extending-the-JWKS-server
This server serves JWT and JWKSs to the client. They both include a key ID identifier. The JWT is served with a private key, and the JWKS is served with a public key. This is in the standard format for cryptographic keys in JSON format. All of this allows for a compact and URL-safe way to represent claims between the server and the client. Additionally it creates a SQLite3 database and stores the keys to its key table.

## Installation  and Running of The Server
1.  First, you will need to download the latest version of Nodejs. I am using version 20.11.1<br />
&nbsp;&nbsp;&nbsp;&nbsp;https://nodejs.org/en/download<br />

2.  Download everything from this repo in a zip and unzip it in a good location. Then make sure you are in the folder with the server.js<br />
3.  Then, install the dependencies:<br />
&nbsp;&nbsp;&nbsp;&nbsp;![image](https://github.com/zachwar2021/Extending-the-JWKS-server/assets/142929658/63414232-e9c3-4c1b-b73a-ed064545c817)


5.  To run the server, enter the following command.<br />
**Note:** The Port 8080 must be free of any program for the server to work.<br />
&nbsp;&nbsp;&nbsp;&nbsp;![image](https://github.com/zachwar2021/Extending-the-JWKS-server/assets/142929658/40f7eb83-282a-4f70-9c01-490887bedc1e)


 Now, the server should be running!! A 'totally_not_myprivateKeys.db' should be in your files<br />
 Example:![image](https://github.com/zachwar2021/Extending-the-JWKS-server/assets/142929658/16b14ec1-14ea-423e-a369-35f41b2d56c0)


To end the program press CTRL and C


## Installation and Running of the Tester
1.  Like before, you will need to download the latest version of Nodejs. If you already installed this you can skip this step<br />
&nbsp;&nbsp;&nbsp;&nbsp;https://nodejs.org/en/download<br />

2.  Make sure you are in the folder with the tester.js<br />
3.  Then install the dependencies:<br />
&nbsp;&nbsp;&nbsp;&nbsp;![image](https://github.com/zachwar2021/Extending-the-JWKS-server/assets/142929658/20d9c267-bea0-4df2-9df2-848f74c1e464)


4.  Make sure you have the package.json, package-lock.json, node_modules, and .nyc_output in your directory.<br />
5.  To run the tester, enter the following command.<br />
**Note:** This doesn not require the server to be running. It runns ther server itself while doing tests.<br />
&nbsp;&nbsp;&nbsp;&nbsp;![image](https://github.com/zachwar2021/Extending-the-JWKS-server/assets/142929658/7c7e7d62-8712-4b02-8a0b-39f30283cbae)


Now, the tester should run!!<br />
Example:![image](https://github.com/zachwar2021/Extending-the-JWKS-server/assets/142929658/3762db1f-0aca-44aa-9b79-88fe24f65fe6)

**When looking at the test coverage ignore the ALL files and Tester.js coverage percents. The proccess im using to count coverage does it for all the files.**



## Running the gradebot
1.  Follow the [Installation and Running of The Server](https://github.com/zachwar2021/Extending-the-JWKS-server/edit/main/README.md#installation--and-running-of-the-server) if you have not already
2.  The server must be running and output the following:<br />
&nbsp;&nbsp;&nbsp;&nbsp;![image](https://github.com/zachwar2021/JWKS-server/assets/142929658/d127bd4f-1700-411d-8f6f-41cc13cd18d5)

3.  Then, open a different terminal or powershell.
4.  To run grade bot enter the following command:<br />
&nbsp;&nbsp;&nbsp;&nbsp;![image](https://github.com/zachwar2021/Extending-the-JWKS-server/assets/142929658/3da4d057-ca25-4fdf-9979-5ff8a6d9db6d)


Now you have ran the gradebot!!<br />
Example:![image](https://github.com/zachwar2021/Extending-the-JWKS-server/assets/142929658/5f8c2d06-a29f-432e-8095-d1c5af2f89bd)





