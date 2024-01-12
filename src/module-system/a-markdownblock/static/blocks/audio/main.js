(function (global, factory) {
  /* eslint-disable */
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : null;
  /* eslint-enable */
})(this, function () {
  class Audio {
    constructor(host) {
      this.host = host;
      this.APlayer = null;
      this.playerInstance = null;
    }

    render() {
      return '<div class="aplayer"></div>';
    }

    async mount() {
      const { $container, $content, $util } = this.host;
      const $player = $container.querySelector('.aplayer');
      // content
      if (!$content.audio) return;
      $content.container = $player;
      $content.autoplay = !!$content.autoplay;
      $content.loop = $content.loop ? 'all' : 'none';
      // audio
      if (!Array.isArray($content.audio)) {
        $content.audio = [$content.audio];
      }
      for (const audio of $content.audio) {
        audio.name = $util.escapeHtml(audio.name);
        audio.url = $util.escapeURL(audio.url);
        audio.artist = $util.escapeHtml(audio.artist);
        audio.cover = $util.escapeURL(audio.cover);
        if (!audio.cover) audio.cover = $util.url('api/static/a/base/img/audio_cover.jpg');
      }
      // create
      const APlayer = await this._loadAPlayer();
      this.playerInstance = new APlayer($content);
    }

    unmount() {
      if (this.playerInstance) {
        this.playerInstance.destroy();
        this.playerInstance = null;
      }
    }

    async _loadAPlayer() {
      if (this.APlayer) return this.APlayer;
      return new Promise(resolve => {
        require.config({
          paths: {
            APlayer: 'api/static/a/markdownblock/blocks/audio/aplayer/aplayer-1.10.1.min',
            APlayer_CSS: 'api/static/a/markdownblock/blocks/audio/aplayer/aplayer-1.10.1.min',
            AudioMain_CSS: 'api/static/a/markdownblock/blocks/audio/main',
          },
        });
        require(['APlayer', 'css!APlayer_CSS', 'css!AudioMain_CSS'], APlayer => {
          this.APlayer = APlayer;
          resolve(APlayer);
        });
      });
    }
  }
  return Audio;
});
