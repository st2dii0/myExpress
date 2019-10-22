import Express, { MyHttpRequest, MyHttpResponse } from './app';



const app = Express();
const port: number = 4242;

// Routes http
app.get('/', (req: MyHttpRequest, res: MyHttpResponse) => {
  console.log('get');
  res.json({ hello: 'From /get' });
})

app.get('/api', (req: MyHttpRequest, res: MyHttpResponse) => {
  console.log('get API');
  res.json({ hello: 'From API' });
})

app.post('/sign-up', (req: MyHttpRequest, res: MyHttpResponse) => {
  console.log('post sign-up');
})

app.put('/update-login', (req: MyHttpRequest, res: MyHttpResponse) => {
  console.log('update login');
})

app.delete('/delete-login', (req: MyHttpRequest, res: MyHttpResponse) => {
  console.log('delete login');
})

//Render
app.get('/home', (req: MyHttpRequest, res: MyHttpResponse) => {
  console.log('Prom ?');
  const value = {
    firstname: "st2",
    lastname: 'diio',
    age: 47
  }
  app.render('home', value, (err: Error | null, html: string | null) => {
    if (err) {
      res.json({ error: err.message })
      return
    }
    res.send(html)
  })
})

app.listen(port, () => {
  console.log(`Server is listenning on ${port}`);
})
