$(function(){


// set the date we're counting down to
var target_date = new Date('Jan, 31, 2014').getTime();
 
// variables for time units
var  hours, minutes, seconds;
 
// get tag element
var countdown = document.getElementById('countdown');
 
// update the tag with id "countdown" every 1 second
setInterval(function () {
 
    // find the amount of "seconds" between now and target
    var current_date = new Date().getTime();
    var seconds_left = (target_date - current_date) / 1000;
    
    
 
    // do some time calculations
    seconds_left = seconds_left % 86400;
     
    hours = parseInt(seconds_left / 3600);
    hours = hours * -1;
    if (hours < 10){ hours = "0" + hours;}
    seconds_left = seconds_left % 3600;
    minutes = parseInt(seconds_left / 60);
    minutes = minutes * -1;
    if (minutes < 10){ minutes = "0" + minutes;}
    seconds = parseInt(seconds_left % 60);
    seconds = seconds * -1;
     if (seconds < 10){ seconds = "0" + seconds;}
    // format countdown string + set tag value
    countdown.innerHTML = '<span class="hours">' + hours + '</span><b>:</b><span class="minutes">'
    + minutes + '</span><b>:</b><span class="seconds">' + seconds + '</span>'; 
        if ($('#bell').hasClass('bell-color')) {
           
            if (hours == $('#sel1').val() && minutes == $('#sel2').val()) {
                document.getElementById('audio').play();
            }
        }
}, 1000);


	// Cache some selectors

	var clock = $('#clock'),
		alarm = clock.find('.alarm'),
		ampm = clock.find('.ampm');

	// Map digits to their names (this will be an array)
	var digit_to_name = 'zero one two three four five six seven eight nine'.split(' ');

	// This object will hold the digit elements
	var digits = {};

	// Positions for the hours, minutes, and seconds
	var positions = [
		'h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'
	];

	// Generate the digits with the needed markup,
	// and add them to the clock

	var digit_holder = clock.find('.digits');

	$.each(positions, function(){

		if(this == ':'){
			digit_holder.append('<div class="dots">');
		}
		else{

			var pos = $('<div>');

			for(var i=1; i<8; i++){
				pos.append('<span class="d' + i + '">');
			}

			// Set the digits as key:value pairs in the digits object
			digits[this] = pos;

			// Add the digit elements to the page
			digit_holder.append(pos);
		}

	});

	// Add the weekday names

	var weekday_names = 'LUN MAR MIE JUE VIR SAB DOM'.split(' '),
		weekday_holder = clock.find('.weekdays');

	$.each(weekday_names, function(){
		weekday_holder.append('<span>' + this + '</span>');
	});

	var weekdays = clock.find('.weekdays span');


	// Run a timer every second and update the clock

	(function update_time(){

		// Use moment.js to output the current time as a string
		// hh is for the hours in 12-hour format,
		// mm - minutes, ss-seconds (all with leading zeroes),
		// d is for day of week and A is for AM/PM

		var now = moment().format("hhmmssdA");

		digits.h1.attr('class', digit_to_name[now[0]]);
		digits.h2.attr('class', digit_to_name[now[1]]);
		digits.m1.attr('class', digit_to_name[now[2]]);
		digits.m2.attr('class', digit_to_name[now[3]]);
		digits.s1.attr('class', digit_to_name[now[4]]);
		digits.s2.attr('class', digit_to_name[now[5]]);

		// The library returns Sunday as the first day of the week.
		// Stupid, I know. Lets shift all the days one position down, 
		// and make Sunday last

		var dow = now[6];
		dow--;
		
		// Sunday!
		if(dow < 0){
			// Make it last
			dow = 6;
		}

		// Mark the active day of the week
		weekdays.removeClass('active').eq(dow).addClass('active');

		// Set the am/pm text:
		ampm.text(now[7]+now[8]);

		// Schedule this function to be run again in 1 sec
		setTimeout(update_time, 1000);

	})();

	$( "#bell" ).on( "click", function() {
            if ($(this).hasClass('bell-color')){
                $(this).removeClass('bell-color');
                $("#sel1").prop('disabled', false);
                $("#sel2").prop('disabled', false);
            }else{ 
                $(this).addClass('bell-color');
                $("#sel1").prop('disabled', true);
                $("#sel2").prop('disabled', true);
            }
});

});