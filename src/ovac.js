import app from './app'

app.listen(app.get('port'))

console.clear()


console.log('Server listening on port',app.get('port'))
