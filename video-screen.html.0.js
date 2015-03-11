"use strict";
Polymer('video-screen', {
  hiddenPlayButton: false,
  hiddenWaitingScreen: true,
  video: null,
  sources: [],
  ready: function() {
    this.sources = [].slice.call(this.$.content.getDistributedNodes());
    this.video = this.$.video;
    this.video.onended = this.ended.bind(this);
    this.video.addEventListener('play', this.playClick.bind(this), true);
    this.video.addEventListener('pause', this.pauseClick.bind(this), true);
    this.video.addEventListener("timeupdate", this.timeupdate.bind(this), true);
    this.video.addEventListener("progress", this.progress.bind(this), true);
    this.video.addEventListener("canplay", this.canplay.bind(this), true);
    this.video.addEventListener("volumechange", this.volumechange.bind(this), true);
    this.video.addEventListener("canplaythrough", this.canplaythrough.bind(this), true);

    this.onMutation(this, this.childrenUpdated);
  },
  childrenUpdated: function(observer, mutations) {
    this.sources = [].slice.call(this.$.content.getDistributedNodes());
    // Monitor again.
    this.onMutation(this, this.childrenUpdated);
  },
  playClick: function () {
    this.fire('core-signal', { name: "play" });
  },
  pauseClick: function() {
    this.fire('core-signal', { name: "pause" });
  },
  play: function() { this.video.play();  this.hiddenPlayButton = true; this.hiddenWaitingScreen = false; },
  pause: function() { this.video.pause(); this.hiddenPlayButton = false; this.hiddenWaitingScreen = true; },
  ended: function() { this.hiddenPlayButton = false; },
  timeupdate: function() {
    if(this.video.duration <= 0) return;
    var value = (100 / this.video.duration) * this.video.currentTime;
    this.fire('core-signal', { name: 'timeupdate', data: value });
  },
  progress: function() {
    this.hiddenWaitingScreen = this.video.readyState == 4 ? true : false;
    if(this.video.duration <= 0 || this.video.buffered.length == 0) return;
    var buffered_end = this.video.buffered.end(this.video.buffered.length - 1);
    var progress_amount = (buffered_end / this.video.duration) * 100;
    this.fire('core-signal', { name: 'progress-amount', data: progress_amount });
  },
  canplay: function() {
    this.fire('core-signal', { name: 'canplay' });
  },
  volumechange: function() {
    if(this.video.muted) {
      this.fire('core-signal', { name: 'volumechange', data: 0 });
      this.video.muted = false;
    }
    else this.fire('core-signal', { name: 'volumechange', data: this.video.volume*100 });
  },
  change: function(e, detail, sender) {
    if(isNaN(this.video.duration)) return;
    var time = this.video.duration * (detail / 100);
    this.video.currentTime = time;
  },
  volume: function(e, detail, sender) {
    this.video.volume = detail
  },
  canplaythrough: function() {
    this.hiddenWaitingScreen = true;
  },
  keyHandler: function(e, detail, sender) {
    switch (detail.key) {
      case 'left':  this.video.currentTime -= 5; break;
      case 'right': this.video.currentTime += 5; break;
      case 'space': this.hiddenPlayButton ? this.pauseClick() : this.playClick();
    }
    return false;
  }
});

