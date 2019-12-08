$(function () {
    let canvas = $('#canvas').get(0);
    let ctx = canvas.getContext('2d');
    let isDown = false;
    let current_color = 'black';
    let coords = [];
    let radius = 10;

    canvas.width = window.innerWidth - 320;
    canvas.height = window.innerHeight - 50;
    ctx.lineWidth = radius * 2;

    canvas.addEventListener('mousedown', function (e) {
        isDown = true;
    });

    canvas.addEventListener('mouseup', function (e) {
        isDown = false;
        ctx.beginPath();
    });

    function clear() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.fillStyle = current_color;
    }

    function save() {
        localStorage.setItem('coords', JSON.stringify(coords));
    }

    function reply() {
    }

    canvas.addEventListener('mousemove', function (e) {
        if (isDown) {
            ctx.lineTo(e.clientX - 20, e.clientY - 20);
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = current_color;
            ctx.arc(e.clientX - 20, e.clientY - 20, radius, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = current_color;
            ctx.moveTo(e.clientX - 20, e.clientY - 20);
        }
    });

    $('#clear').click(function () {
        clear();
    });

    $('#radius').change(function () {
        radius = +this.value;
        ctx.lineWidth = radius * 2;
    });

    $('#color').change(function () {
        current_color = this.value;
        ctx.fillStyle = current_color;
        ctx.strokeStyle = current_color;
    });
});