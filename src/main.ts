import Express from './app';
import MyHttpResponse from './app';
import MyHttpRequest from './app';



const app = Express();
const port: number = 4242;

// Routes http
app.get('/ad')

app.get('/', (req, res) => {
  console.log('get');
})

app.get('/api', (req, res) => {
  console.log('get API');
  res.json({hello :'From API'});
})

app.post('/sign-up', (req, res) => {
  console.log('post sign-up');
})

app.put('/update-login', (req, res) => {
  console.log('update login');
})

app.delete('/delete-login', (req, res) => {
  console.log('delete login');
})

//Render
app.get('/home', (req: MyHttpRequest, res: MyHttpResponse) => {
    const value = {
      firstname: "MOI",
      lastname: 'TOI',
      age: 34
    }
    app.render('home', value, (err: Error | null, html: string | null) => {
      if (err) {
        res.json({ error: err.message })
        return
      }
      res.send(html)
    })
app.listen(port,() => {
  console.log(`Server is listenning on ${port}`);
})
