//////////////////////////////////////////////
// TIMER CONTROLLER
/////////////////////////////////////////////
var timerController = (function() {

    var Session = function(workLength, breakLength) {
        this.workLength = workLength;
        this.breakLength = breakLength;
    };

    var allSessions = {
        newSession: {},
        completedSessions: 0
    };


    return {
        addSession: function(workT, brkT) {
            var newSess;

            // create new session
            newSess = new Session(workT, brkT);

            // add new session to all sessions data
            allSessions.newSession = newSess;

            // return the new session
            return newSess;
        },

        testing: function() {
            console.log(allSessions.newSession);
        }
    };

})();




//////////////////////////////////////////////
// UI CONTROLLER
/////////////////////////////////////////////
var UIController = (function() {
	var DOMStrings = {
		plusMinBtns: '.buttons',
        workTime: '#work-time',
        breakTime: '#break-time',
        addWork: '#add-work',
        subWork: '#sub-work',
        addBreak: '#add-break',
        subBreak: '#sub-break',
        timer: '.timer',
	};
    
    var workTime = document.querySelector(DOMStrings.workTime);
    var breakTime = document.querySelector(DOMStrings.breakTime);
    var timer = document.querySelector(DOMStrings.timer);
    var work = 25;
    var brk = 5;

    return {

        updateSessionUI: function(val) {
            if (val === 'addWork') {
                work++;
                workTime.innerHTML = work;
                timer.innerHTML = work + ':00';
            } else if (val === 'subWork') {
                work--;
                workTime.innerHTML = work;
                timer.innerHTML = work + ':00';

            } else if (val === 'addBrk') {
                brk++;
                breakTime.innerHTML = brk;

            } else if (val === 'subBrk') {
                brk--;
                breakTime.innerHTML = brk;

            }

            return {
                sessionWorkTime: work,
                sessionBreakTime: brk
            };
        },

    	getDOMStrings: function() {
    		return DOMStrings;
    	}
	};

})();






//////////////////////////////////////////////
// CONTROLLER
/////////////////////////////////////////////
var controller = (function(timerCtrl, UICtrl) {

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMStrings();
            
        document.querySelector(DOM.addWork).addEventListener('click', updateSessAndBreak);
        document.querySelector(DOM.subWork).addEventListener('click', updateSessAndBreak);
        document.querySelector(DOM.addBreak).addEventListener('click', updateSessAndBreak);
        document.querySelector(DOM.subBreak).addEventListener('click', updateSessAndBreak);
    };
	


    var updateSessAndBreak = function() {
        var sessionm, newSess;

        //1. Get value of buttons
        var btnValue = this.value;

        //2. Update session UI + return session object
        session = UICtrl.updateSessionUI(btnValue);


        //3. Create new session in Timer Controller based on set work and break time
        newSess = timerController.addSession(session.sessionWorkTime, session.sessionBreakTime);
    };



    return {
        init: function() {
            console.log('App has started.');
            setupEventListeners();
        }
    };

})(timerController, UIController);



controller.init();