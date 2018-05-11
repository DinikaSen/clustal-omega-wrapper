# clustal-omega-wrapper
A simple node module that wraps the functionalities of Clustal Omega multiple sequence alignment program

Visit official Clustal Omega web site to learn more about it. [http://www.clustal.org/omega/](http://www.clustal.org/omega/)

## Install

You can install clustal-omega-wrapper by running,

```bash
npm install clustal-omega-wrapper
```

You can download Clustal Omega executable by running, 

```bash
node util/downloader.js
```

It will download the Clustal Omega executable to util/bin folder 

## Usage
#### Align an unaligned sequence file
* .alignSeqFile (inputFile, outputFormat, callback)    
  callback passed (err, stdOut, stdErr)
  
  ```javascript
  var clustalOmega = require('clustalo-wrapper');
  var inputFile = 'samples/example.fasta';
  var outputType = 'fasta';
  
  clustalOmega.alignSeqFile(inputFile, outputType, function(err,stdout,stdErr){
      if(err){
          console.log(stdErr);
      }else{
          console.log(stdout);
      }
  });
      
#### Align an unaligned input string of sequences of FASTA format
* .alignSeqString (input, outputFormat, callback)    
  callback passed (err, output)
  
  ```javascript
    var clustalOmega = require('clustalo-wrapper');
    var outputType = 'fasta';
    var input = '>test1\n' +
              'ACDEFGHIKLMNPQRSTVWY\n' +
              '>test2\n' +
              'XXXXACDEFGHIMNXXXPQR\n' +
              '>test3\n' +
              'ACDEFGHILMNXXXXXPQRS\n' +
              '>test4\n' +
              'XXXACDEFGHIKLMNPQRST';
    clustalOmega.alignSeqString(input,outputType,function(err,data){
        if(err){
            console.log(err);
        }else{
            console.log(data);
        }
    });
  

#### Align an unaligned seq file and an HMM
* .alignSeqWithHmm (inputFile, inputHmmFile, outputFormat, callback)    
  callback passed (err, output)

#### Align an unaligned seq file and a profile
* .alignSeqWithProfile (inputFile, inputProfile, outputFormat, callback)    
  callback passed (err, output)

#### Align two profiles
* .alignTwoProfiles (profile1, profile2, outputFormat, callback)    
  callback passed (err, output)

The output can be in any of the following formats (set 'outputFormat' to one of the following) 
   
      *  fasta
      *  clustal
      *  msf
      *  phylip
      *  selex
      *  stockholm
      *  vienna

#### You can specify a custom execution path where the clustal omega executable is placed

 
  ```javascript
  var clustalOmega = require('clustalo-wrapper');
  var customExecPath = 'Downloads/bin';
  var outputType = 'fasta';
  
  clustalOmega.setCustomLocation('../../Downloads');

