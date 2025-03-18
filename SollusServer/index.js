import dotenv from 'dotenv';
import express from 'express';

import api from 'fastify'
const fastify = api({ logger: true })

fastify.post('/cadastrar', async (request, reply) => {
  const {email, senha} = request.body // Pega o email e senha do body
  reply.status(201).send({response: email})
})

// Run the server!
try {
  await fastify.listen({ port: 5000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}