
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score;
var ground;
var survivaltime ;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,400)
  
  monkey = createSprite(50,300,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(0,360,1200,5);
  ground.x = ground.width /2;
  
  FoodGroup = new Group();
  obstacleGroup =  new Group();
  
  survivaltime = 0;

}


function draw() {
  background("lightblue");
  
  stroke("black")
  textSize(20);
  fill("black")
  survivaltime =  Math.ceil(frameCount/frameRate());
  text("Survival Time: " + survivaltime,100,50);
  
  
  ground.velocityX = -4
  
  if (ground.x < 0){
     ground.x = ground.width/2;
  }
  
  monkey.velocityY= monkey.velocityY + 2
  monkey.collide(ground);
  spawnBananas();
  spawnObstacles();
  
  if(keyDown("space") && monkey.y >= 120){
    monkey.velocityY = -10;
  }
  
  
    if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    
    
    }
  
 
  drawSprites();
}

function spawnBananas(){
  if(frameCount % 80 === 0){
    banana = createSprite(500,300,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(120,200));
    banana.velocityX = -6
    banana.lifetime = 100;
    
    
    FoodGroup.add(banana);
  
  }
}


function spawnObstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(390,345,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -6
    obstacle.lifetime = 100;
    
    
    obstacleGroup.add(obstacle);
  
  }
}







