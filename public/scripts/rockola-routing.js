'use strict'

rockola.config(
			  [
			   '$stateProvider',
			   '$urlRouterProvider',
			   '$locationProvider',
	function(	$stateProvider, 
			 	$urlRouterProvider, 
			 	$locationProvider
			){

			// $locationProvider.html5Mode(true);
			// Default URL
			$urlRouterProvider.otherwise('/app/search');
	
			var root = {
				partials    : 'partials/',
				directives  : 'partials/directives/'
			};
	
			// Aplication states
			$stateProvider
				// App state
				.state(
					'app',
					{
						url 	    : '/app',
						templateUrl : root.partials + 'app.html',
						abstract    : true
					}
				)
					// App children states
					.state(
						'app.search',
						{
							url 	    : '/search',
							templateUrl : root.directives + 'search_song.html',
							controller  : 'search_controller as search_ctrl'
						}
					)
					.state(
						'app.vote',
						{
							url 	    : '/vote',
							templateUrl : root.directives + 'vote_song.html',
							controller  : 'vote_controller as vote_ctrl'
						}
					)
					.state(
						'app.play',
						{
							url 	    : '/play',
							templateUrl : root.directives + 'play_music.html',
							controller  : 'play_music_controller as play_ctrl'
						}
					)
			// Host state
				.state(
					'hosting',
					{
						url 	    : '/hosting',
						templateUrl : root.directives + 'hosting.html',
						controller  : 'hosting_controller as hosting_ctrl'
					}
				)
	
	
		}

]);

rockola.run(
			  [
			   '$rootScope',
			   '$state',
			   '$urlRouter',
			   '$location',
			   'party',
			   'socket',
			   'client',
	function(	$rootScope,
				$state, 
			 	$urlRouter, 
			 	$location,
			 	$party,
			 	$socket,
			 	$client

			){

	// Dependencies.
	var party  = $party,
		socket = $socket,
		client = $client;

	$rootScope.$on(
		// Event.
		'$stateChangeSuccess', 
		// Callback.
		function(event, toState, toParams, fromState, fromParams){
			if(fromState.name === 'hosting'){
				socket.emit('stop:party');
    			party.host = null;
			}
		}
	);

	$rootScope.$on(
		// Event.
		'$stateChangeStart', 
		//  Callback.
		function(event, toState, toParams, fromState, fromParams){
			$rootScope.$on('services:initialized', function(){
				if(toState.name === 'hosting'){
					if(party.host){
						if(party.host !== client.device_id){
							$state.go(fromState.name);
						}
					}
				}
			})
		}
	);

 }
]);