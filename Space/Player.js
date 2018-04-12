Player = function(pos){
  this.pos = pos;
  this.size = createVector(50,50);
  this.bullets = [];
  this.ammo = max;

  this.update = function(){
    fill(0,255,0);
    stroke(0,255,0);
    // rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    image(sprites[0],this.pos.x, this.pos.y, this.size.x, this.size.y);
    fill(0);
    push();
    textSize(16);
    textAlign(CENTER,CENTER);
    text(damage,this.pos.x + this.size.x/2, this.pos.y + this.size.y/2);
    pop();

    if(keyIsDown(LEFT_ARROW))   this.pos.x -= 7;
    if(keyIsDown(RIGHT_ARROW))  this.pos.x += 7;
    if(keyIsDown(UP_ARROW))     this.pos.y -= 7;
    if(keyIsDown(DOWN_ARROW))   this.pos.y +=7;
    if(this.pos.x < 0)                          this.pos.x = 0;
    if(this.pos.x > width - this.size.x)        this.pos.x = width - this.size.x;
    if(this.pos.y > height - this.size.y)       this.pos.y = height - this.size.y;
    if(this.pos.y < (2/3)*height)               this.pos.y = (2/3)*height

    if (keyCode == 32 && !fired && this.ammo > 0){
      this.ammo -= 1;
      this.bullets[this.bullets.length] = new Bullet(this.pos.copy(), this.size.x);
      fired = true;
    }

    for (let x = 0; x < (max - this.ammo); x++){
      this.bullets[x].update();
      let kill = false;
      for(let i = 0; i < enemies.length; i++){
        if (isTouching(this.bullets[x].bpos.copy(), this.bullets[x].bsize.copy(), enemies[i].pos.copy(), enemies[i].size.copy())){
          kill = true;
          if (random() < .1){
            let p = new power(enemies[i].pos.copy(), enemies[i].size.x)
            powerup.push(p);
          }
          enemies.splice(i, 1);
        }
      }
      if(this.bullets[x].bpos.y < 0) kill = true;
      if(kill){
        this.bullets.splice(x, 1);
        this.ammo +=1;
      }
    }

  }

  Bullet = function(pos, altersize){
    this.bpos = pos;
    this.bpos.x += altersize/4;
    this.bsize = createVector(6,15);

    this.update = function(){
      fill(0,255,0);
      stroke(0,255,0);
      rect(this.bpos.x,this.bpos.y,this.bsize.x,this.bsize.y);
      //bullet speed should probably never be larger than enemy height, just in case
      this.bpos.y -= 7;
    }
  }
  power = function(pos, altersize){
    this.pos = pos;
    this.pos.x += altersize/4;
    this.size = createVector(30,30);
    this.type;

    random() < .5 ? this.type = "health": this.type = "bullet";

    this.update = function(){
      if (this.type == "bullet"){
        image(sprites[9],this.pos.x,this.pos.y,this.size.x,this.size.y);
      } else {
        image(sprites[7],this.pos.x,this.pos.y,this.size.x,this.size.y);
      }
      // stroke(0,255,0);
      // rect(this.pos.x,this.pos.y,this.size.x,this.size.y);
      this.pos.y += 4;
    }
  }
}
