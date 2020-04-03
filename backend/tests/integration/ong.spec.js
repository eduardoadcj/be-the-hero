const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {

    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    })

    afterAll( async () => {
        await connection.destroy();
    })

    it('should be able to create a new ONG', async () => {
        const resp = await request(app).post('/ongs').send({
            name: "APDE",
            email: "eduardo@hotmail.com",
            whatsapp: "2323423234",
            city: "Paranavaí",
            uf: "PR"
        });
        
        expect(resp.body).toHaveProperty('id');
        expect(resp.body.id).toHaveLength(8);

    })
})