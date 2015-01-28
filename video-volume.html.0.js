
    Polymer('video-volume', {
      load: function() {
        this.volume = this.volume || 1;
        this.$.slider.value = this.volume;
        this.fire('core-signal', { name: 'volume', data: (this.volume / 100) });
      },
      toggle: function() {
        this.$.dropdown.toggle();
      },
      sliderChange: function(e, detail, sender) {
        this.volume = sender.immediateValue;
        this.fire('core-signal', { name: 'volume', data: (this.volume / 100) });
      },
      canplay: function(e, detail, sender) {
        this.fire('core-signal', { name: 'volume', data: (this.volume / 100) });
      }
    });
