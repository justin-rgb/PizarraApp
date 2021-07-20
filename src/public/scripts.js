const socket = io()
var click = false
var moving_mouse = false
var x_position = 0
var y_position = 0
var previous_position = null
var color = 'black'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const users = document.getElementById('users')

//Colores
const red = document.getElementById('color1')
const green = document.getElementById('color2')
const blue = document.getElementById('color3')
const yellow = document.getElementById('color4')
const black = document.getElementById('color5')

const width = window.innerWidth
const height = window.innerHeight
//const height = window.innerHeight

canvas.width = width
canvas.height = height

canvas.addEventListener('mousedown', (e)=>{
    click = true
})

//Touch
canvas.addEventListener('touchstart', (e)=>{
    click = true
})



canvas.addEventListener('mouseup', ()=>{
    click = false
})

//Touch
canvas.addEventListener('touchstart', ()=>{
    click = false
})



canvas.addEventListener('mousemove', (e)=>{
    x_position = e.clientX
    y_position = e.clientY
    moving_mouse = true
})

//Touch
canvas.addEventListener('touchmove', (e)=>{
    x_position = e.clientX
    y_position = e.clientY
    moving_mouse = true
})

function create_drawing(){
    if(click && moving_mouse && previous_position != null){
        let drawing = {
            x_position: x_position,
            y_position:y_position,
            color: color,
            previous_position: previous_position
        }

        socket.emit('drawing', drawing)
    }
    previous_position = {x_position:x_position, y_position:y_position}
    setTimeout(create_drawing, 25)
}

socket.on('show_drawing', (drawing)=>{
    if(drawing != null){
        context.beginPath()
        context.lineWidth = 3
        context.strokeStyle = drawing.color
        context.moveTo(drawing.x_position, drawing.y_position)
        context.lineTo(drawing.previous_position.x_position, drawing.previous_position.y_position)
        context.stroke()
    }else{
        context.clearRect(0, 0, canvas.width, canvas.height)
    }
})

red.addEventListener('click', ()=>{
    color = 'red'
    
    red.classList.replace('color1', 'selected-red')

    green.classList.replace('selected-green', 'color2')
    blue.classList.replace('selected-blue', 'color3')
    yellow.classList.replace('selected-yellow', 'color4')
    black.classList.replace('selected-black', 'color5')
})

green.addEventListener('click', ()=>{
    color = 'green'

    red.classList.replace('selected-red', 'color1')
    green.classList.replace( 'color2','selected-green')
    blue.classList.replace('selected-blue', 'color3')
    yellow.classList.replace('selected-yellow', 'color4')
    black.classList.replace('selected-black', 'color5')
})

blue.addEventListener('click', ()=>{
    color = 'blue'

    red.classList.replace('selected-red', 'color1')
    green.classList.replace('selected-green', 'color2')
    blue.classList.replace('color3', 'selected-blue')
    yellow.classList.replace('selected-yellow', 'color4')
    black.classList.replace('selected-black', 'color5')
})

yellow.addEventListener('click', ()=>{
    color = 'yellow'

    red.classList.replace('selected-red', 'color1')
    green.classList.replace('selected-green', 'color2')
    blue.classList.replace('selected-blue', 'color3')
    yellow.classList.replace('color4', 'selected-yellow')
    black.classList.replace('selected-black', 'color5')

})

black.addEventListener('click', ()=>{
    color = 'black'

    red.classList.replace('selected-red', 'color1')
    green.classList.replace('selected-green', 'color2')
    blue.classList.replace('selected-blue', 'color3')
    yellow.classList.replace('selected-yellow', 'color4')
    black.classList.replace( 'color5', 'selected-black')
})

const btn_delete = document.getElementById('btn-delete')
btn_delete.addEventListener('click', ()=>{
    socket.emit('delete')
})

socket.on('users', (users_connected)=>{
    users.innerHTML = `Numero de usuarios conectados: ${users_connected}`
})

create_drawing()