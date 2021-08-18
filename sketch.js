  var person , person_running
  var vacine ,vacineImage, obstacle, obstacleImage
  var FoodGroup, obstacleGroup
  var score, ground, groundImage
  var survivalTime
  var gameState = PLAY;
  var PLAY = 1;
  var END = 0;
  var gameOver, restart;
  var gameOverImg, restartImg;
  var trex_collided;

  function preload(){

      person_running=loadAnimation("1-ani.png","2-ani.png","3-ani.png","4-ani.png","5-ani.png","6-ani.png","7-ani.png","8-ani.png");
    
      person_collided = loadAnimation("fallen-ani.png");
      
  //declaring the gameover and the restart image
  gameOverImg = loadImage("gameover.png");
        gameOverImg.visible = false;
  restartImg = loadImage("restart.png");
    
    

    vacineImage = loadImage("vacine-image.png");
    obstaceImage = loadImage("virus-image.png");
    groundImage = loadImage("ground.png");
    
    FoodGroup= new Group()
    obstacleGroup= new Group()

  }



  function setup() {
    createCanvas(670, 400);
     score=0
     survivalTime=0

     ground=createSprite(0,400,1500,10)
  
     person=createSprite(90,370,10,10)
     person.addAnimation("person_running",person_running)
     person.scale=.4




    }
  function draw() {
    background("black")


    
    
//     if(keyDown("space")&&person.y >= 350){
//       person.velocityY=-12
//     }
//     person.velocityY = person.velocityY + 0.5
//     person.collide(ground);
 if((touches.length >0 || keyDown("SPACE")) && person.y  >= height-140) {
      person.velocityY = -10;
       touches = [];
  person.collide(ground);
    }
        person.velocityY = person.velocityY + 0.8
      person.collide(ground);

    ground.velocityX = -90  
   ground.x = ground.width/2;

      if (gameState === END) {
    gameOverImg.visible = true;
    // restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    person.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    
    //change the trex animation
  person_collided = loadAnimation("fallen-ani.png");
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
  }
    
    if(obstacleGroup.isTouching(person)){
        gameState = END;
    }
    

   if(World.frameCount%200===0){
      Fvacine()
   }

    if(World.frameCount%300===0){
      virus()
   }

    if(person.isTouching(FoodGroup)){
       FoodGroup.destroyEach()
      score=score+1
        }


   drawSprites()
    fill("white") 
    text("Score: "+ score, 500,50);

    fill("white")
    var survivalTime=Math.round(getFrameRate()/1);
    text("Survival Time: "+ survivalTime,350,50)

  }

  function Fvacine(){
    vacine=createSprite(670,Math.round(random(170,230)),10,10)
    vacine.addImage(vacineImage);
    vacine.scale=0.1
    vacine.velocityX=-3
    FoodGroup.add(vacine)
  }

  function virus(){
    obstacle=createSprite(670,370,90,10)
    obstacle.addImage(obstaceImage)
    obstacle.velocityX=-9
    obstacle.scale=0.1
    obstacleGroup.add(obstacle)
  }
 function reset(){
  gameState = PLAY;
  gameOverImg.visible = false;
  restartImg.visible = false;
  
  obstacleGroup.destroyEach();
   
  survivalTime = 0;
  score = 0;
  
}