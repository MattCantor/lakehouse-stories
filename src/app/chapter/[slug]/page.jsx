import { client } from '../../../../tina/__generated__/client.js'
// import Chapter from '../../../components/chapter.jsx'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

export default async function Page({ params }) {

    // const { slug } = params

    // return (
    // <Chapter slug={slug}/>
    // )

  const { slug } = params
  // console.log(slug)
  const post = await client.queries.chapter({relativePath: `${slug}.mdx`})
  // console.log(post.data.chapter.body)

  return (<>
      {/* <h1>{post.data.chapter.title}</h1>
      <h2>{post.data.chapter.synopsis}</h2> */}
      <TinaMarkdown content={post.data.chapter.body}/>
    </>)
  }

  export async function generateStaticParams() {

    const data = await client.queries.chapterConnection()
    const titleArray = data.data.chapterConnection.edges.map(edge => edge.node)
   
    return titleArray.map(node => ({
      id: node.id
    }))
  }
