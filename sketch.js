var spaceImg
var explosion
var star
var bluestar
var rocket
var asteroid
var starScore=0
var score=0
var gameState="play"
var gameOver
var reset
function preload(){
explosionS=loadAnimation("explosion1.png","explosion2.png","explosion3.png","explosion4.png","explosion5.png","explosion6.png","explosion7.png")
spaceImg=loadImage("space.gif")
starImg=loadImage("yellowStar.png")
bluestarImg=loadImage("blueStar.png")
rocketImg=loadImage("rocket.png")
asteroidImg=loadImage("asteroid.png")
gameOverImg=loadImage("gameOver.png")
resetImg=loadImage("reset.png")
explosionSound=loadSound("explosionSound.mp3")
spaceSound=loadSound("spaceSound.mp3")
}

function setup(){
createCanvas(600,600)

space=createSprite(300,300)
space.addImage("spaceImg", spaceImg)
space.velocityY=1.5
  space.scale =1.2

rocket=createSprite(300,300)
rocket.addImage(rocketImg)
rocket.scale=0.3

  
gameOver=createSprite(300,200)
gameOver.addImage(gameOverImg)
gameOver.scale=1
gameOver.visible = false;

explosion=createSprite(300,300,100,100) 

explosion.scale=1.5
explosion.visible=false
  
  
reset=createSprite(300,350)
reset.addImage(resetImg)
reset.scale=0.25
reset.visible = false;
  
asteroidGroup = new Group();
starGroup=new Group()
  blueStarGroup=new Group()
}

function draw(){
  if (gameState==="play"){
    spaceSound.loop()
  edges= createEdgeSprites();
  rocket.collide(edges[1]);
 rocket.collide(edges[0]);
 rocket.collide(edges[2]);

if (space.y>400){
space.y=300
}
if (keyDown("left_arrow")){
rocket.x=rocket.x-3
}
if (keyDown("right_arrow")){
rocket.x=rocket.x+3
}
if (keyDown("space")){
rocket.velocityY=-5
score=score+1
}
rocket.velocityY= rocket.velocityY+0.8
spawnSTAR()
spawnYSTAR()  
spawnAsteroid()
  
if(starGroup.isTouching(rocket) ){ 
starGroup.destroyEach()
  
  starScore=starScore+1 }
  
if(blueStarGroup.isTouching(rocket) ){ 
blueStarGroup.destroyEach()
  starScore=starScore+2 }
 
if (rocket.isTouching(explosion)){
explosion.x=rocket.x
explosion.y=rocket.y
explosion.addAnimation("explode",explosionS)

}
    
 if(asteroidGroup.isTouching(rocket) || rocket.y>600){ 


gameState = "end" }  
}
  else if (gameState = "end"){
gameOver.visible = true;
reset.visible = true;
explosion.visible = true;   
explosionSound.play()
rocket.destroy()
space.y=300      
blueStarGroup.destroyEach();
starGroup.destroyEach()
asteroidGroup.destroyEach();  
if (mousePressedOver(reset)){
  restart()
}
  } 

drawSprites()
textSize(20);
  fill(255);
  text("Star: "+ starScore,20,30);
  
textSize(20);
  fill(255);
  text("Score: "+ score,20,60);
  


}
function spawnAsteroid(){
if (frameCount%240===0){
var asteroid=createSprite(Math.round(random(50, width-50)))
asteroid.scale=0.1
asteroid.addImage(asteroidImg)
  
asteroid.x=Math.round(random(120,400))
asteroid.velocityY=2 
 asteroid.velocityY = +(6 + 3*starScore/100)
rocket.depth=asteroid.depth
rocket.depth= rocket.depth+1
asteroid.lifetime=650

asteroidGroup.add(asteroid)


}
  
}

function spawnYSTAR(){
if (frameCount%270===0){
var star=createSprite(Math.round(random(50, width-50)))
star.scale=0.1
star.addImage(starImg)
  
star.x=Math.round(random(120,400))
star.velocityY=4

rocket.depth=star.depth
rocket.depth= rocket.depth+1
star.lifetime=650

starGroup.add(star)
}
}
function spawnSTAR(){
if (frameCount%390===0){
var blueStar=createSprite(Math.round(random(50, width-50)))
blueStar.scale=0.1
blueStar.addImage(bluestarImg)
  
blueStar.x=Math.round(random(120,400))
blueStar.velocityY=6

rocket.depth=blueStar.depth
rocket.depth= rocket.depth+1
blueStar.lifetime=650

blueStarGroup.add(blueStar)
}
}

function restart(){
 gameState = "play";
 gameOver.visible = false;
 reset.visible = false;
 explosion.visible=false
  rocket=createSprite(300,300)
rocket.addImage(rocketImg)
rocket.scale=0.3
  
    asteroidGroup.destroyEach();
starGroup.destroyEach();
    blueStarGroup.destroyEach();
 
  explosion.x=rocket.x
    explosion.y=rocket.y
  starScore=0
  score=0
  
}