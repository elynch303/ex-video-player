Polymer('video-volume', {
  ready: function() {
    this.addEventListener('mousewheel', this.mousewheel);
  },
  load: function() {
    this.volume = this.volume || 0;
  },
  toggle: function() {
    this.$.dropdown.toggle();
  },
  mousewheel: function(e) {
    if(e.wheelDelta / 120 > 0) this.addVolume(+10); // UP
    else this.addVolume(-10); // DOWN
  },
  addVolume: function(value) {
    if(this.volume + value > 100) this.volume = 100;
    else if(this.volume + value < 0) this.volume = 0;
    else this.volume += value;
  },
  volumeChanged: function() {
    this.$.slider.value = this.volume;
    this.$.button.icon = this.volume == 0 ? "av:volume-mute" : "av:volume-up";
    this.fire('core-signal', { name: 'volume', data: (this.volume / 100) });
  },
  sliderChange: function(e, detail, sender) {
    this.volume = sender.immediateValue;
  },
  canplay: function(e, detail, sender) {
    this.volumeChanged();
  },
  volumechange: function(e, detail, sender) {
    this.volume = detail;
  }
});
