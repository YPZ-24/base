import app from './app'

//SERVER LISTEN
app.listen(app.get('PORT'), ()=>{
    console.log(`Server listen on port ${app.get('PORT')}`)
})