import { client } from '../../../tina/__generated__/client.js'
import Link from "next/link"

export const dynamic = "force-dynamic"


// const endpoint = 'http://localhost:4001/graphql'

// export async function getTitleArray() {
  
//     const QUERY = `{
//       chapterConnection {
//           edges {
//               node {
//                   id
//               }
//           }
//       }
//   }`

//     const response = await (fetch(endpoint, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         query: QUERY
//       })
//     }))
  
//     const data = await response.json()
//     const titlesArray = await data.data.chapterConnection.edges.map(edge => edge.node)

//     return titlesArray.map(node => node.id
//       .split('/')
//       .pop()
//       .replace(/\.mdx$/,"")) 
// }

// export default async function TOC() {
  
//   const titles = await getTitleArray()

//   return (
//     <ul>
//       {titles.map((title, index) => (
//         <li key={index}>
//           <Link href={`/chapter/${title}`}>{title}</Link>
//         </li>
//       ))}
//     </ul>
//   )
// }

export async function getTitleArray() {
  
//   const QUERY = `{
//     chapterConnection {
//         edges {
//             node {
//                 id
//             }
//         }
//     }
// }`

//   const response = await (fetch(endpoint, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       query: QUERY
//     })
//   }))

  // const data = await response.json()
  // const titlesArray = await data.data.chapterConnection.edges.map(edge => edge.node)

  const data = await client.queries.chapterConnection()
  const titlesArray = data.data.chapterConnection.edges.map(edge => edge.node)

  
  return titlesArray.map(node => {
    return {
      title: node.title,
      path: node.id
      .split('/')
      .pop()
      .replace(/\.mdx$/,""),
      synopsis: node.synopsis
    }
  }) 
}

export default async function TOC() {

const titles = await getTitleArray()

return (
  <ul>
    {titles.map((item, index) => (
      <li key={index}>
        <div className="pb-3">
          <Link href={`/chapter/${item.path}`}>
            <div className="flex">
              <h2 className='font-bold'>{item.title}</h2>
              <h2 className="ms-auto">{index + 1}</h2>
            </div>
              <h2 className="italic">{item.synopsis}</h2>
          </Link>
        </div>
      </li>
    ))}
  </ul>
)
}

