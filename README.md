# Event-Driven Scalable Microservices Ticket System



![My Image](image/rabbitmq-ticket.png)



# Features:
##### - Auth microservice;
##### - Ticket microservice;
##### - Order microservice;
##### - Expiration microservice (Redis & Bull to expire an order if time limit is reached);
##### - Payments microservice (with Stripe);


# Technologies:
#### - Kubernetes, Docker, Ingress, Rabbitmq Cluster Operator, Nodejs, Typescript, Mongodb, Express, Redis, Bull, Stripe, Amqplib, common NPM package @eftickets/common, Json Web Token, Cookie, Design patterns, CRUD & validation, Authentication, Authorization, Skaffold.

###### - Change Order expiration limit: const EXPIRATION_WINDOW_SECONDS = 2 * 60 to const EXPIRATION_WINDOW_SECONDS = 15 * 60 in production

