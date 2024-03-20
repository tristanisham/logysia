
# Logysia
A logging middleware for the [Elysia](https://elysiajs.com) web framework. Developed with [Bun](https://bun.sh).


## Installation

```sh
bun add @grotto/logysia
```
## Usage/Examples

```typescript
import { logger } from '@grotto/logysia';
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
        .get("/", ctx => "Hello, world!");
}
```

## Configuration

|  Option  | Description                                                    |
| :------: | :------------------------------------------------------------- |
| `logIP`  | Displays the incoming IP Address based on the XFF Header       |
| `writer` | Uses `write` function to send the log. Defaults to the console |

## Result
![Alt text](https://i.ibb.co/5YknHt6/image.png)

Logysia also supports printing when there are errors in your application.
