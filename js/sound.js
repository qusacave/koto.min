//------------------------------------------------------------------------------
//  音が鳴るように準備する
//------------------------------------------------------------------------------

//  音階を設定
var pitch = [
    440 * Math.pow( 1.06, 3 ),  //  ド
    440 * Math.pow( 1.06, 4 ),  //  ド#
    440 * Math.pow( 1.06, 5 ),  //  レ
    440 * Math.pow( 1.06, 6 ),  //  レ#
    440 * Math.pow( 1.06, 7 ),  //  ミ
    440 * Math.pow( 1.06, 8 ),  //  ファ
    440 * Math.pow( 1.06, 9 ),  //  ファ#
    440 * Math.pow( 1.06,10 ),  //  ソ
    440 * Math.pow( 1.06,11 ),  //  ソ#
    880,                        //  ラ
    880 * Math.pow( 1.06, 1 ),  //  ラ#
    880 * Math.pow( 1.06, 2 ),  //  シ
    880 * Math.pow( 1.06, 3 ), //  ド
    880 * Math.pow( 1.06, 4 ), //  ド#
    880 * Math.pow( 1.06, 5 ), //  レ
    880 * Math.pow( 1.06, 6 ), //  レ#
    880 * Math.pow( 1.06, 7 ), //  ミ
    880 * Math.pow( 1.06, 8 ), //  ファ
    880 * Math.pow( 1.06, 9 ), //  ファ#
    880 * Math.pow( 1.06,10 ), //  ソ
    880 * Math.pow( 1.06,11 ), //  ソ#
    1760,                        //  ラ
    1760 * Math.pow( 1.06, 1 ),  //  ラ#
    1760 * Math.pow( 1.06, 2 ),   //  シ
    1760 * Math.pow( 1.06, 3 ) 
];

//  ボタンに表示する文字を設定
var pString = [
    "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
    "C6", "C#5", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6",
    "C7"
];

var freq = pitch[0]; //起動時の周波数

//  OscはFltに接続している
//  FltはAmpに接続している
//  AmpはOutに接続している
//  ありきたりな減算シンセのフローだ
var gAudioContext = new AudioContext();
var gOscillatorNode = gAudioContext.createOscillator();
var gFilterNode = gAudioContext.createBiquadFilter();
var gGainNode = gAudioContext.createGain();
var gMasterGainNode = gAudioContext.createGain();

gOscillatorNode.connect( gFilterNode );
gFilterNode.connect( gGainNode);
gGainNode.connect( gMasterGainNode);
gMasterGainNode.connect( gAudioContext.destination );

gGainNode.gain.value = 0;
gMasterGainNode.gain.value = 0;

gFilterNode.type = 0;
gFilterNode.Q.value = 20;

gOscillatorNode.type = "triangle";
gOscillatorNode.frequency.value = freq;
gOscillatorNode.start(0);

//------------------------------------------------------------------------------
//  近接センサーの値が変わると呼ばれる関数
//  
//  
//------------------------------------------------------------------------------
changeSound = function( pr ) {
    var start = gAudioContext.currentTime;
    gGainNode.gain.setValueAtTime(0, start);
    gGainNode.gain.linearRampToValueAtTime(1, start + 0.05);//A
    gGainNode.gain.setTargetAtTime(0.1, start + 0.05, 0.1);//D1
    gGainNode.gain.setTargetAtTime(0, start + 0.2, 0.8);//D2
    gFilterNode.frequency.setValueAtTime(10000, start);
    gFilterNode.frequency.exponentialRampToValueAtTime(500, start + 0.05);
};

//------------------------------------------------------------------------------
//  画面がクリックされたら呼ばれる
//------------------------------------------------------------------------------
changePitch = function( key ){
    console.log(key);
    if(key<pitch.length){
        freq = pitch[ key ];
        gOscillatorNode.frequency.value = freq;
    }
};

resetPitch = function(){
    console.log("reset");
    gOscillatorNode.frequency.value = pitch[0];
}

//------------------------------------------------------------------------------
//  ミュートする
//
//  mute が true だったら音量を0にして false だったら音量を 1 にする
//------------------------------------------------------------------------------
setMute = function( mute ){
    if(mute == true) gMasterGainNode.gain.value = 0;
    else gMasterGainNode.gain.value = 0.5;
    //changeSound();
};
