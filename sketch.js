let balls = [];

function setup() {
  createCanvas(400, 400);
  
  for (let i = 0; i < 5; i++) {
    ball = new Ball(random(width),random(height), random(5,50));
    balls.push(ball);
  }
  
  wind = createVector(0.1,0);
}

function draw() {
  background(255);
  
  balls.forEach(ballLogic);
}

function ballLogic(ball) {
  let gravity = createVector(0.0, 0.4);
  
  if(mouseIsPressed) {
    let wind = createVector(0.5, 0.0);
    let direction = createVector(ball.position.x - mouseX, ball.position.y - mouseY);
    direction.normalize();
    wind.add(direction)
    
    ball.applyForce(wind);
  }
  
  if(ball.bounceEdges()) {
    let c = 0.1;
    let normalForce = 1;
      
    let frictionMag = c * normalForce;
    let friction = ball.vel.copy();
  
    friction.mult(-1);
    friction.normalize();
    friction.mult(frictionMag);
    
    ball.applyForce(friction);
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
    this.radius = mass;
  }
  
  update() {
    this.vel.add(this.acc);
    this.position.add(this.vel);
    this.acc.mult(0);
  }
  
  bounceEdges() {
    return (this.position.y > height - this.radius - 1);
  }
  
  checkEdge() {
    if(this.position.y >= (height - this.radius)) {      
      this.position.y = height - this.radius;
      this.vel.y = this.vel.y * -1 * 0.5;
    } else if (this.position.y <= this.radius) {
      this.position.y = this.radius;
      this.vel.y = this.vel.y * -1 * 0.5;
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
