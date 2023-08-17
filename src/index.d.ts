declare module 'react/jsx-runtime' {
  export default any
}

declare module '*.css' {
  export default any
}

declare module '*.svg' {
  export default any
}

declare module 'pages-manifest.json' {
  const pages: [
    {
      chunk: string
      path: string
      title: string
      data: [
        {
          url: string
          dynamicPathIndexes: number[]
          crossorigin: string
          preconnectURL: string
        }
      ]
    }
  ]

  export default pages
}
