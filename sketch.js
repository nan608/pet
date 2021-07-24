//Create variables here
var food;
var dog;

var t=null;
var c=null;

var gameState="hungry"

function preload()
{
	//load images here
  dogHappy=loadImage("images/dogImg1.png")
  dogSad=loadImage("images/dogImg.png")
  bedRoomImg=loadImage("images/Bed Room.png")
  gardenImg=loadImage("images/Garden.png")
  washRoomImg=loadImage("images/Wash Room.png")
}

function setup() {
	createCanvas(800, 700);
  
  database=firebase.database()

  dog=createSprite(400,400,50,50)
  dog.addImage(dogSad)
  dog.scale=0.4

 
  database.ref('food').on("value",readPosition)

  
  bathButton=createButton("I want to take a bath.")
  bathButton.position(400,200)

  sleepButton=createButton("I am feeling sleepy.")
  sleepButton.position(600,200)

  playButton=createButton("Let's play.")
  playButton.position(750,200)

  hungryButton=createButton("I am feeling hungry.")
  hungryButton.position(850,200)


  
  milk1=new Food()
  milk1.getFeedTime()
  milk1.getFeedTimeMin()
  milk1.getAddTime()
  milk1.getAddTimeMin()

  database.ref('gameState').on("value",(data)=>{
    gameState=data.val()
  })
}


function draw() {  
  background("black")

  currentTime=hour();

  bathButton.mousePressed(()=>{
     gameState="bathing"
  })

  playButton.mousePressed(()=>{
    gameState="playing"
 })


  sleepButton.mousePressed(()=>{
    gameState="sleeping"
 })

 hungryButton.mousePressed(()=>{
  gameState="hungry"
 dog=createSprite(400,400)
 dog.addImage(dogSad)
 dog.scale=0.4
})








  if (gameState==="playing"){
    milk1.updateState("playing")
    milk1.garden()
  }

  else if 

  (gameState==="sleeping"){
    milk1.updateState("sleeping")
    milk1.bedRoom()
  }

  else if 

  (gameState==="bathing"){
    milk1.updateState("bathing")
    milk1.washRoom()
  }

  else if (gameState==="hungry") {
    milk1.updateState("hungry")
  }



  milk1.buttons()
  milk1.milkImg()

  if (gameState!=="hungry"){
    milk1.button1.hide()
    milk1.button2.hide()
    dog.remove()
  }
  else {
    milk1.button1.show()
    milk1.button2.show()
    dog.addImage(dogSad)
  }

  if (food===0){
    dog.addImage(dogHappy)
    dog.scale=0.4
  }

  

  drawSprites();
  //add styles here



  textSize(25)
  fill("green")

  if (milk1.feedTime<12){
    t="AM"
  }else
  if (milk1.feedTime>=12){
    t="PM"
  }

  if (milk1.addTime<12){
    c="AM"
  }else
  if (milk1.addTime>=12){
    c="PM"
  }



  text ("Last Fed : "+  milk1.feedTime+":"+milk1.feedTimeMin+" "+t,100,50)
  text ("Last Added : "+ milk1.addTime+":"+milk1.addTimeMin+" "+c,100,120)
 
  console.log(food)

}




function readPosition(data){

  food=data.val()
}

function WriteStock(data){

  database.ref('/').update({

    food:data,
    feedTime:hour(),
   feedTimeMin :minute(),
   
  })
}

function WriteStock2(data){

  database.ref('/').update({
    food:data,
    addTime:hour(),
    addTimeMin:minute()
  
  })
}