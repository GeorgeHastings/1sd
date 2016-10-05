'use strict';

var Dictionary = {
	objects: ['AI', 'Advertising','Analytics', 'Art', 'Audio','Banking', 'Bots', 'Climates', 'Collaboration','Commerce','Communication','Communities','Crowdfunding','Currency','Data','Dating', 'Delivery', 'Decision-Making','Design','Dining','Discovery','Drones','E-commerce','Economies','Education', 'Energy', 'Entertainment','Environments','Evangelization','Events','Farming','Fashion', 'Fitness', 'Forecasting','Gaming', 'Gender', 'Governance','Housing','Healthcare','Investing', 'Journalism', 'Labor', 'Learning', 'Leisure', 'Living', 'Manufacturing', 'Mapping', 'Medicine', 'Memory','Messaging','Music','Neighborhoods','Networking','News','Notifications', 'Nutrition', 'Optimization','Payments', 'Personalization', 'Photostreaming','Privacy','Productivity', 'Publishing','Recommendations', 'Relationships', 'Search','Security','Sharing','Shopping', 'Sports', 'Storytelling', 'Storage', 'Streaming','Transportation', 'Travel', 'Video', 'VR', 'Wearables','Workspaces'],
	descriptors: ['Adaptive','Adult','Agile', 'Affordable', 'Ambient','Anonymous','Automated','Bio', 'Branded', 'Collective','Connected','Contextual', 'Conversational', 'Continuous','Curated', 'Custom', 'Crowdsourced', 'Dynamic', 'Embeddable', 'Encrypted', 'Enterprise', 'Ephemeral', 'Exclusive', 'Fantasy', 'Free', 'Gamified','Genetic', 'Global','Guerilla', 'Grassroots', 'Humanized', 'Haptic', 'Hyperlocal','Incremental','Instantaneous','Interactive','Interstitial','Localized','Macro','Meta','Micro','Minimal','Mobile', 'Narrated', 'On-demand','Open-Source','P2P','Predictive','Premium','Progressive','Rapid','Real-time','Self-perpetuating','Semantic','Serendipitous','Shoppable','Social','Stealth','Sustainable', 'Synthetic', 'Targeted','Ubiquitous','Utilitarian', 'Virtual']
};

var Interface = {
	wrapper: document.getElementById('wrapper'),
	trigger: document.querySelector('[osd-trigger]'),
	output: document.querySelector('[osd-output]'),
	timer: document.querySelector('[osd-timer]'),
	circle: document.getElementById('circle'),
	button: document.querySelector('.button')
};

var Round = {
	initialTime: 30,
	currentTime: 30,
	concept: [],
	prevConcept: [],
	getWord: function (wordset) {
		return wordset[(Math.floor(Math.random() * (wordset.length - 0)) + 0).toFixed(0)];
	},
	genConcept: function() {
		this.concept = [this.getWord(Dictionary.descriptors), this.getWord(Dictionary.descriptors), this.getWord(Dictionary.objects)];

		if(this.concept[0] === this.concept[1]) {
			this.concept[0] = this.getWord(Dictionary.descriptors);
		}

		if(this.checkForRepeatWord() === true) {
			this.genConcept();
		}
	},
	checkForRepeatWord: function() {
		for(var i = 0; i < this.concept.length; i++){
		    for(var j = 0; j < this.prevConcept.length; j++) {
		        if(this.concept[i] === this.prevConcept[j]){
		            return true;
		        }
		    }
		}
	},
	renderConcept: function() {
		var str = this.concept[0] + '_' + this.concept[1] + '_' + this.concept[2];
		Interface.output.innerHTML = '';
		for(var i = 0; i < str.length; i++) {
			var span = document.createElement('span');
			var text = document.createTextNode(str[i]);
			if(str[i] === '_') {
				Interface.output.innerHTML += '&#32';
			}
			else {
				span.appendChild(text);
				Interface.output.appendChild(span);
			}
		}
		// Round.renderImage(this.concept[2]);
	},
	renderAtmos: function() {
		Interface.wrapper.classList.remove('lights-on');
		Interface.circle.classList.remove('counting');
		console.log(Interface.circle.offsetWidth);
		Interface.circle.classList.add('counting');
		Interface.button.innerHTML = 'Another One';

	},
	resetAtmos: function() {
		Interface.wrapper.classList.add('lights-on');
		Interface.circle.classList.remove('counting');
		Interface.button.innerHTML = 'New Round';
	},
	renderImage: function(keyword) {
		$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
		{
				tags: keyword,
				tagmode: 'any',
				format: 'json'
		},
		function(data) {
				var rnd = Math.floor(Math.random() * data.items.length);
				console.log(data);
				var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");

				$('#wrapper').css('background-image', "url('" + image_src + "')");

		});
	},
	startTimer: function() {
		var _timer = this;
		_timer.currentTime = _timer.initialTime;
	    _timer.newTimer = setInterval(function () {
	    	_timer.currentTime--;
	    	_timer.renderTimer();

	    	if(_timer.currentTime < 11) {
	    		Interface.timer.style.color = '#F11E54';
	    	}
	    	else {
	    		Interface.timer.style.color = '#5A6987';
	    	}

	    	if(_timer.currentTime === 0) {
					Interface.timer.style.color = '#5A6987';
	    		clearInterval(_timer.newTimer);
	    		Round.storePrevConcept();
					Round.resetAtmos();
					// Round.init();
	    		// end round here
	    	}
	    }, 1000);
	},
	renderTimer: function() {
		Interface.timer.innerHTML = this.currentTime;
	},
	resetTimer: function() {
		clearInterval(this.newTimer);
		this.currentTime = this.initialTime;
	},
	init: function() {
		this.resetTimer();
		this.renderTimer();
		this.genConcept();
		this.renderConcept();
		this.renderAtmos();
		this.startTimer();
	},
	storePrevConcept: function() {
		this.prevConcept = this.concept;
	}
};

Interface.trigger.addEventListener('click', function() {
	Round.storePrevConcept();
	Round.init();
});

// setInterval(function(){
// 	Round.endRound();
// 	Round.init();
// }, 10);
