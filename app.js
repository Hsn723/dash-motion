const dash_button = require('node-dash-button');
const dash = dash_button('11:22:33:44:55:66', null, null, 'all');
const exec = require('child_process').exec;

const statusCmd = 'systemctl is-active motion.service';
const motionOn = 'systemctl start motion';
const motionOff = 'systemctl stop motion';
const ledOn = 'echo 1 | sudo tee /sys/class/leds/led0/brightness';
const ledOff = 'echo 0 | sudo tee /sys/class/leds/led0/brightness';

dash.on('detected', function () {
	console.log('Dash button pressed, checking service status');
	exec(statusCmd, function(err, stdout, stderr) {
		if(stdout === 'active\n') {
			console.log('Service is active, turning off');
			exec(motionOff);
                        console.log('Turning off LED');
                        exec(ledOff);
		}
		else {
			console.log('Service is inactive, turning on');
			exec(motionOn);
                        console.log('Turning on LED');
                        exec(ledOn);
		}
	});
});
