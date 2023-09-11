FROM node:alpine AS base

RUN mkdir -p /usr/app/admin-service
WORKDIR /usr/app/admin-service

RUN apk update
RUN npm i -g pnpm

#--------- build stage -----------
FROM base AS builder

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

RUN pnpm build
RUN pnpm prune --prod

#------- release stage -----------
FROM base AS release

COPY --from=builder /usr/app/admin-service/dist ./dist
COPY --from=builder /usr/app/admin-service/node_modules ./node_modules
COPY --from=builder /usr/app/admin-service/package.json ./package.json

VOLUME ["/usr/app/admin-service/node_modules"]

CMD [ "pnpm", "start" ]

EXPOSE 4040

