import app from './app'

app.listen(app.get('PORT'), ()=>{
    console.log(`Server listen on port ${app.get('PORT')}`)
})