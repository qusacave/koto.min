
//  ミュートされていたら true
var nowMute = true;

//------------------------------------------------------------------------------
//  ミュートボタンが押された
//------------------------------------------------------------------------------
onMuteButton = function() {

    // 　ミュートしてなかったらミュートする
    if( nowMute ) {
        setMute( false );
	nowMute = false;
        document.getElementById("imgButton").src = "rsrc/unmute.png";
    }

    //  ミュート状態だったらミュートにする
    else {
	setMute( true );
	nowMute = true;
        document.getElementById("imgButton").src = "rsrc/mute.png";
    }
};


//------------------------------------------------------------------------------
//  キーを並べる
//------------------------------------------------------------------------------
var onclickPos = [0, 0];
var baseWidth;
updateWindow = function(){
    var wd = window.innerWidth;
    var ht = window.innerHeight - 80;
    (wd<ht) ? (baseWidth=wd) : (baseWidth=ht);
    //console.log(baseWidth);
    keys();
};

//  ボタンを4つずつ配置する
keys = function(){
    var nKeys = Math.ceil( pitch.length/4 );
    var keyWidth = baseWidth/4;

    var cnv = document.getElementById("keys");
    cnv.setAttribute( "width", baseWidth );
    cnv.setAttribute( "height", baseWidth*(nKeys/4) );
    var ctx = cnv.getContext("2d");
    ctx.textAlign = "center";

    paintKeys = function(){
        for(i=0; i<nKeys; i++){
            for(j=0; j<4; j++){
                ctx.beginPath();
                var x = keyWidth*0.5 + keyWidth*j;
                var y = keyWidth*0.5 + keyWidth*i;
                ctx.arc(x, y, keyWidth*0.45, 0, Math.PI*2, true);
                if(onclickPos[0]==i && onclickPos[1]==j){
                    grad = ctx.createRadialGradient(x, y, keyWidth*0.38, x, y, keyWidth*0.44);
                    grad.addColorStop(0, "#f7f7f7");
                    grad.addColorStop(0.5, "#e0e0e0");
                    grad.addColorStop(0.75, "#a0a0a0");
                    grad.addColorStop(1, "rgba(128, 128, 128, 0)");
                    ctx.fillStyle = grad;
                    ctx.fill();
                    ctx.fillStyle = "#c0c0c0";
                }
                else{
                    grad = ctx.createRadialGradient(x, y, keyWidth*0.38, x, y, keyWidth*0.44);
                    grad.addColorStop(0, "#c7c7c7");
                    grad.addColorStop(0.5, "#b0b0b0");
                    grad.addColorStop(0.75, "#707070");
                    grad.addColorStop(1, "rgba(128, 128, 128, 0)");
                    ctx.fillStyle = grad;
                    ctx.fill();
                    ctx.fillStyle = "#909090";
                }
                ctx.fillText(pString[4*i+j], x, y+3);
            }
        }
    };

//  ここからタッチしたときの処理
    ontouch = function(e){
        var mouseX = e.targetTouches[0].pageX - cnv.offsetLeft;
        var mouseY = e.targetTouches[0].pageY - cnv.offsetTop;
        //console.log(mouseX, mouseY);

        for(i=0; i<nKeys; i++){
            for(j=0; j<4; j++){
                if(j*keyWidth<=mouseX && mouseX<(j+1)*keyWidth){
                    if(i*keyWidth<=mouseY && mouseY<(i+1)*keyWidth){
                        changePitch( 4*i+j );
                        onclickPos = [i, j];
                        paintKeys();
                    }
                }
            }
        }
    } ;
    offtouch = function(e){
        resetPitch();
        onclickPos = [0, 0];
        paintKeys();
    };

    paintKeys();
    cnv.addEventListener('touchstart', ontouch);
    cnv.addEventListener('touchend', offtouch);
};

//  起動時と画面幅が変わったら再描画する
window.onload = updateWindow;
window.onresize = updateWindow;
