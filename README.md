

## Run locally on a development server

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

A JSON-Server shall start on [localhost:4000](http://localhost:4000) concurrently.

If json-server did not start, run: 

```bash
json-server --watch db.json --port 4000
```




Open [http://localhost:3000](http://localhost:3000) with your browser to see the blogposts.


Click on any post to view the whole page.

Users can add comments on a post.

