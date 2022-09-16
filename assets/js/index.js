import SwipeCarousel from './carousel-swipe.js';
const carousel = new SwipeCarousel({
  // containerID: '#carousel',
  slideID: '.slide',
  interval: 1500,
  isPlaying: false,
});
carousel.init();
