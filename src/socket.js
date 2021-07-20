module.exports = (io) =>{
    var data = []
    let users = 0
    io.on('connection', (socket)=>{
        for(let i = 0; i <data.length; i++){
            io.emit('show_drawing', data[i])
        }
        users = users +1
        io.emit('users', users)

        socket.on('delete', ()=>{
            data = []
            io.emit('show_drawing', null)
        })

        socket.on('drawing', (drawing)=>{
            data.push(drawing)
            io.emit('show_drawing', drawing)
        })

        socket.on('disconnect', ()=>{
            users = users-1
            io.emit('users', users)
        })

    })

}