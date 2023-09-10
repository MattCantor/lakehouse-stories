import Link from "next/link"

function incrementChapter(chapterString) {
    return chapterString.replace(/(\d+)$/, (match) => parseInt(match, 10) + 1)
}

function decrementChapter(chapterString) {
    return chapterString.replace(/(\d+)$/, (match) => parseInt(match, 10) - 1)
}

export default async function Paginate({slug}) {

console.log(`slug in Paginate: ${slug}`)
const nextChapter = incrementChapter(slug)
const prevChapter = decrementChapter(slug)

return (
  <div className="flex justify-between space-x-3 pb-6 font-light text-xs">
    <Link href={`./${prevChapter}`}>Previous</Link>
    <Link href={"../toc"}>Table of Contents</Link>
    <Link href={`./${nextChapter}`}>Next</Link>
  </div>
)
}

// export default async function Paginate({prev, next}) {
    
//     return (
//       <div className="flex space-x-3 justify-center py-3 font-light">
//         <Link href={`./${prev}`}>Previous</Link>
//         <Link href={"../toc"}>Table of Contents</Link>
//         <Link href={`./${next}`}>Next</Link>
//       </div>
//     )
//     }

