Polymer('video-player', {
  sources: [],
  fullscreenToggle: false,
  initScreenWidth: null,
  initScreenHeight: null,
  ready: function() {
    this.sources = [].slice.call(this.$.content.getDistributedNodes());

    document.addEventListener('webkitfullscreenchange', this.fullscreenChange.bind(this), false);
    document.addEventListener('mozfullscreenchange', this.fullscreenChange.bind(this), false);
    document.addEventListener('fullscreenchange', this.fullscreenChange.bind(this), false);
  },
  domReady: function() {
    this.initScreenWidth = this.$.screen.style.width;
    this.initScreenHeight = this.$.screen.style.height;
  },
  fullscreen: function() {
    if (this.requestFullscreen) {
      this.requestFullscreen();
    } else if (this.mozRequestFullScreen) {
      this.mozRequestFullScreen(); // Firefox
    } else if (this.webkitRequestFullscreen) {
      this.webkitRequestFullscreen(); // Chrome and Safari
    }
  },
  fullscreenChange: function() {
    this.fullscreenToggle = this.fullscreenToggle ? false : true;
    this.$.screen.style.width = this.fullscreenToggle ? window.innerWidth  + "px" : this.initScreenWidth;
    this.$.screen.style.height = this.fullscreenToggle ? window.innerHeight  + "px" : this.initScreenHeight;
  }
});

