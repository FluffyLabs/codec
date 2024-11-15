FROM node:22 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
COPY . .
RUN npm ci
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV HOST=0.0.0.0

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/api.yaml ./api.yaml
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

RUN npm ci --production
EXPOSE 3000
CMD ["node", "dist/index.cjs"]
