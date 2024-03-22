import { logger } from "../src/index.ts";
import { Elysia } from "elysia";


if (import.meta.main) {
    const app = new Elysia()
        // These are the default options. You do not need to copy this down
        .use(logger({ 
            logIP: false,
            writer: {
                write(msg: string) {
                  console.log(msg)
                }
            }
        }))
        .get("/", ctx => "Hello, world!")
        .listen(3000);
}