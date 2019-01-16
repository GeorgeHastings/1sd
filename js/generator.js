'use strict';

var Dictionary = {
	objects: ['Advertising','Analytics','Audio','Banking','Billing','Blogging','Branding','Collaboration','Commerce','Communication','Communities','Creation','Crowdfunding','Currency','Data','Dating','Decision Making','Design','Dining','Discovery','Drones','E-commerce','Economies','Education','Entertainment','Environments','Evangelization','Events','Farming','Fashion','Feedback','Forecasting','Friends','Gambling','Gaming','Governance','Hackathons','Healthcare','Investing','Jobs','Learning','Living','Mapping','Memory','Messaging','Music','Neighborhoods','Networking','News','Notifications','Onboarding','Optimization','Payments','Photostreaming','Privacy','Publishing','Recommendations','Search','Security','Sharing','Shipping','Shopping','Storytelling','Streaming','Task Management','Transportation','Video','Wearables','Workspaces'],
	descriptors: ['Adaptive','Adult','Agile','Ambient','Anonymous','Automated','Collective','Connected','Contextual','Continuous','Curated','Dynamic','Ephemeral','Fantasy','Gamified','Global','Guerilla','Humanized','Hyperlocal','Incremental','Instantaneous','Interactive','Interstitial','Localized','Macro','Meta','Micro','Minimal','Mobile','Molecular','On-demand','Open-Source','Peer-to-peer','Personalized','Predictive','Premium','Progressive','Quantified', 'Quantam', 'Rapid','Real-time','Responsive','Self-perpetuating', 'Semantic','Serendipitous','Shoppable','Social','Stealth','Sustainable','Targeted','Ubiquitous','Virtual']
};

var Interface = {
	trigger: document.querySelector('[osd-trigger]'),
	output: document.querySelector('[osd-output]'),
	timer: document.querySelector('[osd-timer]')
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
		
		if(this.checkIfRepeat() === true) {
			console.log('repeat');
			this.genConcept();
		}
	},
	checkIfRepeat: function() {
		for(var i = 0; i < this.concept.length; i++){
		    for(var j = 0; j < this.prevConcept.length; j++) {
		        if(this.concept[i] === this.prevConcept[j]){
		            return true;
		        }
		    }
		}
	},
	renderConcept: function() {
		Interface.output.innerHTML = this.concept[0] +' '+ this.concept[1] +' '+ this.concept[2];
	},
	startTimer: function() {
		var t = this;
		t.currentTime = t.initialTime;
	    t.newTimer = setInterval(function () {
	    	t.currentTime--;
	    	t.renderTimer();

	    	if(t.currentTime === 0) {
	    		clearInterval(t.newTimer);
	    		
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

setInterval(function(){
	Round.storePrevConcept();
	Round.init();
}, 10);
