export class Particle {
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  density: number;
  brightness: number; // For twinkling effect
  twinkleSpeed: number; // Speed of twinkling

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.size = Math.random() * 3 + 1; // Random size between 1 and 4
    this.density = Math.random() * 30 + 1; // Random density for movement
    this.brightness = Math.random() * 0.5 + 0.5; // Random brightness for twinkling
    this.twinkleSpeed = Math.random() * 0.05 + 0.01; // Random twinkle speed
  }

  update(mouseX: number, mouseY: number) {
    // Calculate distance to mouse
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const forceDirectionX = dx / distance;
    const forceDirectionY = dy / distance;
    const maxDistance = 100;
    const force = (maxDistance - distance) / maxDistance;
    const directionX = forceDirectionX * force * this.density;
    const directionY = forceDirectionY * force * this.density;

    // Move particle away from mouse
    if (distance < maxDistance) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      // Return particle to its base position
      if (this.x !== this.baseX) {
        const dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        const dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }

    // Twinkle effect
    this.brightness += this.twinkleSpeed;
    if (this.brightness > 1 || this.brightness < 0.5) {
      this.twinkleSpeed *= -1; // Reverse twinkle direction
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`; // White with varying brightness
    ctx.shadowBlur = 10; // Glow effect
    ctx.shadowColor = `rgba(255, 255, 255, ${this.brightness})`; // Glow color
    ctx.fill();
    ctx.closePath();
  }
}