//Create variables here
var happyDog,dog,database,foodref,ball,food;
function preload()
{
  happy=loadImage("images/dogImg.png");
  normal=loadImage("images/dogImg1.png");
}
class Ball{
constructor(){
  this.x=30;
 this.y=200;
 this.width=20;
 this.height=20;
}
display(){
  push();
  noFill();
  noStroke();
  rect(this.x,this.y,this.width,this.height);
  pop();
}
move(){
  this.x=this.x-1;
}
}
function setup() {
  database=firebase.database();
  createCanvas(500, 500);

  ball=new Ball();
 
  dog=createSprite(250,250,10,10);
   dog.addImage(normal);
  dog.scale=0.3
  dog.addImage("h",happy);
  foodref=database.ref("food");
  foodref.on('value',readPosition);
  
}


function draw() {  
background(46, 139, 87);

  if(food!==undefined){
    ball.display();
    writePosition();
  if(ball.x<0){
    ball.x=30;
  }
  push();
  textSize(20);
  fill("white");
  text("Food Remaining:"+ball.x,180,100);
  pop();
  drawSprites(); 
  }
 
}

function writePosition(){
  database.ref('/').set({
    food:ball.x
  })
}
function readPosition(data){
  food=data.val();
  ball.x=food;
}
function keyPressed(){
  if(keyCode===UP_ARROW){
    dog.changeImage("h",happy);
      ball.move();
  }
}

