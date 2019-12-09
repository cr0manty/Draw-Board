$(document).ready(function () {
    let canvas = $('#canvas').get(0);
    let ctx = canvas.getContext('2d');
    let drawing = false;
    let brush_color = 'black';
    let radius = 10;
    let socket = io.connect();

    canvas.width = window.innerWidth - 320;
    canvas.height = window.innerHeight - 50;
    ctx.lineWidth = radius * 2;

    canvas.addEventListener('mousedown', function () {
        drawing = true;
    });

    canvas.addEventListener('mouseup', function () {
        drawing = false;
        ctx.beginPath();
        socket.emit('mouse_up');
    });

    canvas.addEventListener('mousemove', function (e) {
        if (drawing) {
            socket.emit('draw', {
                'x': e.clientX,
                'y': e.clientY
            });
            draw(ctx, e.clientX, e.clientY);
        }
    });

    $('#clear').click(function () {
        clear();
        socket.emit('clear');
    });

    $('#radius').change(function () {
        change_radius(this.value);
        socket.emit('change_radius', this.value);
    });

    $('#brush_color').change(function () {
        change_brush_color(this.value);
        socket.emit('change_brush_color', this.value);
    });

    socket.on('connect', function () {
        socket.emit('join');
    });

    socket.on('join', function () {
        alert('New user connected! Brush color and size set to default!');

        socket.emit('change_brush_color', 'black');
        socket.emit('change_radius', 10);
    });

    socket.on('draw', function (data) {
        draw(ctx, data.x, data.y);
    });

    socket.on('clear', function () {
        clear();
    });

    socket.on('change_radius', function (data) {
        change_radius(data);
    });

    socket.on('change_brush_color', function (data) {
        change_brush_color(data);
    });

    socket.on('mouse_up', function () {
        drawing = false;
        ctx.beginPath();
    });

    function draw(ctx, x, y) {
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = brush_color;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = brush_color;
        ctx.moveTo(x, y);
    }

    function clear() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.fillStyle = brush_color;
    }

    function change_radius(data) {
        radius = data;
        ctx.lineWidth = radius * 2;
        $('#radius').val(radius);
    }

    function change_brush_color(data) {
        brush_color = data;
        ctx.fillStyle = brush_color;
        ctx.strokeStyle = brush_color;
        $('#brush_color').val(brush_color);
    }
});