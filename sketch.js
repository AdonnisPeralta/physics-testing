let ball;

function setup() {
  createCanvas(400, 400);
  ball = new Ball(width/2,50, 10);
  wind = createVector(0.1,0);
}

function draw() {
  background(255);
  let gravity = createVector(0.0, 0.4);
  
  if(mouseIsPressed) {
    let wind = createVector(0.5, 0.0);
    let direction = createVector(ball.position.x - mouseX, ball.position.y - mouseY);
    direction.normalize();
    wind.add(direction)
    
    ball.applyForce(wind);
  }
  
  ball.applyForce(gravity);
  ball.update();
  ball.checkEdge();
  ball.show();
}

class Ball {
  constructor(x,y,mass) {
    this.position = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.mass = mass;
    this.radius = 50;
  }
  
  update() {
    this.vel.add(this.acc);
    this.position.add(this.vel);
    this.acc.mult(0);
  }
  
  checkEdge() {
    if(this.position.y >= (height - this.radius)) {
      this.position.y = height - this.radius;
      this.vel.y = this.vel.y * -1 * 0.5;
      this.acc.mult(0);
    } else if (this.position.y <= this.radius) {
      this.position.y = this.radius;
      this.vel.y = this.vel.y * -1 * 0.5;
      this.acc.mult(0);
    }
    
    if(this.position.x >= (width - this.radius)) {
      this.position.x = width - this.radius;
      this.vel.x = this.vel.x * -1 * 0.5;
      this.acc.mult(0);
    } else if (this.position.x <= this.radius) {
      this.position.x = this.radius;
      this.vel.x = this.vel.x * -1 * 0.5;
      this.acc.mult(0);
    }
  }
  
  show() {
    stroke(0);
    fill(220);
    circle(this.position.x, this.position.y, this.radius);
  }
  
  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }
}
