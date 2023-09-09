import { client } from '../../../../tina/__generated__/client.js'
// import Chapter from '../../../components/chapter.jsx'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import Paginate from '@/src/components/paginate.jsx'

export const dynamic = "force-dynamic"

const components = {
  p: (props) => {
    return (
      <p className="indent-2 text-justify pb-2 first-of-type:first-letter:text-xl first-of-type:first-letter:font-bold first-of-type:first-letter:uppercase">{props.children}</p>
    )
  }
}

export default async function Page({ params }) {

  const { slug } = params
  console.log(`slug in Page: ${slug}`)
  const post = await client.queries.chapter({relativePath: `${slug}.mdx`})

//   function getNextChapter(chapterString) {
//     return chapterString.replace(/(\d+)$/, (match) => parseInt(match, 10) + 1)
// }

//   function getPrevChapter(chapterString) {
//     return chapterString.replace(/(\d+)$/, (match) => parseInt(match, 10) - 1)
// }

  return (<>
      <Paginate slug={slug}/>
      <h1 className="tracking-wide uppercase text-center font-bold">{post.data.chapter.title}</h1>
      <h2 className="text-center italic pb-2">{post.data.chapter.synopsis}</h2>
      <TinaMarkdown content={post.data.chapter.body} components={components}/>
      <Paginate slug={slug}/>
    </>)
  }

  export async function generateStaticParams() {

    const data = await client.queries.chapterConnection()
    const titleArray = data.data.chapterConnection.edges.map(edge => edge.node)
   
    return titleArray.map(node => ({
      id: node.id
    }))
  }
