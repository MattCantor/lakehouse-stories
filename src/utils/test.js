
const endpoint = 'http://localhost:4001/graphql'

async function runQuery() {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `{
                chapterConnection {
                    edges {
                        node {
                            title
                            synopsis
                            body
                            id
                        }
                    }
                }
            }`
        })
    })

const data = await response.json()
const dataArray = await data.data.chapterConnection.edges.map(edge => edge.node.id
    .split('/')
    .pop()
    .replace(/\.mdx$/,""))
console.log(dataArray)
console.log(data)
}

runQuery()


// (async () => {
//     try {
//         const data = await runQuery()
//         console.log(data)
//     } catch {
//         console.error("There was an error", error)
//     }
// })()

// console.log(runQuery())
// console.log("test")

// (async () => {
//     const data = await runQuery()
//     return console.log(data)})()

