//making monkey
var monkey, monkey_walking;

//making background
var jungle, jungleImage;

//making banana and stone images
var banana, bananaImage, stone, stoneImage;

//making banana and stone groups
var bananaGroup, stoneGroup;

//making the invisible ground
var invisibleGround;

//making the gameOver image
var gameOver, gameOverImage;

//making the survival hearts
var heart1, heart2, heartImage;

//making the sound effects
var loseSound, jumpSound, collectSound;

//making the score
var rock = 0;
var score = 0;
var scores = 0;

//making different types of game states
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  
  //loading the background image
  jungleImage = loadImage("jungle.jpg");
  
  
  //loading the monkey walking animation
  monkey_walking =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")

 //loading the banana and stone images
bananaImage = loadImage("banana.png");
stoneImage = loadImage("stone.png");
  
  //loading the gameOver image
gameOverImage = loadImage("gameover.png");

  
  //loading the survival heart image
heartImage = loadImage("heart.png");
 
  //loading the sound effects
loseSound = loadSound("loseSound.mp3");
jumpSound = loadSound("salamisound-6718888-sfx-jump-2-game-computer.mp3");
collectSound = loadSound("collectSound.mp3");
  
}

function setup() {
  
 //creating the canvas
  createCanvas(400,400);

  //creating the background sprite
jungle = createSprite(200,200,10,10);
jungle.addImage("jungle", jungleImage);
jungle.scale = 0.8;
console.log(jungle.x);
  
//creating the monkey sprite
monkey = createSprite(50,320,10,10);
monkey.addAnimation("monkeyWalking", monkey_walking);
monkey.scale = 0.1;
  
  //creating the invisible ground sprite
invisibleGround = createSprite(200,360,400,10);
  
  ///creating the gameOver image sprite
gameOver = createSprite(200,200,10,10);
gameOver.addImage("gameOver", gameOverImage);
gameOver.scale = 0.5
  
  //creating the first survival heart sprite
heart1 = createSprite(50,50,10,10);
heart1.addImage("gameOver", heartImage);
heart1.scale = 0.1
  
  //creating the second survival heart sprite
heart2 = createSprite(105,50,10,10);
heart2.addImage("gameOver", heartImage);
heart2.scale = 0.1
 
  //creating new groups for banana and stone
  bananaGroup = new Group();
  stoneGroup = new Group();
  
}



function draw() {
  
  //giving the background a colour
  background("white");
  
  //putting the game state numbers in the console for reference
   console.log("The game is in gameState",gameState);
  
  
   //game state PLAY
  if(gameState === PLAY){
    
    //to avoid the gameOver picture showing on screen while playing
 gameOver.visible = false;

 
    //making the background move
    jungle.velocityX = -4;
    
    //making the background infinite
    if(jungle.x < 0){
    jungle.x = jungle.width/4;
    }
    
    //making the invisible ground function
    invisibleGround.velocityX = -4;
    
    //disallowing the invisible ground from displaying
    invisibleGround.visible = false;
    
    //making the invisible ground infinite
    invisibleGround.x = invisibleGround.width/2;
    
    
    //making the monkey collide on the invisible ground
    monkey.collide(invisibleGround);
    
    //giving the monkey gravity
    monkey.velocityY = monkey.velocityY + 0.5;
    
    //making the monkey jump when space key is pressed
    if(keyDown("space") && monkey.y >= 250){
      monkey.velocityY= -10;
      jumpSound.play();
  } 
    
    //calling the banana and stone functions
  bananas();
  stones(); 
    
    //increasing the score 
     if(bananaGroup.isTouching(monkey)){
     collectSound.play();
     score = score + 1
     scores = scores + 1
       
       //making the monkey grow when a banana is eaten
       if(scores > 5){
      scores = 0;
      monkey.scale = 0.1
       }
       
       //destroying the banana after the monkey eats it
       bananaGroup.destroyEach();
       
       
     
    
     }
    //making the monkey grow in order
      switch(scores){
          
        case 0 : monkey.scale = 0.10;
          break;
        case 1 : monkey.scale = 0.12;
          break;  
        case 2 : monkey.scale = 0.14;
          break;
        case 3 : monkey.scale = 0.16;
          break;
        case 4 : monkey.scale = 0.18;
          break;
          default: break;
      }
      
    //making the monkey lose a heart
   if(stoneGroup.isTouching(monkey)){
     stoneGroup.destroyEach();
     rock = rock + 1
     monkey.scale = 0.1
     heart2.visible = false;
     loseSound.play();
   }
    
    //transitioning to the game state END
     if(rock === 2){
     stoneGroup.destroyEach();
       gameState = END;
       heart1.visible = false;
       loseSound.play();
     }
 
 }
  
  //game state END
  else if(gameState === END){
    
    //to display the gameOver picture
    gameOver.visible = true;
    
    //making the monkey collide on the invisible ground
    monkey.collide(invisibleGround);
    
    //stopping the invisible ground, background and monkey, and disallowing the monkey to jump
    invisibleGround.velocityX = 0;
    jungle.velocityX = 0;
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    
    //stopping the stone group and the banana group from moving
    bananaGroup.setVelocityXEach(0);
    stoneGroup.setVelocityXEach(0);
     
    bananaGroup.setLifetimeEach(-1);
    stoneGroup.setLifetimeEach(-1);
  }
  
//displaying all the sprites given in function setup
drawSprites();
  
  //displaying the score and giving specific functions to it
  stroke("white");
  strokeWeight(4)
  textSize(20);
  fill("black");
  text("Score = "+ score,270,55);
}

//making a function for the bananas
function bananas(){
  
  //making it appear at equal intervals
  if(frameCount%80 === 0){
    
//giving different functions to the banana sprite
  banana = createSprite(400,200,10,10);
  banana.addImage("banana", bananaImage)
  banana.scale = 0.1
  banana.velocityX = -5
  banana.y = Math.round(random(150,300));
  banana.lifetime = 120 
 
    //adding bananas to the banana group
    bananaGroup.add(banana);
    
  }
  
  
  
}

//making a function for the stones
function stones(){
 
 //making it appear at equal intervals
  if(frameCount%280 === 0){
    
//giving different functions to the stone sprite
  stone = createSprite(400,340,10,10);
  stone.addImage("stone", stoneImage)
  stone.scale = 0.1
  stone.velocityX = -4
  stone.lifetime = 100
 
    //adding stones to the stone group
    stoneGroup.add(stone);
    
 }
}




