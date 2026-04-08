import { createServer } from "node:http"
import { createApplication } from "./app/index.js";


async function main() {
    try {
        const server = createServer(createApplication())
        const PORT: number = 5000

        server.listen(PORT ,() => {
            console.log(`http server running on ${PORT}`);
        })
    } catch (error) {
        console.log("Error starting");
        throw error
    }
}

main()