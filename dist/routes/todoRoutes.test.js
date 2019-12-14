"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import app from '../app';
const app = require("../app");
// import supertest from 'supertest';
const supertest = require('supertest');
const request = supertest(app);
describe("Adding todo", () => {
    it("todo added to a database", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const correctResponse = yield request.post('/api/v1/create-todo').send({ title: "Job title", description: "To do something in life", isCompleted: true });
        expect(correctResponse.status).toBe(200);
        expect(correctResponse.body).toBeDefined();
        done();
    }));
    it("todo not added to a database due to wrong body", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/api/v1/create-todo').send({ description: "To do something in life" });
        expect(response.status).toBe(400);
        expect(response.body).toBeDefined();
        done();
    }));
    it("Accessing wrong route", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/api/v1/create-tod').send({ title: "Job title", description: "To do something in life" });
        expect(response.status).toBe(404);
        done();
    }));
});
describe("Getting todos", () => {
    it("todos", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/v1/get-todos');
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        done();
    }));
    it("accessing wrong route", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/v1/gt-todo');
        expect(response.status).toBe(404);
        done();
    }));
});
describe("Updating todo", () => {
    it("task updated in database", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const correctResponse = yield request.put('/api/v1/update-todo/5dee97ccdedce535f44df236').send({ title: "Job", description: "To do something in life", isCompleted: true });
        expect(correctResponse.status).toBe(200);
        expect(correctResponse.body).toBeDefined();
        done();
    }));
    it("todo not added to a database due to sending wrong body", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.put('/api/v1/update-todo/5dee97ccdedce535f44df236').send({ description: "To do something in life" });
        expect(response.status).toBe(400);
        expect(response.body).toBeDefined();
        done();
    }));
    it("Accessing wrong route", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.put('/api/v1/update-tod').send({ title: "Job title", description: "To do something in life" });
        expect(response.status).toBe(404);
        done();
    }));
    it("Id attached to api is invalid", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.put('/api/v1/update-todo/5dee97ccdedce535f44df23').send({ title: "Job title", description: "To do something in life" });
        expect(response.status).toBe(400);
        done();
    }));
});
describe("Deleting todo", () => {
    it("todo deleted in database", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const correctResponse = yield request.delete('/api/v1/delete-todo/5dee97ccdedce535f44df236');
        expect(correctResponse.status).toBe(200);
        expect(correctResponse.body).toBeDefined();
        done();
    }));
    it("Accessing wrong route", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.put('/api/v1/delete-tod');
        expect(response.status).toBe(404);
        done();
    }));
    it("Id attached to api is invalid", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete('/api/v1/delete-todo/5dee97ccdedce535f44df23');
        expect(response.status).toBe(400);
        done();
    }));
});
