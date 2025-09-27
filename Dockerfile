FROM node:16-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY . .

RUN npm ci --omit=dev

RUN cd client && npm install --omit=dev --legacy-peer-deps && npm run build

CMD ["npm", "run", "app"]

