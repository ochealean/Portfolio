export function generateWave(elementID, waveLengthTopToBottom, color, borderColor, line_width) {
    const canvas = document.getElementById(elementID);
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const waveY = canvas.height * waveLengthTopToBottom; // vertical position of the wave
        const segmentSize = 50;
        const segments = Math.ceil(canvas.width / segmentSize);

        let points = [];

        // Generate wave control points
        for (let i = 0; i <= segments; i++) {
            let wavelength_1 = Math.floor(Math.random() * 100) * 0.001;
            let wavelength_2 = Math.floor(Math.random() * 100) * 0.001;
            const x = i * segmentSize;
            const waveLength = wavelength_1 + Math.random() * wavelength_2;
            const amplitude = 20 + Math.random() * 4;
            const y = waveY + Math.sin(x * waveLength) * amplitude;
            points.push({ x, y });
        }

        // -------- Draw lower (white) section --------
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length - 1; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }

        ctx.quadraticCurveTo(
            points[points.length - 1].x,
            points[points.length - 1].y,
            points[points.length - 1].x,
            points[points.length - 1].y
        );

        ctx.lineTo(canvas.width, canvas.height); // bottom right
        ctx.lineTo(0, canvas.height);           // bottom left
        ctx.closePath();

        ctx.fillStyle = "rgb(255, 58, 58, 0)"; // fully transparent
        ctx.fill();


        // -------- Draw upper (customizable color) section --------
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length - 1; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }

        ctx.quadraticCurveTo(
            points[points.length - 1].x,
            points[points.length - 1].y,
            points[points.length - 1].x,
            points[points.length - 1].y
        );

        ctx.lineTo(canvas.width, 0); // top right
        ctx.lineTo(0, 0);            // top left
        ctx.closePath();

        ctx.fillStyle = color; // 👈 changeable color // rgba(173, 216, 230, 0.7)
        ctx.fill();

        // Draw stroke once on the wave line
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length - 1; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }

        ctx.quadraticCurveTo(
            points[points.length - 1].x,
            points[points.length - 1].y,
            points[points.length - 1].x,
            points[points.length - 1].y
        );

        ctx.strokeStyle = borderColor;
        ctx.lineWidth = line_width;
        ctx.stroke();
}