import { Elysia } from "elysia";

new Elysia()
  .get("/id/:id", ({ params: { id } }) => id)
  .get("/", () => {
    return "Hello world";
  })
  .listen(8080);

console.log("Listening on http://localhost:8080");
