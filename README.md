# Rick Roulette
A chrome extension which will randomly redirect youtube views to a Rick Roll video.

![Roulette Wheel with Rick Astley's Head Inside][logo]
[logo]: https://raw.githubusercontent.com/ben174/rick-roulette/master/icons/icon256.png

Are you a glutton for punishment? Or do you secretly love being Rick Rolled?
No judgement here, but this extension might come in handy for you!

Whenever you visit a YouTube page, you'll have a 1 in N chance of having
the video element replaced with a Rick Roll. The value of N is 6 by default
but you can configure this to whatever number you choose.

## Future Improvements

As of now, this extension only replaces YouTube videos, but in the future
I think it would be cool if it could replace videos on other sites.

#### Way future:

* Replace text blocks - do a regex search on the page for instances of 
 "never gonna ..." and "we're no ..." and "you wouldn't ...", etc. and 
replace the duration of the sentence with the obvious selection.

* Replace known paragraph blocks at known sites with an ascii-animation. 
This is only possible on sites where I have a good grasp on the layout
so I can be sure the ascii animation will fit right in.

