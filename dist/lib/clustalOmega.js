'use strict';

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clustalOmega = {
    execLocation: _path2.default.resolve(_path2.default.join(__dirname, '../util/bin/')),
    customExecLocation: null
};

/*
set a custom location where Clustal Omega binary is located
 */
clustalOmega.setCustomLocation = function (location) {
    var binPath = location + '/clustalo';
    if (_fs2.default.existsSync(binPath)) {
        clustalOmega.customExecLocation = _path2.default.resolve(location);
        console.log('Custom execution path is set to ' + _path2.default.resolve(location));
    } else {
        console.log(binPath + ' does not exist. \nPlease check whether the Clustal Omega binary file is located in the given path with the name \'clustalo\'.');
    }
};

/*
Align an unaligned sequence file
 */
clustalOmega.alignSeqFile = function (inputFile, outputFormat, callback) {
    alignOneFile(inputFile, outputFormat, callback);
};

/*
Align an unaligned input string of sequences of FASTA format and get output in accepted format
 */
clustalOmega.alignSeqString = function (input, outputFormat, callback) {
    alignStringSequences(input, outputFormat, callback);
};

/*
Align an unaligned seq file and an HMM
 */
clustalOmega.alignSeqWithHmm = function (inputFile1, inputFile2, outputFormat, callback) {
    alignTwoFiles('file&hmm', inputFile1, inputFile2, outputFormat, callback);
};

/*
Align an unaligned seq file and a profile
 */
clustalOmega.alignSeqWithProfile = function (inputFile1, inputFile2, outputFormat, callback) {
    alignTwoFiles('prof&file', inputFile1, inputFile2, outputFormat, callback);
};

/*
Align two profiles
 */
clustalOmega.alignTwoProfiles = function (inputFile1, inputFile2, outputFormat, callback) {
    alignTwoFiles('twoProfiles', inputFile1, inputFile2, outputFormat, callback);
};

function alignOneFile(inputFile, outputFormat, callback) {
    if (_fs2.default.existsSync(inputFile)) {
        var clustalCommand = '-i ' + _path2.default.resolve(inputFile) + ' --outfmt=' + outputFormat;
        run(clustalCommand, function (err, stdOut, stdError) {
            return callback(err, stdOut, stdError);
        });
    } else {
        var err = 'Input file does not exist';
        return callback(err, null);
    }
}

function alignStringSequences(input, outputFormat, callback) {
    var tempInputFile = __dirname + '/' + (0, _v2.default)() + '.fasta';
    _fs2.default.writeFileSync(tempInputFile, input);
    var clustalCommand = '-i ' + _path2.default.resolve(tempInputFile) + ' --outfmt=' + outputFormat;
    run(clustalCommand, function (err, stdOut) {
        _fs2.default.unlinkSync(tempInputFile);
        return callback(err, stdOut);
    });
}

function alignTwoFiles(alignmentType, inputFile1, inputfile2, outputFormat, callback) {
    if (_fs2.default.existsSync(inputFile1) && _fs2.default.existsSync(inputfile2)) {
        var clustalCommand = '';
        if (alignmentType === 'file&hmm') {
            clustalCommand = '-i ' + inputFile1 + ' --hmm-in=' + inputfile2 + ' --outfmt=' + outputFormat;
        } else if (alignmentType === 'prof&file') {
            clustalCommand = '-i ' + inputFile1 + ' --p1=' + inputfile2 + ' --outfmt=' + outputFormat;
        } else if (alignmentType === 'twoProfiles') {
            clustalCommand = '--p1=' + inputFile1 + ' --p2=' + inputfile2 + ' --outfmt=' + outputFormat;
        }
        run(clustalCommand, function (err, stdOut) {
            return callback(err, stdOut);
        });
    } else {
        var err = 'Input file does not exist';
        return callback(err, null);
    }
}

function run(command, callback) {
    var fullCommand = '';
    if (clustalOmega.customExecLocation != null) {
        fullCommand = clustalOmega.customExecLocation + '/./clustalo ' + command;
    } else {
        fullCommand = clustalOmega.execLocation + '/./clustalo ' + command;
    }
    console.log('RUNNING', fullCommand);
    _child_process2.default.exec(fullCommand, { maxBuffer: 1024 * 1000 }, callback);
}

module.exports = clustalOmega;