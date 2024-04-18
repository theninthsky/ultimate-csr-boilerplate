declare module 'react/jsx-runtime' {
  export default any
}

declare module '*.css' {
  export default any
}

declare module '*.svg' {
  export default any
}

type PageData = {
  url: string | ((params: { [x: string]: string }) => string)
  crossorigin?: string
  preconnectURL?: string
}

declare module 'pages-manifest' {
  const pages: [
    {
      chunk: string
      path: string
      title?: string
      data: PageData[]
    }
  ]

  export default pages
}
