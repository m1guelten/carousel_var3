class Carousel {
  constructor(params) {
    const setting = {
      ...{
        containerID: '#carousel',
        slideID: '.slide',
        interval: 5000,
        isPlaying: true,
      },
      ...params,
    };
    this.container = document.querySelector(setting.containerID);
    this.slides = this.container.querySelectorAll(setting.slideID);
    this.INTERVAL = setting.interval;
    this.isPlaying = setting.isPlaying;
  }
  _initProps() {
    this.SLIDES_COUNT = this.slides.length;
    this.CODE_LEFT_ARROW = 'ArrowLeft';
    this.CODE_RIGHT_ARROW = 'ArrowRight';
    this.CODE_SPACE = 'Space';
    this.FA_PLAY = '<i class="fa-regular fa-circle-play"></i>';
    this.FA_PAUSE = '<i class="fa-regular fa-circle-pause"></i>';
    this.FA_PREV = '<i class="fa-solid fa-chevron-left"></i>';
    this.FA_NEXT = '<i class="fa-solid fa-chevron-right"></i>';

    this.currentSlide = 0;
  }
  _initControls() {
    const controls = document.createElement('div');
    const PAUSE = `<span class="control control-pause" id="pause">${
      this.isPlaying === true ? this.FA_PAUSE : this.FA_PLAY
    }</span>`;
    const PREV = `<span class="control control-prev" id="prev">${this.FA_PREV}</span>`;
    const NEXT = `<span class="control control-next" id="next">${this.FA_NEXT}</span>`;
    controls.setAttribute('class', 'controls');
    controls.innerHTML = PAUSE + PREV + NEXT;
    this.container.append(controls);
    this.pauseBtn = this.container.querySelector('#pause');
    this.prevBtn = this.container.querySelector('#prev');
    this.nextBtn = this.container.querySelector('#next');
  }
  _initIndicators() {
    const indicators = document.createElement('div');
    indicators.setAttribute('class', 'indicators');
    this.container.append(indicators);
    for (let i = 0; i < this.SLIDES_COUNT; i++) {
      const indicator = document.createElement('span');
      indicator.setAttribute(
        'class',
        i === 0 ? 'indicator active' : 'indicator'
      );
      //  indicator.setAttribute('data-slide-to', i);
      indicator.dataset.slideTo = i;
      indicators.append(indicator);
    }
    this.indContainer = this.container.querySelector('.indicators');
    this.indItems = this.indContainer.querySelectorAll('.indicator');
  }
  init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick(this.isPlaying);
  }
  pausePlay() {
    if (this.isPlaying) this._pause();
    else this._play();
  }
  _gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indItems[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indItems[this.currentSlide].classList.toggle('active');
  }
  _gotoNext() {
    this._gotoNth(this.currentSlide + 1);
  }
  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1);
  }
  _pause() {
    this.isPlaying = false;
    clearInterval(this.timerID);
    this.pauseBtn.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
  }
  _play() {
    this.isPlaying = true;
    this._tick();
    this.pauseBtn.innerHTML = '<i class="fa-regular fa-circle-pause"></i>';
  }
  _next() {
    this._gotoNext();
    this._pause();
  }
  _prev() {
    this._gotoPrev();
    this._pause();
  }
  _gotoInd(event) {
    this.target = event.target;
    if (this.target && this.target.classList.contains('indicator')) {
      this.num = +this.target.getAttribute('data-slide-to');
      if (isNaN(this.num)) return;
      this._gotoNth(this.num);
      this._pause();
    }
  }
  _pressKey(event) {
    if (event.code === this.CODE_LEFT_ARROW) this._prev();
    if (event.code === this.CODE_RIGHT_ARROW) this._next();
    if (event.code === this.CODE_SPACE) this.pausePlay();
  }
  _tick(flag = true) {
    if (!flag) return;
    this.timerID = setInterval(this._gotoNext.bind(this), this.INTERVAL);
  }
  _initListeners() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.nextBtn.addEventListener('click', this._next.bind(this));
    this.prevBtn.addEventListener('click', this._prev.bind(this));
    this.indContainer.addEventListener('click', this._gotoInd.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this));
  }
}
export default Carousel;
