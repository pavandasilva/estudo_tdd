const request = require('supertest');
const app = require('../app');
const bcrypt = require('bcrypt');

const howManyFields = 4; //quatidade de campos que deve ser retornado quando busca usuários e quando insere um novo usuário

const getStatusError = (status) => (status === 400 || status === 500 ? true : false);
	
describe('Rota de usuarios /usuarios', () => {
	it('Deve retornar status 200 e trazer todos os usuarios, se houverem', async () => {
		const response = await request(app).get('/usuarios');
		var usuarios = Object.values(response.body);

		for (let usuario of usuarios) {
			expect(typeof usuario.usuario_id).toBe('number');
			expect(typeof usuario.nome).toBe('string');
			expect(typeof usuario.dt_cadastro).toBe('string');
			expect(typeof usuario.email).toBe('string');
			expect(Number(Object.values(usuario).length)).toBe(howManyFields);
		}
	});


	it('Deve inserir um novo usuário, retornar status 201 e dados do usuário', async () => {
		try{
			const response = await request(app).post('/usuarios').send({ email: 'rogerio_pavan@hotmail.com', nome: 'Rogério Pavan', senha: '1234' });

			if (response.statusCode === 201) {
				expect(typeof response.body.usuario_id).toBe('number');
				expect(typeof response.body.nome).toBe('string');
				expect(typeof response.body.dt_cadastro).toBe('string');
				expect(typeof response.body.email).toBe('string');
				expect(Number(Object.values(response.body).length)).toBe(howManyFields);
			}

		} catch ( error ) {
			expect(typeof JSON.parse(error.response.text).error).toBe('string');
			expect(getStatusError(error.status)).toBe(true);
		/* 	expect(getStatusError(error.text)).toBe('Email já cadastrado'); */
		}
	});

	it('Deve dar erro 400 ao tentar inserir usuário com um email já cadastrado', async () => {
		try{
			await request(app).post('/usuarios').send({ email: 'rogerio_pavan@hotmail.com', nome: 'Rogério Pavan', senha: '1234' });
		} catch ( error ) {
			expect(typeof JSON.parse(error.response.text).error).toBe('string');
			expect(getStatusError(error.status)).toBe(true);
		}
	})

	it('Deve dar erro 400 ao tentar inserir usuário sem os dados obrigatórios preenchidos', async () => {
		try{
			await request(app).post('/usuarios');
		} catch ( error ) {
			expect(typeof JSON.parse(error.response.text).error).toBe('string');
			expect(error.status).toBe(400);
		}
	});

	it('Deve dar erro 500 ao ocorrer outro erro no servidor diferente dos anteriores', async () => {
		try{
			await request(app).post('/usuarios').send({ email: true, nome: 422, senha: 8});
		} catch ( error ) {
			expect(typeof JSON.parse(error.response.text).error).toBe('string');
			expect(error.status).toBe(500);
		}
	})
});