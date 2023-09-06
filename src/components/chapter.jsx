'use client'

import dynamic from 'next/dynamic'



export default function Chapter(slug) {
    
    const MDX = dynamic(() => import(`../content/chapters/${slug.slug}.mdx`))

    return (
        <>
        <MDX />
        </>
    )
}