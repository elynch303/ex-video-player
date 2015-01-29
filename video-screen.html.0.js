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
  play: function() { this.video.play();  this.hiddenPlayButton = true; },
  pause: function() { this.video.pause(); this.hiddenPlayButton = false; },
  ended: function() { this.hiddenPlayButton = false; },
  timeupdate: function() {
    if(this.video.duration <= 0) return;
    var value = (100 / this.video.duration) * this.video.currentTime;
    this.fire('core-signal', { name: 'timeupdate', data: value });
  },
  progress: function() {
    if(this.video.readyState == 4) this.hiddenWaitingScreen = true; else this.hiddenWaitingScreen = false;
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
  fullscreen: function() {
    if (this.video.requestFullscreen) {
      this.video.requestFullscreen();
    } else if (this.video.mozRequestFullScreen) {
      this.video.mozRequestFullScreen(); // Firefox
    } else if (this.video.webkitRequestFullscreen) {
      this.video.webkitRequestFullscreen(); // Chrome and Safari
    }
  },
  volume: function(e, detail, sender) {
    this.video.volume = detail
  },
  canplaythrough: function() {
    this.hiddenWaitingScreen = true;
  },
  left: function(e) {
    this.video.currentTime -= 5;
  },
  right: function(e) {
    this.video.currentTime += 5;
  },
  space: function(e) {
    if(this.hiddenPlayButton) this.pauseClick();
    else this.playClick();
  }
});

