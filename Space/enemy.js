Enemy = function(pos){
  this.health = 100;
  this.pos = pos
  this.size = createVector(45,30);
  this.speed = log(this.pos.y + this.size.x/2)
  this.right = true;

  this.update = function(){
    stroke(0,150,200);
    fill(0,150,200)
    let cycle = floor((frameCount%180) / 30);
    image(sprites[1+cycle],this.pos.x,this.pos.y, this.size.x,this.size.y);
    //rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    if(this.right)   this.pos.x += this.speed;
    if(!this.right)  this.pos.x -= this.speed;
    if(this.pos.x + this.size.x > width || this.pos.x < 0){
      this.right = !this.right;
      this.speed = log((this.pos.y + this.size.x/2) * level);
      if(this.pos.y < height/2)   this.pos.y += this.size.y;
    }
    if(random() < level/1000) ebullets[ebullets.length] = new ebullet(this.pos.copy(), this.size.x);
  }

  ebullet = function(pos, altersize){
    this.pos = pos;
    this.pos.x += altersize/4;
    this.size = createVector(5,10);

    this.update = function(){
      fill(255,115,10);
      stroke(255,115,10);
      rect(this.pos.x,this.pos.y,this.size.x,this.size.y);
      this.pos.y += 4;
    }
  }

}
