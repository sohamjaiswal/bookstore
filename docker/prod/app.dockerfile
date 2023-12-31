FROM node:20-alpine

WORKDIR /app

COPY ../../app/package.json ./
COPY ../../app/yarn.lock ./

CMD yarn; npx zenstack generate && npx prisma db push; npx prisma generate; yarn build; yarn start:prod;
