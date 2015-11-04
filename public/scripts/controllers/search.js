(function(){

'use strict';

rockola.controller('search_controller', ['socket',
                                         'party',
                                         'search',
                                        function(
                                          $socket,
                                          $party,
                                          $search
                                        ) {

    // Controller alias
    var _this = this;

    // Controller members.
    _this.party        = $party;
    _this.search       = $search;
    _this.socket       = $socket;
    _this.found_tracks = [];

    // Methods.
    _this.get_songs = function(){
      _this.search.request(_this.query);
      _this.query = '';
    }

    _this.clear_search = function(){
      _this.found_tracks = [];
      _this.query        = '';
    }

    // Socket events
    _this.socket.on('song:added', function(playlist){
      _this.party.playlist = playlist;
      _this.party.playlist = _this.arrangePlaylist();
    });

    _this.socket.on('youtube:result', function(result){
      _this.found_tracks = result.items; 
    });

}]);

})();