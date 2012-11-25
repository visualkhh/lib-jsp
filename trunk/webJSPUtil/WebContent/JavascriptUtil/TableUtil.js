//jquery �ʿ��� include  

var tableutil_mousedown = false; //���콺�� ���� ����
var tableutil_x = 0;             //���콺 �巹���� ������ġ
var tableutil_Obj;             //obj

$(document).ready(function(e) {
    $("table[mode='table'] thead[resize='true']").mousemove(function(e) {
    	var eventObj = e.srcElement;
    	
        $("p#c").text("x:"+e.pageX+" y:"+e.pageY);
        $("p#offset").text(event.offsetX+"     "+cell_left(eventObj) +"  "+ cell_right(eventObj)+"  "+eventObj.width );
        if( cell_right(eventObj) ){
            eventObj.style.cursor = "col-resize";
	     }else{
	            eventObj.style.cursor = "";
	     }
        TCColResize(e);
    });
    
    $("table[mode='table'] thead[resize='true']").mousedown(function(e) {
    	var eventObj = e.srcElement;
    	if( cell_left(eventObj) || cell_right(eventObj) ){
    		tableutil_mousedown  = true;
    		tableutil_x =event.x; 
    		tableutil_Obj = eventObj;
    	}
    });
    $("table[mode='table'] thead[resize='true']").mouseup(function(e) {
    		tableutil_mousedown  = false;
    });
    
    $("table[mode='table'] td[mode='edit']").dblclick(function(e) {
    	$(this).html("<textarea style='width:100%; height:100%;'>"+$(this).text()+"</textarea>");
});
});


function TCColResize(e){
	var eventObj = tableutil_Obj;
       if (tableutil_mousedown){
              var distX = event.x-tableutil_x; //�̵��� ����
              $("p#down").text("distX:"+distX+  "   eventObj.width:"+eventObj.width+"   eventObject.clientX:"+eventObj.clientWidth+"     tableutil_x:"+tableutil_x+"     event.x:"+event.x);
              eventObj.width = parseInt(eventObj.clientWidth) + distX;
              tableutil_x =event.x; 
       }
}

function cell_left(obj){//���콺�� ���� �������� ����
    if(event.offsetX  < 5)
           return true;
    else
           return false;
}
function cell_right(obj){//���콺�� ���� ���������� ����
    if(event.offsetX > obj.clientWidth-10)
           return true;
    else
           return false;
}
