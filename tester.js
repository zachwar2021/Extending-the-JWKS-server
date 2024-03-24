const assert = require('assert');
const jwt = require('jsonwebtoken');
const request = require('supertest');
const express = require('express');
const {app,server} = require('./server.js');

describe('Test API endpoints', () => {

    before(async () => {
        // Wait for the server to start and generate key pairs before running tests
        await new Promise(resolve => setTimeout(resolve, 1000));
      });

    //test if the JWKS has key in it from the /.well-known/jwks.json
    it('should return JWKS when accessing /.well-known/jwks.json', (done) => {
        request(app)
          .get('/.well-known/jwks.json')
          .expect('Content-Type', /^application\/json/)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            // Assert that the response contains keys
            assert(res.body.keys && res.body.keys.length === 1, 'Invalid JWKS response');
        done();
          });
      });

    //test if there is a valid JWT token from the .post('/auth')
    it('should return a valid JWT token', (done) => {
        request(app)
            .post('/auth')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const token = res.text;
                const decodedToken = jwt.decode(token);
                assert.ok(decodedToken, 'Token should exist');
                const isExpired = decodedToken.payload?.exp < Math.floor(Date.now() / 1000);
                assert.strictEqual(isExpired, false, 'Token should not be expired');
            done();
        });
    });

  //test if there is a expired JWT token if requested from the .post('/auth')
  it('should return an expired JWT token if requested', (done) => {
    request(app)
      .post('/auth?expired=true')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const token = res.text;
        const decodedToken = jwt.decode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        assert.strictEqual(decodedToken.exp < currentTime, true); // Assert that the token is expired
        done();
      });
  });

  // tests for 405 code on unautherized acces to put, delete, pathc, and head of the /auth endpoints
  it('should return "Method Not Allowed" for /auth endpoint (GET, PUT, DELETE, PATCH, HEAD)', (done) => {
    const methods = ['get', 'put', 'delete', 'patch', 'head'];
    let count = 0;
  
    for (const method of methods) {
      request(app)
        [method]('/auth')
        .expect(405)
        .end((err, res) => {
          if (err) return done(err);
          count++;
  
          if (count === methods.length) {
            done();
          }
        });
    }
  });
  

  // test for 405 code on unautherized acces to put, delete, patach, and post for the JWKS endpoints 
  it('should return "Method Not Allowed" for JWKS endpoint (HEAD, PUT, DELETE, PATCH, POST)', (done) => {
    const methods = ['head', 'put', 'delete', 'patch', 'post'];
    let count = 0;
  
    for (const method of methods) {
      request(app)
        [method]('/.well-known/jwks.json')
        .expect(405)
        .end((err, res) => {
          if (err) return done(err);
          count++;
  
          if (count === methods.length) {
            done();
          }
        });
    }
  });

  
});
// Add more test cases as needed
after((done) => {
    // Close the server after all tests
    server.close(() => {
        console.log('Server closed.');
        done();
    });
});