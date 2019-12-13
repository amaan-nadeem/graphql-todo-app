// import app from '../app';
const app = require("../app");
// import supertest from 'supertest';
const supertest = require('supertest')
const request = supertest(app);


describe("Adding todo", () => {
    it("todo added to a database", async done => {
        
        const correctResponse = await request.post('/api/v1/create-todo').send({title: "Job title", description: "To do something in life", isCompleted: true});
        expect(correctResponse.status).toBe(200);
        expect(correctResponse.body).toBeDefined();
                  
        done();
    })
    it("todo not added to a database due to wrong body", async done => {
        const response = await request.post('/api/v1/create-todo').send({description: "To do something in life"});
        expect(response.status).toBe(400);
        expect(response.body).toBeDefined();
        done(); 
    });
    it("Accessing wrong route", async done => {
        const response = await request.post('/api/v1/create-tod').send({title: "Job title", description: "To do something in life"});
        expect(response.status).toBe(404);
        done();
    })
});


describe("Getting todos", () => {
    it("todos", async done => {
        const response = await request.get('/api/v1/get-todos');
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();     
        done();
    })
    it("accessing wrong route", async done => {
        const response = await request.get('/api/v1/gt-todo');
        expect(response.status).toBe(404);     
        done();
    })
});


describe("Updating todo", () => {
    it("task updated in database", async done => {       
        const correctResponse = await request.put('/api/v1/update-todo/5dee97ccdedce535f44df236').send({title: "Job", description: "To do something in life", isCompleted: true});
        expect(correctResponse.status).toBe(200);
        expect(correctResponse.body).toBeDefined();
                  
        done();
    })
    it("todo not added to a database due to sending wrong body", async done => {
        const response = await request.put('/api/v1/update-todo/5dee97ccdedce535f44df236').send({description: "To do something in life"});
        expect(response.status).toBe(400);
        expect(response.body).toBeDefined();
        done(); 
    });
    it("Accessing wrong route", async done => {
        const response = await request.put('/api/v1/update-tod').send({title: "Job title", description: "To do something in life"});
        expect(response.status).toBe(404);
        done();
    })
    it("Id attached to api is invalid", async done => {
        const response = await request.put('/api/v1/update-todo/5dee97ccdedce535f44df23').send({title: "Job title", description: "To do something in life"});
        expect(response.status).toBe(400);
        done();
    })
});

describe("Deleting todo", () => {
    it("todo deleted in database", async done => {       
        const correctResponse = await request.delete('/api/v1/delete-todo/5dee97ccdedce535f44df236')
        expect(correctResponse.status).toBe(200);
        expect(correctResponse.body).toBeDefined();
                  
        done();
    })
    it("Accessing wrong route", async done => {
        const response = await request.put('/api/v1/delete-tod')
        expect(response.status).toBe(404);
        done();
    })
    it("Id attached to api is invalid", async done => {
        const response = await request.delete('/api/v1/delete-todo/5dee97ccdedce535f44df23')
        expect(response.status).toBe(400);
        done();
    })
});
