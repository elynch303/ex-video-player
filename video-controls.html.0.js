Polymer('video-controls', {
  togged: false,
  playClick: function() {
    if(!this.togged) this.fire('core-signal', { name: "play" });
    else this.fire('core-signal', { name: "pause" });
  },
  sliderChange: function(e, detail, sender) {
    this.fire('core-signal', { name: 'change', data: sender.immediateValue });
  },
  play: function() {
    this.togged = true;
    this.$.play.icon = "av:pause";
  },
  pause: function() {
    this.togged = false;
    this.$.play.icon = "av:play-arrow";
  },
  timeupdate: function(e, detail, sender) {
    this.$.slider.value = detail;
  },
  progress_amount: function(e, detail, sender) {
    this.$.slider.secondaryProgress = detail;
  },
  fullscreen: function() {
    this.fire('core-signal', { name: "fullscreen" });
  }
});

