import { Elysia } from "elysia";
import { edenTreaty } from "@elysiajs/eden";
import { describe, it, expect, beforeAll, beforeEach } from "bun:test";
import { logger } from '../src'

describe("Logysia", () => {
  let server: Elysia
  let app: any
  let logs: string[] = []

  beforeAll(() => {
    server = new Elysia()
      .use(logger({
        logLocation: {
          log(msg: string) {
            logs.push(msg)
          }
        }
      }))
      .get('/', () => "Hi")
      .post('sign', () => "signed")
      .listen(3000);

    app = edenTreaty<typeof server>("http://127.0.0.1:3000")
  })

  beforeEach(() => {
    logs = []
  })
  
  it("GET works", async () => {
    const count = 5
    for (let i = 0; i < count; i++) {
      await app.get()
    }

    expect(logs.length).toBe(count);
    logs.forEach(log => {
      expect(removeANSIColors(log)).toMatch(/GET \/ \| \d+µs/)
    });
  })

  it("GET and POST works", async () => {
    const count = 2
    for (let i = 0; i < count; i++) {
      await app.get()
      await app.sign.post({})
    }

    expect(logs.length).toBe(2 * count);
    for (let i = 0; i < 2 * count; i += 2) {
      expect(removeANSIColors(logs[i])).toMatch(/GET \/ \| \d+µs/)
      expect(removeANSIColors(logs[i + 1])).toMatch(/POST \/sign \| \d+µs/)
    }
  })
})

function removeANSIColors(input: string): string {
    return input.replace(/\x1B\[[0-9;]*[JKmsu]/g, '');
}
