var child_process = require('child_process');
var fs = require('fs');
var path = require('path');
var uuidv4 = require('uuid/v4');


var clustalOmega = {
    execLocation: path.resolve(path.join(__dirname,'../util/bin/')),
    customExecLocation: null
};

/*
set a custom location where Clustal Omega binary is located
 */
clustalOmega.setCustomLocation = function (location) {
    var binPath = location + '/clustalo';
    if (fs.existsSync(binPath)) {
        clustalOmega.customExecLocation = path.resolve(location);
        console.log('Custom execution path is set to ' + path.resolve(location));
    } else {
        console.log(binPath + ' does not exist. ' +
            '\nPlease check whether the Clustal Omega binary file is located' +
            ' in the given path with the name \'clustalo\'.');
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
    if(fs.existsSync(inputFile)){
        var clustalCommand = '-i ' + path.resolve(inputFile) + ' --outfmt=' + outputFormat;
        run(clustalCommand, function(err,stdOut,stdError){
            return callback(err,stdOut,stdError);
        });
    }
    else{
        var err = 'Input file does not exist';
        return callback(err,null);
    }
}

function alignStringSequences(input, outputFormat, callback) {
    const tempInputFile = __dirname + '/' + uuidv4() + '.fasta';
    fs.writeFileSync(tempInputFile, input);
    var clustalCommand = '-i ' + path.resolve(tempInputFile) + ' --outfmt=' + outputFormat;
    run(clustalCommand, function(err,stdOut){
        fs.unlinkSync(tempInputFile);
        return callback(err,stdOut);
    });
}

function alignTwoFiles(alignmentType, inputFile1, inputfile2, outputFormat, callback) {
    if(fs.existsSync(inputFile1) && fs.existsSync(inputfile2)){
        if (alignmentType === 'file&hmm') {
            var clustalCommand = '-i ' + inputFile1 + ' --hmm-in=' + inputfile2 + ' --outfmt=' + outputFormat;
        }
        else if (alignmentType === 'prof&file') {
            var clustalCommand = '-i ' + inputFile1 + ' --p1=' + inputfile2 + ' --outfmt=' + outputFormat;
        }
        else if (alignmentType === 'twoProfiles') {
            var clustalCommand = '--p1=' + inputFile1 + ' --p2=' + inputfile2 + ' --outfmt=' + outputFormat;
        }
        run(clustalCommand, function(err,stdOut){
            return callback(err,stdOut);
        });
    }
    else{
        var err = 'Input file does not exist';
        return callback(err, null);
    }
}

function run(command, callback) {
    if ( clustalOmega.customExecLocation != null){
        var fullCommand = clustalOmega.customExecLocation + '/./clustalo ' + command;
    }else {
        var fullCommand = clustalOmega.execLocation + '/./clustalo ' + command;
    }
    console.log('RUNNING', fullCommand);
    child_process.exec(fullCommand, {maxBuffer: 1024 * 1000}, callback);
}


module.exports = clustalOmega;