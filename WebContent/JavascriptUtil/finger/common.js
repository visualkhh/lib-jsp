/* flashWrite(ϰ, , [, ][,][,]) transparent / window / opaque ****************************/
function flashWrite(url,w,h,vars,bg,win){

	var id=url.split("/")[url.split("/").length-1].split(".")[0]; //id ϸ 
	if(vars==null) vars='';
	if(bg==null) bg='#FFFFFF';
	if(win==null) win='transparent';


	// ÷ ڵ 
	var flashStr= "	<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'";
		flashStr+="			codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,124,0'";
		flashStr+="			width='"+w+"'";
		flashStr+="			height='"+h+"'";
		flashStr+="			id='"+id+"'";
		flashStr+="			align='middle'>";

		flashStr+="		<param name='allowScriptAccess' value='always' />";
		flashStr+="		<param name='movie' value='"+url+"' />";
		flashStr+="		<param name='FlashVars' value='"+vars+"' />";
		flashStr+="		<param name='wmode' value='"+win+"' />";
		flashStr+="		<param name='menu' value='false' />";
		flashStr+="		<param name='quality' value='high' />";
		flashStr+="		<param name='bgcolor' value='"+bg+"' />";


		flashStr+="		<embed src='"+url+"'";
		flashStr+="		       flashVars='"+vars+"'";
		flashStr+="		       wmode='"+win+"'";
		flashStr+="		       menu='false'";
		flashStr+="		       quality='high'";
		flashStr+="		       bgcolor='"+bg+"'";
		flashStr+="		       width='"+w+"'";
		flashStr+="		       height='"+h+"'";
		flashStr+="		       name='"+id+"'";
		flashStr+="		       align='middle'";
		flashStr+="		       allowScriptAccess='always'";
		flashStr+="		       type='application/x-shockwave-flash'";
		flashStr+="		       pluginspage='http://www.macromedia.com/go/getflashplayer' />";
		flashStr+=" </object>";

	// ÷ ڵ 
	document.write(flashStr);
}

/* flashWrite(ϰ, , [, ][,][,]) transparent / window / opaque ****************************/
function flashWrite02(url,w,h,vars,bg,win){

	var id=url.split("/")[url.split("/").length-1].split(".")[0]; //id ϸ 
	if(vars==null) vars='';
	if(bg==null) bg='#FFFFFF';
	if(win==null) win='transparent';


	// ÷ ڵ 
	var flashStr= "	<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000'";
		flashStr+="			codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,124,0'";
		flashStr+="			width='"+w+"'";
		flashStr+="			height='"+h+"'";
		flashStr+="			id='"+id+"'";
		flashStr+="			align='middle'>";

		flashStr+="		<param name='allowScriptAccess' value='always' />";
		flashStr+="		<param name='movie' value='"+url+"' />";
		flashStr+="		<param name='FlashVars' value='"+vars+"' />";
		flashStr+="		<param name='wmode' value='window' />";
		flashStr+="		<param name='menu' value='false' />";
		flashStr+="		<param name='quality' value='high' />";
		flashStr+="		<param name='bgcolor' value='"+bg+"' />";


		flashStr+="		<embed src='"+url+"'";
		flashStr+="		       flashVars='"+vars+"'";
		flashStr+="		       wmode='"+win+"'";
		flashStr+="		       menu='false'";
		flashStr+="		       quality='high'";
		flashStr+="		       bgcolor='"+bg+"'";
		flashStr+="		       width='"+w+"'";
		flashStr+="		       height='"+h+"'";
		flashStr+="		       name='"+id+"'";
		flashStr+="		       align='middle'";
		flashStr+="		       allowScriptAccess='always'";
		flashStr+="		       type='application/x-shockwave-flash'";
		flashStr+="		       pluginspage='http://www.macromedia.com/go/getflashplayer' />";
		flashStr+=" </object>";

	// ÷ ڵ 
	document.write(flashStr);
}

/**
 * PDF ΰ ˾
 */
function popupPDF(surl) {
    var iWidth  = 800;
    var iHeight = 700;
    var iLeft   = (screen.availWidth - iWidth) / 2;
    var iTop    = (screen.availHeight - iHeight) / 2;
    var sFullUrl = INS_URL + "ins/common/popup_index.jsp";
    var xmlDoc = getDocument("ainfo");

    if(iWidth > screen.width) iWidth = screen.width;
    if(iHeight > screen.height) iHeight = screen.height;

    setString(xmlDoc, "link_url" , surl);

    showWindow(INS_URL + "ins/common/popup_index.jsp", xmlDoc, "width="+iWidth+",height="+iHeight+",top="+iTop+",left="+iLeft+" ,scrollbars=auto,resizable=yes");
}

/**
 * ˾ 
 */
function newWindow(mypage,myname,w,h,scroll,resize) {
    var win = null;
    if(resize=="" || resize==null || resize=="undefined") {
        resize = "no";
    }
    if(w > screen.width) w = screen.width;
    if(h > screen.height) h = screen.height;
    LeftPosition = (screen.width) ? (screen.width-w)/2 : 0;
    TopPosition = (screen.height) ? (screen.height-h)/2 : 0;
    settings ='height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable='+resize;
    win = window.open(mypage,myname,settings);
}

/**
 * ie7 Ʈ Ȱȭ   function  ȣϿ 
 */
function printContent(strDivName, strHTML)
{
    document.getElementById(strDivName).innerHTML = strHTML ;
}

/**
 * ŰԷ½  ǥ(000,000,000,000..)
 */
function num_comma(displayName) { 
    if(displayName =="" || displayName == null) {
        return 0;    
    }
    var e = document.all[displayName];
    var num = e.value;
        if (e.value.length >= 4) {
            re = /^$|,/g; 
            num = num.replace(re, ""); 
            fl="" 
        if(isNaN(num)) { alert("ڴ   ϴ.");return 0} 
        if(num==0) return num 
        if(num<0){ 
            num=num*(-1) 
            fl="-" 
        }
        else{ 
            num=num*1 //ó Է° 0 Ҷ ̰ Ѵ. 
        } 
            num = new String(num) 
            temp="" 
            co=3 
            num_len=num.length 
    while (num_len>0){ 
        num_len=num_len-co 
        if(num_len<0){co=num_len+co;num_len=0} 
        temp=","+num.substr(num_len,co)+temp 
        } 
        e.value =  fl+temp.substr(1);
    }
} 

/**
 * ŰԷ½  ǥ(000,000,000,000..)
 */
function numchk_comma(num) { 
    var num = num;
    if(num < 1) {
        return num;    
    }
        if (num.length >= 4) {
            re = /^$|,/g; 
            num = num.replace(re, ""); 
            fl="" 
        if(num==0) return num 
        if(num<0){ 
            num=num*(-1) 
            fl="-" 
        }
        else{ 
            num=num*1 //ó Է° 0 Ҷ ̰ Ѵ. 
        } 
            num = new String(num) 
            temp="" 
            co=3 
            num_len=num.length 
    while (num_len>0){ 
        num_len=num_len-co 
        if(num_len<0){co=num_len+co;num_len=0} 
        temp=","+num.substr(num_len,co)+temp 
        } 
        return fl+temp.substr(1);
    }
} 