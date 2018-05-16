'use strict';

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _downloadFile = require('download-file');

var _downloadFile2 = _interopRequireDefault(_downloadFile);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var address = 'http://www.clustal.org/omega/';
var platform = _os2.default.platform();

function getClustalOmega() {
    switch (platform) {
        case 'linux':
            var architecture = _os2.default.arch();
            if (architecture === 'x64') {
                address += 'clustalo-1.2.4-Ubuntu-x86_64';
            } else {
                address += 'clustalo-1.2.4-Ubuntu-32-bit';
            }
            downloadCO(address);
            break;
        case 'darwin':
            address += 'clustal-omega-1.2.3-macosx';
            downloadCO(address);
            break;

        case 'win32':
            address += 'clustal-omega-1.2.2-win64.zip';
            downloadCO(address);
            break;

        case 'freebsd':
            address += 'clustalo-1.2.2-FreeBSD-x86-64';
            downloadCO(address);
            break;

        default:
            console.log("Clustal Omega is not available for your operating system type");
    }
}

function makeExecutable(location) {
    if (platform === 'linux' || platform === 'freebsd') {
        _child_process2.default.exec('chmod u+x clustalo', { cwd: location }, function (err) {
            if (err) {
                console.log('ERROR: ' + err);
            }
        });
    } else if (platform === 'darwin') {
        _child_process2.default.exec('chmod 755 clustalo', { cwd: location }, function (err) {
            if (err) {
                console.log(err);
            }
        });
    } else if (platform === 'windows') {
        console.log('You have to install Clustal Omega manually for Windows');
    }
}

function downloadCO(url) {
    console.log('Downloading Clustal Omega from ', url);
    (0, _downloadFile2.default)(url, { directory: './bin', filename: 'clustalo' }, function (err) {
        if (err) {
            console.log('Download failed');
            console.log(err);
        } else {
            console.log('Download complete');
            makeExecutable('./bin');
        }
    });
}

getClustalOmega();