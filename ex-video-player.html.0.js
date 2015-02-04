Polymer('ex-video-player', {
  sources: [],
  fullscreen: false,
  timeout: null,
  ready: function() {
    this.sources = [].slice.call(this.$.content.getDistributedNodes());

    document.addEventListener('webkitfullscreenchange', this.fullscreenChangeEvent.bind(this), false);
    document.addEventListener('mozfullscreenchange', this.fullscreenChangeEvent.bind(this), false);
    document.addEventListener('fullscreenchange', this.fullscreenChangeEvent.bind(this), false);
  },
  fullscreenChangeEvent: function() { this.fullscreen = this.fullscreen ? false : true; },
  fullscreenChanged: function (oldValue, newValue) {
    if(newValue) {
      this.timeout = setTimeout(this.hideControls.bind(this), 3000);
    } else {
      clearTimeout(this.timeout);
      this.showControls();
    }
  },
  hideControls: function() {
    this.style.cursor = "none";
    this.$.controls.hidden = true;
  },
  showControls: function() {
    this.style.cursor = "auto";
    this.$.controls.hidden = false;
  },
  mouseMoved: function() {
    if(this.fullscreen) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(this.hideControls.bind(this), 3000);
      this.showControls();
    }
  },
  fullscreenHandler: function() {
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
      if (this.requestFullscreen) {
        this.requestFullscreen();
      } else if (this.mozRequestFullScreen) {
        this.mozRequestFullScreen(); // Firefox
      } else if (this.webkitRequestFullscreen) {
        this.webkitRequestFullscreen(); // Chrome and Safari
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
});
