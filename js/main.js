//------------------------------------------------------------------------------
//  近接センサーの値が変わると呼ばれる関数
//
//  MEMO: e.value の中に現在の明るさが入っている
//------------------------------------------------------------------------------
onChangeProximity = function( e ) {
    //changeScreen( e.value );  //  画面を変化させる処理を呼ぶ
    if(e.near)changeSound( e.value );   //  音を変化させる処理を呼ぶ
    //console.log(e.near);
};

//  イベントハンドラを設定
window.addEventListener( 'userproximity', onChangeProximity );
