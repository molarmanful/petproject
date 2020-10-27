# Development Journal

## October 18

Began brainstorming ideas for the game. I wanted to do something that involved an NPC that could learn, so I was playing around with ideas for chatbots. However, I realized that I could try making a Tamagotchi-type pet that would learn from your actions. This pet would initially start off extremely simple, as perhaps nothing more than a blip on the screen, but would over time grow and adapt to environmental changes. I'm not sure if I want there to be a specific goal, but I'd like the player to treat it as a bit of a sandbox and make their own goals. The specifics are not entirely there yet; I'll have to experiment/brainstorm further to reach a more concrete idea.

## October 19

I think implementation-wise, it would be best if I created a predefined "skill tree" that the NPC would follow throughout its development. By rewarding/punishing certain actions, the player can "train" the NPC to do certain tasks over others. I'm also thinking about randomized starting stats/specializations of some sort.

Some ideas:

- Using food as a primary reward/motivator esp. at the start of the NPC's lifespan (e.g. to help the NPC move around)
- VERY CONTROVERSIAL AND MAY NOT BE GREAT, but I'd also like to explore themes of abuse vs. punishment; neglect, for example via not feeding food, could serve as punishment but may also stifle growth in certain unintended ways.
- Perhaps an escape mechanic where if the NPC somehow escapes from the area in which you raise it, then the game ends? Could also happen if you give it too much food.

## October 21

Work-wise, I didn't do much. Most of the time was spent experimenting with ideas/implementations of various mechanics. I began designing sprites for the various items/pets.

## October 23

I finished implementing the basic functionalities (dragging, movement, etc.).

## October 25

I am working on implementing a learning queue that the pet uses to determine which stats to grow. This would allow the pet to prioritize certain stats depending on the environment.

## October 26

I made the sprites for the entities within the game. I have also figured out some UI design choices which are simple but also functional. Generally, the feeling I'm going for is more of a "simulation toy" feel.
