let limX = size=> constrain(mouseX, size / 2, width - size / 2)
let limY = size=> constrain(mouseY, size / 2, height - size / 2)

class Env {
  constructor(){
    this.food = []
    this.cd = {
      food: 0
    }
    this.imgs = {}
    this.time = 0
  }

  link(pet){
    this.pet = pet
  }

  load(){
    this.imgs.slime = loadImage('media/slime.png')
    this.imgs.bread = loadImage('media/bread.png')
    this.imgs.brdead = loadImage('media/brdead.png')
  }

  display(){
    if(this.pet){
      background('#d87cac')
      this.food.map(a=> a.display())
      this.pet.display()
    }
  }

  drag(){
    if(this.dragging){
      if(this.dragged){
        this.dragged.x = limX(this.dragged.size)
        this.dragged.y = limY(this.dragged.size)
      }
      else {
        if(this.pet.moused()){
          this.dragged = this.pet
        }
        for(let i = 0; i < this.food.length; i++){
          let f = this.food[i]
          if(f.moused()){
            this.dragged = f
          }
        }
      }
    }
  }

  addFood(){
    if(this.food.length < 8 && !this.cd.food){
      this.food.push(new Food(this, limX(new Food().size), limY(new Food().size), 5))
      this.cd.food = 180
    }
  }

  remFood(){
    let fi = this.food.findIndex(a=> a.moused())
    if(~fi){
      this.food.splice(fi, 1)
      this.cd.food = constrain(this.cd.food, 120, 180)
    }
  }

  addTime(){
    if(this.pet){
      this.time++
      for(let k in this.cd){
        this.cd[k] && this.cd[k]--
      }
      this.pet.addTime()
    }
  }
}

class Pet {
  constructor(env, name){
    this.name = name || 'PET';
    this.env = env;
    this.maxhunger = 10
    this.hunger = this.maxhunger / 2
    this.speed = 0
    this.growth = 0
    this.learn = []
    this.x = width / 2
    this.y = height / 2
    this.size = 64
    this.bcd = {
      eat: 60,
      grow: 480,
      hunger: 240
    }
    this.cd = {
      eat: 0,
      grow: 0,
      hunger: 240
    }
  }

  act(){
    this.size = 64 * this.maxhunger / 10 | 0
    if(!this.cd.hunger){
      this.hunger--
      this.cd.hunger = this.bcd.hunger
    }

    let f = this.nearestFoodDist()
    let fi = this.env.food.findIndex(a=> a.value > 0 && dist(this.x, this.y, a.x, a.y) == f)

    if(~fi){
      let food = this.env.food[fi]
      if(f <= (food.size + this.size) / 2 * sqrt(2)) this.consume(fi)
      else {
        if(this.speed > 0){
          if(this.hunger > this.moveCost(f)){
            this.move(food.x, food.y)
          }
          else if(this.growth > 0){
            this.speed--
            this.growth--
            this.hunger++
          }
          else {
            this.speed--
          }
        }
        this.stress('speed')
      }
    }

    if(this.learn.length && this.growth && !this.cd.grow){
      this.grow()
    }

    if(this.hunger <= 0){
      this.die()
    }
  }

  addTime(){
    for(let k in this.cd){
      this.cd[k] && this.cd[k]--
    }
  }

  nearestFoodDist(){
    let dists = this.env.food.filter(a=> a.value > 0).map(a=> dist(this.x, this.y, a.x, a.y))
    return Math.min(...dists)
  }

  consume(fi){
    if(!this.cd.eat){
      this.env.food[fi].value--
      if(this.hunger < this.maxhunger) this.hunger++
      else {
        this.hunger = this.maxhunger
        this.growth++
        this.less('maxhunger')
      }

      this.cd.eat = this.bcd.eat
    }
  }

  less(x){
      this.learn.push(x)
  }

  stress(x){
      this.learn.unshift(x)
  }

  grow(){
    this[this.learn.shift()]++
    this.growth--
    this.cd.grow = this.bcd.grow
  }

  move(x, y){
    let dir = createVector(this.x - x, this.y - y)
    dir.normalize()
    dir.mult(this.speed)

    this.x -= dir.x
    this.y -= dir.y
    this.hunger -= this.moveCost(dist(0, 0, dir.x, dir.y))
  }

  moveCost(d){
    return d * this.speed * .75 / 30
  }

  moused(){
    if(
      mouseX <= this.x + this.size / 2 && mouseX >= this.x - this.size / 2 &&
      mouseY <= this.y + this.size / 2 && mouseY >= this.y - this.size / 2
    ){
      return true
    }
    return false
  }

  die(){
    this.env.pet = null
    this.food = []
    this.cd = {
      food: 0
    }
    this.time = 0
    ttl.innerHTML = this.name + ' DIED :('
    subttl.innerHTML = 'PRESS "Q" TO RESTART'
  }

  display(){
    imageMode(CENTER)
    tint(255, this.hunger / pet.maxhunger * 255 | 0)
    image(this.env.imgs.slime, this.x, this.y, this.size, this.size)
  }
}

class Food {
  constructor(env, x, y, value){
    this.env = env
    this.maxvalue = value
    this.value = value
    this.x = x
    this.y = y
    this.size = 40
  }

  moused(){
    if(
      mouseX <= this.x + this.size / 2 && mouseX >= this.x - this.size / 2 &&
      mouseY <= this.y + this.size / 2 && mouseY >= this.y - this.size / 2
    ){
      return true
    }
    return false
  }

  display(){
    imageMode(CENTER)
    tint(255, this.value / this.maxvalue * 100 | 0 + 155)
    image(this.env.imgs[this.value > 0 ? 'bread' : 'brdead'], this.x, this.y, this.size, this.size)
  }
}
