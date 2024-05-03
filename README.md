# Scalable Chat App

This architecture for distributed system chat app while possible using redis and million message per second thruput via kafka for maximizing capacity of PostgreSQL with prisma.

## Installation

Clone the repository:

    git clone https://github.com/Keyur-Gondaliya/PromptHub.git

### Start Prisma and PostgreSQL

Ensure your PostgreSQL database is running and configure Prisma accordingly. Then, start Prisma using:
npx prisma migrate dev

### Start Redis Server

Make sure Redis is installed and running on your system. Then, start the Redis server.

### Start Kafka

Start Kafka server using:
kafka-server-start.sh <path_to_kafka_config>

### Set up environment variables:

Create a .env file in server and client and fill variables as per .env.example.

### Build

To build all apps and packages, run the following command:

```
cd Scalable-Chat
npm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd Scalable-Chat
npm run dev
```

## Contributing

Contributions to PromptHub are welcome!

## License

This project is licensed under the MIT License. See the LICENSE file for details.
