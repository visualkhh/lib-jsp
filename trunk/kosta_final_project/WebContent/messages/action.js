function load(){
	var tab1 = document.getElementById("tab1");
	var tab2 = document.getElementById("tab2");
	var tab3 = document.getElementById("tab3");
	
	tab1.style.display="block";
	tab2.style.display="none";
	tab3.style.display="none";
	
}

function addComment(){
	var target = document.getElementById("button-container");
	var newComment = document.createElement("div");
	var parent = target.parentNode;
	newComment.innerHTML = "<div id='comment'><p>adsfafsdfdsa</p></div>";
	parent.insertBefore(newComment, target);
}

function removeComment(){
	var comment = document.getElementById("comment");
	if(comment != null){
		var target = comment.parentNode;
		target.removeChild(comment);
	}
	
}

function clickshow(num){
	var target = document.getElementById("container-content"+num);
	if(target.style.display==""){
		target.style.display="none";
	}else{
		target.style.display="";
	}
				
}

function showtab(num){
	var tab1 = document.getElementById("tab1");
	var tab2 = document.getElementById("tab2");
	var tab3 = document.getElementById("tab3");
	
	if(num == "1"){
		tab1.style.display="block";
		tab2.style.display="none";
		tab3.style.display="none";
	}else if(num == "2"){
		tab1.style.display="none";
		tab2.style.display="block";
		tab3.style.display="none";
	}else{
		tab1.style.display="none";
		tab2.style.display="none";
		tab3.style.display="block";
	}
	
}