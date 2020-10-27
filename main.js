let env, pet

function preload(){
  env = new Env()
  env.load()
}

function setup(){
  createCanvas(600, 600)
  frameRate(60)
}

function draw(){
  if(env.pet){
    pet.act()
    env.display()
    env.addTime()

    stats.style.display = 'block'
    stats.innerHTML = `\
NAME: ${pet.name}
HUNGER: ${pet.hunger | 0}/${pet.maxhunger}
SPEED: ${pet.speed}
GROWTH: ${pet.growth}
FOOD: ${env.food.length}/8`
  }
  else {
    background('#443850')
    title.style.display = 'block'
  }
}

function keyPressed(){
  if(env.pet){
    if(key == 'q'){
      env.addFood()
    }
    if(key == 'w'){
      env.remFood()
    }
  }
  else if(key == 'q'){
    title.style.display = 'none'
    pet = new Pet(env, prompt('Type a name for your pet:').toUpperCase())
    env.link(pet)
  }
}

function mouseReleased(){
  if(env.pet){
    env.dragging = false
    env.dragged = null
  }
}

function mouseDragged(){
  if(env.pet){
    env.dragging = true
    env.drag()
  }
}
