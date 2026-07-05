FROM ubuntu:22.04
RUN apt update && apt install -y nodejs npm
WORKDIR /app
COPY package.json server.js ./
COPY worker /app/worker
RUN npm install && chmod +x /app/worker
CMD ["node", "server.js"]
