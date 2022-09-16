import Carousel from './carousel.js';

class SwipeCarousel extends Carousel {
  _swipeStart(event) {
    this.swipeStartX = event.changedTouches[0].pageX;
  }
  _swipeEnd(event) {
    this.swipeEndX = event.changedTouches[0].pageX;
    if (this.swipeEndX - this.swipeStartX < -100) this._prev();
    if (this.swipeEndX - this.swipeStartX > 100) this._next();
  }
  _initListeners() {
    super._initListeners();
    this.container.addEventListener('touchstart', this._swipeStart.bind(this));
    this.container.addEventListener('touchend', this._swipeEnd.bind(this));
  }
}
export default SwipeCarousel;
