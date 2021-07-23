import app from "../app.js";
import request from "supertest";
import { jest } from "@jest/globals";

import BookRepository from '../repositories/book.repository.js';
import ClientRepository from '../repositories/cliente.repository.js';
import AuthorRepository from '../repositories/author.repository.js';
import SaleRepository from '../repositories/sale.repository.js';


jest.setTimeout(30000);

test('Cadastro de Autor', async ()=>{
    // SETUP
    const autor = {
        nome:"Antonio teste",
        email: "ant@ant.comteste",
        telefone:"111teste"
    };

    const livro = {
        nome:"livro teste",
        valor: 99.99,
        estoque:10,
        autorId: null
    };

    const cliente = {
        nome:"cliente teste",
        email: "tonio",
        senha:"123456",
        telefone:"cliente111teste",
        endereco:"rua do cliente teste"
    };

    const venda = {
        valor: 99.99,
        data: "2001-01-01",
        clienteId: null,
        livroId: null
    };

    const admin = 'admin';
    const pwdAdmin = 'admin';
    let emailCliente = 'tonio';
    let pwdCliente = '1234';

    let res = await request(app).post("/author").send(autor).auth(admin,pwdAdmin);
    autor.autorId = res.body.autorId;
    expect(res.body).toMatchObject(autor);
    expect(res.status).toBe(200);

    res = await request(app).get(`/author/${autor.autorId}`).auth(admin,pwdAdmin);
    expect(res.body).toMatchObject(autor);
    expect(res.status).toBe(200);

    livro.autorId = autor.autorId;
    res = await request(app).post("/book").send(livro).auth(admin,pwdAdmin);
    livro.livroId = res.body.livroId;
    livro.valor = ""+livro.valor;
    expect(res.body).toMatchObject(livro);
    expect(res.status).toBe(200);

    res = await request(app).get(`/book/${livro.livroId}`).auth(admin,pwdAdmin);
    expect(res.body).toMatchObject(livro);
    expect(res.status).toBe(200);

    res = await request(app).post("/client").send(cliente).auth(admin,pwdAdmin);
    cliente.clienteId = res.body.clienteId;
    delete cliente.senha;
    expect(res.body).toMatchObject(cliente);
    expect(res.status).toBe(200);

    res = await request(app).get(`/client/${cliente.clienteId}`).auth(admin,pwdAdmin);
    expect(res.body).toMatchObject(cliente);
    expect(res.status).toBe(200);

    res = await request(app).get(`/book/${livro.livroId}`).auth(emailCliente, pwdCliente);
    expect(res.body).toMatchObject(livro);
    expect(res.status).toBe(200);

    venda.clienteId = cliente.clienteId;
    venda.livroId = livro.livroId;
    res = await request(app).post("/sale").send(venda).auth(emailCliente,pwdCliente);
    venda.vendaId = res.body.vendaId;
    venda.valor = ""+venda.valor;
    venda.data = venda.data + "T00:00:00.000Z";
    expect(res.body).toMatchObject(venda);
    expect(res.status).toBe(200);

    res = await request(app).get(`/sale/${venda.vendaId}`).auth(admin,pwdAdmin);
    expect(res.body).toMatchObject(venda);
    expect(res.status).toBe(200);

    await SaleRepository.deleteSale(venda.vendaId);
    await BookRepository.deleteBook(livro.livroId);
    await AuthorRepository.deleteAuthor(autor.autorId);
    await ClientRepository.deleteCliente(cliente.clienteId);

});