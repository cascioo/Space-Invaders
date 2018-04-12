let p, fired, enemies = [], ebullets = [], powerup = [], max = 3, damage = 5, level = 1, stop, psprite, esprite, powersprite, sprites = [];

function preload(){
  psprite = loadImage('psprite.png');
  esprite = loadImage('aliens.png');
  powersprite = loadImage('allpowerups.png');
}

function setup(){
  createCanvas(1500,700);
  for (let i = 0; i < psprite.width; i+= psprite.width){
    for (let j = 0; j < psprite.height; j+= psprite.height){
      let img = psprite.get(i,j, psprite.width, psprite.height);
      sprites.push(img);

    }
  }
  for (let i = 0; i < esprite.width; i+= esprite.width/2){
    for (let j = 0; j < esprite.height; j+= esprite.height/3){
      let img = esprite.get(i,j, esprite.width/2, esprite.height/3);
      sprites.push(img);
    }
  }
  for (let i = 0; i < powersprite.width;  i += powersprite.width/2){
    for (let j = 0; j < powersprite.height; j+= powersprite.height/2){
      let img = powersprite.get(i,j,powersprite.width/2,powersprite.height/2);
      sprites.push(img);
    }
  }
  start(width/2, height-100);
}

function start(x,y){
  stop = false;
  background(0);
  textSize(40);
  textAlign(CENTER, CENTER);
  p = new Player(createVector(x,y));
  let test = [new Enemy(createVector(0,0))];
  let sizeX = test[0].size.x + 20;
  let sizeY = test[0].size.y + 30;
  test.splice(0,1);
  for(let i = 0; i < 25 + 25 * level; i++){
    enemies[i] = new Enemy(createVector( sizeX * (i % floor(width/sizeX)), sizeY * floor(i / floor(width / sizeX))));
  }
}

function draw(){
  //frameRate(45);

  //fill(0);
  if (!stop){
    background(0);
    p.update();
    for(let i = 0; i < enemies.length; i++){
      enemies[i].update();
    }
    for(let i = 0; i < powerup.length; i++){
      powerup[i].update();
      if (isTouching(powerup[i].pos.copy(), powerup[i].size.copy(), p.pos.copy(), p.size.copy()) && powerup[i].type == "bullet"){
        max++;
        p.ammo++;
        powerup.splice(i,1);
      } else if(powerup[i].pos.y > height){
        powerup.splice(i,1);
      } else if (isTouching(powerup[i].pos.copy(), powerup[i].size.copy(), p.pos.copy(), p.size.copy()) && powerup[i].type == "health"){
        damage++;
        powerup.splice(i,1);
      }
    }
    for (let x = 0; x < ebullets.length; x++){
      let kill = false;
      if(ebullets[x].pos.y > (2/3) * height){
        if (isTouching(ebullets[x].pos.copy(), ebullets[x].size.copy(), p.pos.copy(), p.size.copy())){
          damage--;
          kill = true;
          if ( damage == 0){
            fill(255);
            text("LOSER :( You made it to level " + str(level), width/2, height/2);
            stop = true;
          }
        }
      }
      ebullets[x].update();
      if(ebullets[x].pos.y > height)  kill = true;
      if(kill)  ebullets.splice(x, 1);
    }
    // if ( level == 2){
    //   fill(255);
    //   text("WINNA ;}", width/2, height/2);
    //   text("Restart, Press P", width/2, height/2 + 50);
    // }
    if(enemies.length == 0){
      level++;
      start(p.pos.x,p.pos.y);
    }
    // if (max == 5){
    //   max = 3;
    //   shots ++;
    //   p.ammo = 3;
    //   p.bullets.splice(2,p.bullets.length-3);
    // }
  }
}


function isTouching(xy1,wh1,xy2,wh2){
  let l = (xy1.x > xy2.x) && (xy1.x < xy2.x + wh2.x);
  let r = (xy1.x + wh1.x > xy2.x) && (xy1.x + wh1.x < xy2.x + wh2.x);
  let b = (xy1.y + wh1.y > xy2.y) && (xy1.y + wh1.y < xy2.y + wh2.y);
  let t = (xy1.y > xy2.y) && (xy1.y < xy2.y + wh2.y);
  if  ((l || r) && (b || t)){
    return true;
  } else {
    return false;
  }
}


function keyPressed(){
  if(keyCode == 32) fired = false;
  if(keyCode == 80) {
    keyCode = 0;
    level = 1;
    damage = 5;
    max = 3;
    shots = 1;
    enemies.splice(0,enemies.length);
    ebullets.splice(0,ebullets.length);
    powerup.splice(0,powerup.length);

    start(width/2,height - 100);
  }
}
// function wait(){
//   while(keyCode !== 80){
//   }
// }
