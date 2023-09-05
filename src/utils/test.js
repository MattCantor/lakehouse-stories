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
                        }
                    }
                }
            }`
        })
    })

const data = await response.json()
return data.data.chapterConnection.edges.map(edge => edge.node)

}

(async () => {
    try {
        const data = await runQuery()
        console.log(data)
    } catch {
        console.error("There was an error", error)
    }
})()

console.log(runQuery())

// (async () => {
//     const data = await runQuery()
//     return console.log(data)})()