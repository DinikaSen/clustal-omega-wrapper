/*
This tests require clustalo binary executable to be installed in util/bin/ under name 'clustalo'

To download clustalo binary executable and build in the target location run following file :
                    util/downloader.js
*/

require('mocha');
const assert = require('assert');
import { expect } from 'chai';
import {should} from 'chai';
import {stdout} from "test-console";
import {resolve} from 'path';

let restoreStdout;

import clustalOmega from '../lib/clustalOmega';


describe('#Set custom execution path', function () {

    it('execLocation should be set', function (done) {
        let location = 'src/util/bin';
        restoreStdout = stdout.ignore();
        clustalOmega.setCustomLocation(location);
        restoreStdout();
        assert.deepEqual(clustalOmega.customExecLocation, resolve(location));
        done();
    });
    it('execLocation should not be set', function (done) {
        let location = 'util';
        restoreStdout = stdout.ignore();
        clustalOmega.setCustomLocation(location);
        restoreStdout();
        assert.notDeepEqual(clustalOmega.customExecLocation, resolve(location));
        done();
    });
});


describe('#Align an unaligned sequence file', function () {
    it('should execute clustalo command (output format = fasta)', function (done) {
        let inspect = stdout.inspect();
        clustalOmega.alignSeqFile('src/test/samples/example.fasta', 'fasta', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1], "Success.!\n");
            done();
        });
    });

    it('should execute clustalo command (output format = clustal)', function (done) {
        let inspect = stdout.inspect();
        clustalOmega.alignSeqFile('src/test/samples/example.fasta', 'clustal', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1], "Success.!\n");
            done();
        });
    });

    it('should execute clustalo command (output format = msf)', function (done) {
        let inspect = stdout.inspect();
        clustalOmega.alignSeqFile('src/test/samples/example.fasta', 'msf', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1], "Success.!\n");
            done();
        });
    });

    it('should execute clustalo command (output format = phylip)', function (done) {
        let inspect = stdout.inspect();
        clustalOmega.alignSeqFile('src/test/samples/example.fasta', 'phylip', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1], "Success.!\n");
            done();
        });
    });

    it('should execute clustalo command (output format = selex)', function (done) {
        let inspect = stdout.inspect();
        clustalOmega.alignSeqFile('src/test/samples/example.fasta', 'selex', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1], "Success.!\n");
            done();
        });
    });

    it('should execute clustalo command (output format = stockholm)', function (done) {
        let inspect = stdout.inspect();
        clustalOmega.alignSeqFile('src/test/samples/example.fasta', 'stockholm', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1], "Success.!\n");
            done();
        });
    });

    it('should execute clustalo command (output format = vienna)', function (done) {
        let inspect = stdout.inspect();
        clustalOmega.alignSeqFile('src/test/samples/example.fasta', 'vienna', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1], "Success.!\n");
            done();
        });
    });
});

describe('#Align a string input of sequences', function () {
    it('should execute clustalo command with no error', function (done) {
        let inspect = stdout.inspect();
        let input = '>test1\n' +
            'ACDEFGHIKLMNPQRSTVWY\n' +
            '>test2\n' +
            'XXXXACDEFGHIMNXXXPQRSTVWY\n' +
            '>test3\n' +
            'ACDEFGHILMNXXXXXPQRSTVWYXXXX\n' +
            '>test4\n' +
            'XXXACDEFGHIKLMNPQRSTVWYXXX';
        clustalOmega.alignSeqString(input, 'fasta', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1], "Success.!\n");
            done();
        });
    });
});

describe('#Align an unaligned seq file and an HMM', function () {
    it('should execute clustalo command with no error', function (done) {
        let inspect = stdout.inspect();
        let input = 'src/test/samples/example2.fasta';
        let hmm = 'src/test/samples/example2-hmm.hmm';
        clustalOmega.alignSeqWithHmm(input, hmm, 'fasta', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1], "Success.!\n");
            done();
        });
    });
});

describe('#Align an unaligned seq file and a profile', function () {
    it('should execute clustalo command with no error', function (done) {
        let inspect = stdout.inspect();
        let prof1 = 'src/test/samples/prof1.profile';
        let file = 'src/test/samples/prof1Seq.ali';
        clustalOmega.alignSeqWithProfile(file, prof1, 'fasta', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1], "Success.!\n");
            done();
        });
    });
});


describe('#Align two profiles', function () {
    it('should execute clustalo command (output format = fasta)', function (done) {
        let inspect = stdout.inspect();
        let prof1 = 'src/test/samples/prof1.profile';
        let prof2 = 'src/test/samples/prof2.profile';
        clustalOmega.alignTwoProfiles(prof1, prof2, 'fasta', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1], "Success.!\n");
            done();
        });
    });
});