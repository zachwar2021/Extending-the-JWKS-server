const express = require('express');
const jwt = require('jsonwebtoken');
const jose = require('node-jose');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 8080;

let keyPair;
let expiredKeyPair;
let token;
let expiredToken;

// Initialize SQLite database and create the keys table
let db = new sqlite3.Database('totally_not_my_privateKeys.db');

// Function to create the keys table
db.run(`CREATE TABLE IF NOT EXISTS keys(
    kid INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT NOT NULL,
    exp INTEGER NOT NULL
)`);

// RSA public and private key pair generation
async function generateKeyPairs() {
  keyPair = await jose.JWK.createKey('RSA', 2048, { alg: 'RS256', use: 'sig' });
  expiredKeyPair = await jose.JWK.createKey('RSA', 2048, { alg: 'RS256', use: 'sig' });

    let publicKeyPEM = keyPair.toPEM();
    let privateKeyPEM = keyPair.toPEM(true);
    let expiredPrivateKeyPEM = expiredKeyPair.toPEM(true);

    // Save key pairs to the database
    db.run(`INSERT INTO keys (key, exp) VALUES (?, ?)`, [privateKeyPEM, Math.floor(Date.now() / 1000) + 3600]);
    db.run(`INSERT INTO keys (key, exp) VALUES (?, ?)`, [expiredPrivateKeyPEM, Math.floor(Date.now() / 1000) - 3600]);
}

function generateToken() {
  const payload = {
    user: 'sampleUser',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600
  };
  const options = {
    algorithm: 'RS256',
    header: {
      typ: 'JWT',
      alg: 'RS256',
      kid: keyPair.kid
    }
  };

  token = jwt.sign(payload, keyPair.toPEM(true), options);
}

function generateExpiredJWT() {
  const payload = {
    user: 'sampleUser',
    iat: Math.floor(Date.now() / 1000) - 30000,
    exp: Math.floor(Date.now() / 1000) - 3600
  };
  const options = {
    algorithm: 'RS256',
    header: {
      typ: 'JWT',
      alg: 'RS256',
      kid: expiredKeyPair.kid
    }
  };

  expiredToken = jwt.sign(payload, expiredKeyPair.toPEM(true), options);
}

// /auth endpoint's for get, put, delete, patch, head
app.all('/auth', (req, res, next) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }
  next();
});


//JWKS endpoints for head, post, put, delete, patch
app.all('/.well-known/jwks.json', (req, res, next) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }
  next();
});

// RESTful JWKS(/.well-known/jwks.json) endpoint that issues jwks
app.get('/.well-known/jwks.json', (req, res) => {
  const validKeys = keyPair ? [keyPair].filter(key => !key.expired) : [];
  res.setHeader('Content-Type', 'application/json');
  res.json({ keys: validKeys.map(key => key.toJSON()) });
});

app.post('/auth', (req, res) => {

  if (req.query.expired === 'true'){
    return res.send(expiredToken);
  }
  //console.log(keyPair.toPEM());
  res.send(token);
});

generateKeyPairs().then(() => {
  generateToken()
  generateExpiredJWT()
  
});

const server = app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

//this is the tester.js file
module.exports = {app,server};