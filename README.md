This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Next steps

[] Implement search - search by prompt - search by tag - search by username
[] Implement click on tag - click on a tag, populate that tag inside the search field
[] Implement view other profiles - click on a username, redirect to that person's username with all of their posts listed

For the first two, we'll need to put code in the feed. query and filter.

```
const [searchText, setSerachText] = useState("")
const [searchTimeout, setSearchTimeout] = useState(null)
const [searchedResults, setSearchedResults] = useState([])
```

The third one you'll have to make a new folder under the profile with [id]
