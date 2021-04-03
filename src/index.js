import app from './app'
import connect from './database/database'

//SERVER LISTEN
app.listen(app.get('PORT'), ()=>{
    console.log(`Server listen on port ${app.get('PORT')}`)
})