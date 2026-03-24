// server.test.js - Basic tests for the Express server
describe('Express Server Configuration', () => {
    test('should be able to require express', () => {
        const express = require('express');
        expect(express).toBeDefined();
    });

    test('should be able to require cors', () => {
        const cors = require('cors');
        expect(cors).toBeDefined();
    });

    test('should be able to require pg', () => {
        const { Pool } = require('pg');
        expect(Pool).toBeDefined();
    });

    test('should be able to require dotenv', () => {
        const dotenv = require('dotenv');
        expect(dotenv).toBeDefined();
    });
});

describe('Basic Server Setup', () => {
    test('all required dependencies are installed', () => {
        const packageJson = require('./package.json');
        expect(packageJson.dependencies.express).toBeDefined();
        expect(packageJson.dependencies.cors).toBeDefined();
        expect(packageJson.dependencies.pg).toBeDefined();
        expect(packageJson.dependencies.dotenv).toBeDefined();
    });

    test('package.json has required scripts', () => {
        const packageJson = require('./package.json');
        expect(packageJson.scripts.start).toBeDefined();
        expect(packageJson.scripts.test).toBeDefined();
    });
});
