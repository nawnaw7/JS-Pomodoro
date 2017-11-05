//////////////////////////////////////////////
// TIMER CONTROLLER
/////////////////////////////////////////////
var timerController = (function() {

    var Session = function(sessWork, sessBreak) {
        this.sessWork = sessWork;
        this.sessBreak = sessBreak;
    };

    var workLength = 25;
    var breakLength = 5;
   
    return {
        sessionTime: function(value) {
            if (value === 'addWork') {
                workLength++;
            } else if (value === 'subWork') {
                workLength--;
            } else if (value === 'addBrk') {
                breakLength++;
            } else if (value === 'subBrk') {
                breakLength--;
            }

            console.log(workLength + ', ' + breakLength);
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
	};
    
    var workTime = document.querySelector(DOMStrings.workTime);
    var breakTime = document.querySelector(DOMStrings.breakTime);
    var work = 25;
    var brk = 5;

    return {

        updateWorkBrkUI: function(val) {
            if (val === 'addWork') {
                work++;
                workTime.innerHTML = work;
            } else if (val === 'subWork') {
                work--;
                workTime.innerHTML = work;

            } else if (val === 'addBrk') {
                brk++;
                breakTime.innerHTML = brk;

            } else if (val === 'subBrk') {
                brk--;
                breakTime.innerHTML = brk;

            }
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

	var DOM = UICtrl.getDOMStrings();
	
    document.querySelector(DOM.addWork).addEventListener('click', updateSessAndBreak);
    document.querySelector(DOM.subWork).addEventListener('click', updateSessAndBreak);
    document.querySelector(DOM.addBreak).addEventListener('click', updateSessAndBreak);
    document.querySelector(DOM.subBreak).addEventListener('click', updateSessAndBreak);


    function updateSessAndBreak() {
        var newSession;

        //1. Get value of buttons
        var btnValue = this.value;

        //2. Create session and break in Timer Controller
        timerCtrl.sessionTime(btnValue);

        //3. Update UI
        UICtrl.updateWorkBrkUI(btnValue);
    }

})(timerController, UIController);