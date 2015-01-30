Polymer('video-player', {
  sources: [],
  ready: function() {
    this.sources = [].slice.call(this.$.content.getDistributedNodes());
    this.screen = this.shadowRoot.querySelector('video-screen');
    this.controls = this.shadowRoot.querySelector('video-controls');
  },
  fullscreen: function() {
    if (this.requestFullscreen) {
      this.requestFullscreen();
    } else if (this.mozRequestFullScreen) {
      this.mozRequestFullScreen(); // Firefox
    } else if (this.webkitRequestFullscreen) {
      this.webkitRequestFullscreen(); // Chrome and Safari
    }
  }
});

