FROM node:18-alpine3.16 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src /app/src
COPY prisma /app/prisma

FROM node:18-alpine3.16

ENV NODE_PORT=3000
ENV NODE_ENV=production
WORKDIR /app

EXPOSE 3000

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./

RUN npx prisma generate

CMD [ "npm", "run", "dev" ]
