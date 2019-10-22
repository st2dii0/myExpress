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
  res.json({ hello: 'From sign-up form' });

})

app.put('/update-login', (req: MyHttpRequest, res: MyHttpResponse) => {
  console.log('update login');
  res.json({ hello: 'From update-login form' });

})

app.delete('/delete-login', (req: MyHttpRequest, res: MyHttpResponse) => {
  console.log('delete login');
  res.json({ hello: 'From delete form' });
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
