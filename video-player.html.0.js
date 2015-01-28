Polymer('video-player', {
  sources: [],
  ready: function() {
    this.sources = [].slice.call(this.$.content.getDistributedNodes());
    this.screen = this.shadowRoot.querySelector('video-screen');
    this.controls = this.shadowRoot.querySelector('video-controls');
  }
});

