var trex, tresRuning,trexCollidedImage
var ground, groundImage
var invisibleGround;
var clouds, cloudsImage, cloudGroup
var obstacleImage1,obstacleImage2,obstacleImage3,obstacleImage4,obstacleImage5,obstacleImage6
var obstacles
var gameover, gameoverImage;
var restart, restartImage

var score=0

var Play=0
var End=1
var gameState=Play

var cloudsGroup
var obstaclesGroup
var diesound,jumnpsound,checkpointsound
var crow

//preload is used to load the images, sounds or videos.
function preload() {
  trexRuning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png");
cloudsImage = loadImage("cloud.png");
obstacleImage1=loadImage("obstacle1.png")
obstacleImage2=loadImage("obstacle2.png")
obstacleImage3=loadImage("obstacle3.png")
obstacleImage4=loadImage("obstacle4.png")
obstacleImage5=loadImage("obstacle5.png")
obstacleImage6=loadImage("obstacle6.png")
trexCollidedImage=loadAnimation("trex_collided.png")
gameoverImage=loadImage("gameOver.png")
restartImage= loadImage("restart.png")
diesound= loadSound("die.mp3")
checkpointsound= loadSound("checkpoint.mp3")
jumpsound= loadSound("jump.mp3")

}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  
  
  
  
  
  
  
  console.log("hello" +5 )
  //string concactination 

  //creating object one time
  trex = createSprite(30, height-100, 30, 30);
  trex.addAnimation("running", trexRuning);
  trex.scale = 0.5;
  trex.addAnimation("collide", trexCollidedImage)

  //ground
  ground = createSprite(200, height-100, 400, 20);
  ground.addImage("ground", groundImage);

  //invisible ground
  invisibleGround = createSprite(200, height-80, 400, 20);
  invisibleGround.visible = false;
  
  //gameover
  gameover= createSprite(width/2,height/2,0,0)
  gameover.addImage("over",gameoverImage)
 gameover.scale=0.5

restart=createSprite(width/2,height/2+40,20,20)
restart.addImage("restart", restartImage)
restart.scale=0.5

localStorage["HighestScore"]=0


  cloudsGroup=new Group()
  obstaclesGroup=new Group()
  
  //var a=Math.round(random(1,5))
  
  //console.log(a)

  //skin
  trex.debug=false
trex.setCollider("circle",0,-10,55)
}

function draw() {
  background("black");


//displaying score
  textSize(25)
fill("white")
text("score:" +score,width/4+150,height/2-40)
text("HighestScore:  "+localStorage["HighestScore"],width/4-100,height/2-40)
 
// console.log(frameCount)


 trex.collide(invisibleGround);


  //woo/2=200
  text(mouseX + " " + mouseX, mouseX, mouseY);

  //console.log(trex.y);


//playstate
if(gameState === Play){
gameover.visible=false
restart.visible=false


 

//increasing score by every framecount and dividing by 60
//ground velcoity
ground.velocityX = -(3+score/100);
score=score+Math.round(getFrameRate()/60)
if (keyDown("space") && trex.y >= height-130) {
  trex.velocityY = -10
jumpsound.play()
}
else if (keyDown("up") && trex.y >= height-130) {
  trex.velocityY = -10
jumpsound.play()
}
else if (touches.length>0 && trex.y >= height-130) {
  trex.velocityY = -10
  touches=[]
jumpsound.play()
}

if (ground.x < 0) {
  ground.x = ground.width / 2;
}

//gravity for trex to come back to the ground
trex.velocityY = trex.velocityY + 0.8;

// creating clouds
spawnclouds()
    
//creating obstacles 
 spawnObstacles()

if(score>0 && score%100===0){
  checkpointsound.play()
}





 if(trex.isTouching(obstaclesGroup)){
   gameState=End
   diesound.play()
 }
}

else if(gameState === End){
 ground.velocityX=0
 trex.velocityY=0

obstaclesGroup.setVelocityXEach(0)
cloudsGroup.setVelocityXEach(0)
obstaclesGroup.setLifetimeEach(-1)
cloudsGroup.setLifetimeEach(-1)
trex.changeAnimation("collide", trexCollidedImage)
gameover.visible=true
restart.visible=true


if(touches.length>0||mousePressedOver(restart)){
 touches=[]
  restartGame()
}
}
drawSprites();
}
  //check coordinates}


//userdefined function
function spawnclouds(){
if(frameCount%60 === 0){
clouds=createSprite(width+30,height-100,40,100)
clouds.addImage("cloud", cloudsImage)
clouds.scale=1
clouds.y=Math.round(random(height-300),(height-400))
clouds.velocityX=-6
console.log(trex.depth)
console.log(clouds.depth)
cloudsGroup.add(clouds)

//adjesting depth
clouds.depth=trex.depth
trex.depth=trex.depth +1


//calculating lifetime
//here distance=width of clouds speed=velocity of clouds
//time=distance/speed
//time=550/3
//time=183
clouds.lifetime=183


//keywentdown("space")
//createArrow
}


}

function spawnObstacles(){
if(frameCount%60===0){
obstacles=createSprite(540,height-120,40,10)
obstacles.velocityX=-(6+score/100)
obstacles.lifetime= 90



obstaclesGroup.add(obstacles)

obstacles.scale=0.5
var rand=Math.round(random(1,6))
switch(rand){
case 1:obstacles.addImage(obstacleImage1)
break;
case 2 : obstacles.addImage(obstacleImage2)
break;
case 3 : obstacles.addImage(obstacleImage3)
break;
case 4 : obstacles.addImage(obstacleImage4)
break;
case 5 : obstacles.addImage(obstacleImage5)
break;
case 6 : obstacles.addImage(obstacleImage6)

default :break
}

}



}
function restartGame(){
  gameSate= Play
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  trex.changeAnimation("running", trexRuning)
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"]= score
  }
 score=0
 //console.log(localStorage[])
  }
// distplay green balloon red and yellow
//and the score
//