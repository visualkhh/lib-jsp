/*
**    ������Ʈ��: �˵��� (�˸� + wysiwyg ������)
**
**    ȭ�ϸ�: alditor.js
**    �ۼ���: Alex Suk Hyun Park a.k.a Alik (http://www.alik.info/ | alikong@gmail.com)
**    �ۼ���: 2006-08-19
**    ���� ������: 2006-11-06
**
**
**    ���̼��� ����:
**    -------------------------------------------------------------------------
**    �ҽ� ���� �� ���� �Ұ�
**    ȭ���� ���� ��ũ (���� ����) �Ұ�
**    �������� �뵵�� ��밡���ϸ� ����� ���� ����õ� �ۼ��ڿ��� ���� ���.
**    �ҽ� ����, ������Ʈ �� ��� �߰����� ��� http://www.alik.info ���� Ȯ�� ���.
**    ���ǻ��� �� �������� ���� http://www.alik.info �� ���� ���
**    �ҽ��� ������ ��ư �����ܵ� ��� �̹����� ���۱��� �̹��� �����ڿ��� ����.
**
**    
**    ��� ����:
**    -------------------------------------------------------------------------
**    HTML ���ο� �ִ� Textarea �� ������(WYSIWYG) �����ͷ� ��ȯ��.
**    �� �������� �ټ��� Textarea �� ������(Textarea �±��� �Ӽ��� editable=0 �߰��� ��ȯ���� ����) 
**    �Ǵ� ��ü ��ȯ(�⺻ ����) ������.
**    
**    
**    ����:
**    -------------------------------------------------------------------------
**    �ڼ��� ����, ������� �� ������ http://www.alik.info/ �湮 ���.
*/


/////////// ����� ���� ���� ////////////
	function alditorConfig () {

		/* 
			this.alditorPath = �˵��Ͱ� ���Ե� ���������� ���������� �˵��� ���� ��� (���� / �ʼ�)
				��Ʈ�� ���� �����θ� ��õ~ ( ./ �� �ƴ� / �� ��Ʈ�� �������� ��, �Ʒ� ������ ���� ��Ʈ�� alditor �� ���ε�� ��Ȳ���� ����)
			
			this.buttonSet = ����� ��ư��Ʈ�� �̸� (buttons ���� �ȿ� ��ư�̹������� �ִ� ������ �̸�)
		*/
		this.alditorPath = "/final_project/openpages/alditor/";
		this.buttonSet = "alik_nontoxic";

		/* 
			this.uploadLink = ȭ���� ���ε� �Ҽ� �ִ� �������� �������� �ּ�
				http://www.imageshack.us/ (�ܱ������� ��¦ ����.)
				http://img.npiza.com/
				http://image.widesoccer.com/index.html (��Ȱ��)

				��� ������ �˻��Ͻñ�... (Ȥ�� ������ ����Ʈ�� ȸ���� �Ǵ� ���� ���ε� �������� ���� �����Ҽ� ���� ^^ .... ���Ŀ� �����սô�!)
		*/
		this.uploadLink = 'http://image.widesoccer.com/index.html';


		/* 
			this.spellcheckLink = ����� �˻� �������� �������� �ּ� (���� ����..��.��, ����� http://urimal.cs.pusan.ac.kr/ ���� '�ѱ��� �����/�����˻��' �ּҸ� ã�� �ٶ�)

			this.spellcheckAction = ����� �˻縦 ���� �� ���۽ÿ� ���� action �ּ� (���� �̸����� ���� �������ּ� �� �ٲ� ���ɼ��� ����)
		*/
		this.spellcheckLink = 'http://164.125.36.47/urimal-spellcheck.html';
		this.spellcheckAction = 'http://164.125.36.47/WebSpell_ISAPI.dll?Check';


		/* 
			this.runOnLoad = ������ �ε�� �����ͷ� �����ұ��?
				true : false; 

				����: false�� �����Ұ�� ������ Ȱ��ȭ ��ư�� �Ʒ� ������ ����
				����: <a href="javascript:void(0);" onclick="alditorAll();">������ ON</a> 

			this.setFocus = ������ �ε�� ��Ŀ���� �����ͷ� �̵���ų���? (�����Ͱ� ���������� �Ѱ� �̻��� ��Ȳ���� true ��� ù��° �����ͷ� ��Ŀ���� �̵���.)
				true : false;

			this.useSafeFocus = �� �������� setFocus �� true �� ������, �� ������ true �� �Ѵٸ� �����Ͱ� ȭ���� �ϴ�(�ڸ�Ʈ �Է��� ���)�� �ִ°��� ��Ŀ���� ���� �������μ� �������� ��ũ���� �����Ѵ�.
				true : false; 
		*/
		this.runOnLoad = true; 
		this.setFocus = false; //////////// ������
		this.useSafeFocus = true;


		/*
			this.allowStretch =  �����Ϳ����� ���뿡 �°� �þ�� �ұ��? (��ũ�ѹٰ� �Ȼ���´ٴ°��� ^^) �巹�׳� �̰ų� ���߿� �ϳ��� ���� ������...
				true : false
		*/
		this.allowStretch = true;

	   
		/*
			this.movableToolbar =  ���ٸ� �巹���ؼ� ��/�� ��ġ�� �����Ҽ� �ְ� �ұ��?
				true : false
		*/
		this.movableToolbar = false; ////////////// ������


		/*
			this.allowDrag = �������� �巹�� ��뿩��
				true : false

			this.dragMode = �������� �巹�� ��������
				1 = ���θ� �þ�� ���, 2 = ���θ� �þ�� ���, 3 = ���� ���� ���� �������

			this.minWidth , this.minHeight = �������� ������ �ּ� ���̿� ���� ���� (���� = �ȼ�)
		 */
		this.allowDrag = false; /////////////////// ������
		this.dragMode = 2;
		this.minWidth = 200;
		this.minHeight = 40;


		/*
			this.useEnterBR = ���� �Է½� �ڵ����� ����Ʈ+���� (<BR />) �������� ��ȯ���ٱ��? (���ܹٲ��� �ٹٲ����� �ٲ��ִ� ���)
				true : false

			this.useAutoP = ���� ������ useEnterBR �� true ��� ���� �ι� �Է½� �ڵ����� ���뿣�� �ѹ��Է����� ��ȯ���ٱ��? (�ѹ��� �ٹٲ� �ι��� ���ܹٲ�)
				true : false
		 */
		this.useEnterBR = true;
		this.useAutoP = true;


		/*
			this.showPath = ������ �ϴ��� �±׼��ñ�� ��뿩��
				true : false

			this.showPathSafeMode = showPath�� true �϶� �ʹ� �������� �ִٸ� showPathSafeMode �� true�� �����ϸ� �ӵ��� ���� �����Ѵ� 
			(�±׸���� ������ �����Է½ÿ��� ����Ű�Է½ð� Ŭ���÷� �����ǰ� �����, true ����!)
				true : false
		 */
		this.showPath = true;
		this.showPathSafeMode = true;


		/*
			this.useExtraHTML = ������ ������ �پ��� div ���ڸ����� ���ɴϴ�.
				true : false
			
			this.useExtraHTMLwidth = ���� ��õ� div ���ڸ����� ���α��� (���� = �ȼ�)
				alditor.css ���� .extraDiv ��width �� �����ϰ� �����������
		 */
		this.useExtraHTML = true;
		this.useExtraHTMLwidth = 120;


		/*
			this.useExpansion = ���ٿ� �������� ��ư���� �ִ°�� ��ư���� Ȯ���ϴ� �������� ����ұ��?
				true : false
			this.minimumRow = Ȯ���ϴ� ������ ����ϽŴٸ� �⺻���� ������ �����ٱ��?
				true : false
		 */
		this.useExpansion = true;
		this.minimumRow = 1;


		/*
			this.noSelect = �۲ð� ����ũ�� ������ select �� �ƴ� ���̾�� ǥ���ұ��?
				true : false
			this.freeFontSize = ����ũ�� ������ select �� �ƴ� ���̾�� ǥ���Ҷ� �⺻���(ǥ��,��������,8,10,12,14,18,24,36pt �� �ɼ��� ��������) �� �����? �ƴ� ���ϴµ��� (���� �����ĸ� ���氡��, �����ڰ� ���ϴ� ������ �߰� ����) �ٲٴ� ������� �ұ��?
				true : false
		 */
		this.noSelect = true;
		this.freeFontSize = false;


		/*
			this.targetBlank = �����;ȿ� ���Ե� ��� ��ũ���� Ÿ���� ��â���� �����ұ��?
				true : false
		 */
		this.targetBlank = true;


		/*
			this.imgKeepAddress = IE �� �̹��� ���Խ� ����ΰ� �ڵ����� �����η� �ٲ�°� �������? (���� ���۽� ��ȯ��)
				true : false
		 */
		this.imgKeepAddress = false;


		/*
			this.useCopy = �� ���� ������ ���뺹�� ����� ��뿩��
				true : false

			this.useContentCheck = �� ������ ���� üũ ����� ��뿩��
				true : false

			this.minimumContent = �� üũ ����� ���� ���ڼ� (���� �̻� ��� ����� �Ǵ�... �� ���)
				1���� ~ ���Ѵ� (����)

			this.saveRemoteIMG = ������ ���Ե� �̹������� �ܺ�(�ٸ�����)�� ��ġ�� �̹������� ������ ������ �����ұ��?
				true : false
		 */
		this.useCopy = true;
		this.useContentCheck = false;
		this.minimumContent = 10;
		this.saveRemoteIMG = false;


		/*
			this.killError = ������ �������� ���� ����� ���� �����޼��� ����� �������? (����õ - ��� ������ �ʳ���...��.��)
				true : false
		*/
		this.killError = false;


		/*
			this.noOnsubmit = �����۽ÿ� ����Ǵ� onsubmit �׸��� �ǵ帮�� �������? true �� ������ ���뺹�縦 ����� ������ɵ��� �۵����� �ʰ� �ٷ� ���۵�.(������ ���ø��, Ư�� form �ȿ��� ����ϴ� textarea �� �ƴҰ�� true ��!)
				true : false
		*/
		this.noOnsubmit = false;


		/*
			���ٿ� ���� ����� ���λ����� �⺻�� ���� (���� = �ȼ�) [firefox ���� ���� �ȼ��� �ƴ� ������ 5 ���� ��ĭ�� �ϳ��� ����]
		*/
		this.defaultSpaceWidth = 10;


		/* 
			���� ��ư �׸�
				1. �����ϴ� ������� �����Ϳ� ǥ�õ�.
				2. ��ư������ ������ ������ this.toolbarItems.push("space"); �� �߰������μ� ��������
					2-1. space �� ������� ������ ������ defaultSpaceWidth ������ ������� �̿�Ǹ�, 
					2-2. ���麰 ����� �����ϰ� ������ space_40 ó�� _ �� �Բ� �����ָ� �ش� ������ ���̸� �����Ҽ� ���� (���� = �ȼ�)
				3. ���ο� ��ư���� ��� this.toolbarItems.push("row"); �� �� ���̿� �־��ָ� ������.
				4. �ʿ���� ��ư�� //this.toolbarItems.push("underline"); ó�� //�� �̿��Ͽ� �ּ�ó�� ����.
				5. �����׸���� �ͼ������� �ٶ�� ������ ���� ���ٷ� �����Ǿ�����. (���ٷ� �ֿ�~ ǥ���ϱ� ����)
		*/
		this.toolbarItems = new Array();

		this.toolbarItems.push("htmlsource"); //�ҽ�â�� ������â�� ��ȯ ��ư

				this.toolbarItems.push("space"); //�⺻ ����

		this.toolbarItems.push("fontname"); // �۲� ����
		this.toolbarItems.push("fontsize"); // ����ũ�� ����

			this.toolbarItems.push("space"); //�⺻ ����

		this.toolbarItems.push("bold"); // ����
		this.toolbarItems.push("underline"); // ����
		this.toolbarItems.push("italic"); // ����̱�
		this.toolbarItems.push("strike"); // ��Ҽ�

			this.toolbarItems.push("space"); //�⺻ ����

		this.toolbarItems.push("color"); // ���� ����
		this.toolbarItems.push("bgcolor"); // ���� ����
		this.toolbarItems.push("hilite"); // ���� (��������� �����۾�)

			this.toolbarItems.push("space"); //�⺻ ����

		this.toolbarItems.push("link"); // ��ũ����
		this.toolbarItems.push("image"); // �̹��� ����
		this.toolbarItems.push("emoticon"); // �̸�Ƽ�� ����
		this.toolbarItems.push("specialchars"); // Ư������ ����

			this.toolbarItems.push("space"); //�⺻ ����

				//this.toolbarItems.push("row"); // ���ο� ��ư��


		this.toolbarItems.push("unlink"); // ��ũ���
		this.toolbarItems.push("nohilite"); // ���� ��� �� ���� ����ȿ�� ����


		this.toolbarItems.push("sup"); // ��÷��
		this.toolbarItems.push("sub"); // �Ʒ�÷��

		//this.toolbarItems.push("space_33"); //���� ������ 33 ����


		this.toolbarItems.push("orderedlist"); // ��ȣ�ű�
		this.toolbarItems.push("unorderedlist"); // ���ű�
		this.toolbarItems.push("indent"); // �鿩����
		this.toolbarItems.push("outdent"); // �鿩���� ���
		this.toolbarItems.push("left"); // ���ʸ���
		this.toolbarItems.push("center"); // �������
		this.toolbarItems.push("right"); // �����ʸ���

			this.toolbarItems.push("space"); //�⺻ ����

		this.toolbarItems.push("abs"); // position:absolute
		this.toolbarItems.push("hr"); // �� ����
		this.toolbarItems.push("simpleDiv"); // ���ùڽ�
		this.toolbarItems.push("table"); // ���̺����
		this.toolbarItems.push("showhide"); // ���̱�/���߱�

		this.toolbarItems.push("spellcheck"); // ������˻�
		this.toolbarItems.push("preview"); // �̸�����

		// ��ư ��


		/* 
			������ ������ ��Ʈ���� �޴��� �ɼ����� �� ��Ʈ��� 
			���� = this.fontOptions.push("execcommand �� ����Ǵ� ��Ȯ�� ��Ʈ�̸�", "����ڿ��� �������� �� - �������� ����");
		*/
		this.fontOptions = new Array();

		if (this.noSelect) // �۲ü����� ���̾�� ������� ���� �׸�
		{
			this.fontOptions.push("����", "����");
			this.fontOptions.push("����", "����");
			this.fontOptions.push("����", "����");
			this.fontOptions.push("�ü�", "�ü�");
			this.fontOptions.push("tahoma", "tahoma");
			this.fontOptions.push("verdana", "verdana");
			this.fontOptions.push("Courier", "Courier");
		} 
		else // �۲ü����� select �� ������� ���� �׸�		
		{
			this.fontOptions.push("", "�۲�"); //ù�� ���� ����!
			this.fontOptions.push("����", "����");
			this.fontOptions.push("����", "����");
			this.fontOptions.push("����", "����");
			this.fontOptions.push("�ü�", "�ü�");
		}

		/* 
			������ ������ ����ũ�� �޴��� �ɼ����� �� �������� 
			���� = this.fontOptions.push("������ ����Ǵ� �����", "����ڿ��� �������� �� - �������� ����");
		*/
		this.fontSizeOptions = new Array();

		if (this.noSelect && this.freeFontSize) // ����ũ�⼱���� ���̾�� �ϸ鼭 ũ�������Է½ÿ� ���� �׸� (pt �� �ǰ� px �� ��)
		{
			this.fontSizeOptions.push("7pt", "7pt");
			this.fontSizeOptions.push("8pt", "8pt");
			this.fontSizeOptions.push("9pt", "9pt");
			this.fontSizeOptions.push("10pt", "10pt");
			this.fontSizeOptions.push("11pt", "11pt");
			this.fontSizeOptions.push("12pt", "12pt");
			this.fontSizeOptions.push("14pt", "14pt");
			this.fontSizeOptions.push("18pt", "18pt");
			this.fontSizeOptions.push("24pt", "24pt");
			this.fontSizeOptions.push("36pt", "36pt");
			this.fontSizeOptions.push("40pt", "40pt");
		} 
		else // ����ũ�⼱���� select �� ������� ���� �׸�		
		{
			this.fontSizeOptions.push("", "ũ��"); //ù�� ���� ����!
			this.fontSizeOptions.push("1", "1");
			this.fontSizeOptions.push("2", "2");
			this.fontSizeOptions.push("3", "3");
			this.fontSizeOptions.push("4", "4");
			this.fontSizeOptions.push("5", "5");
			this.fontSizeOptions.push("6", "6");
			this.fontSizeOptions.push("7", "7");
		}

		if (this.useExtraHTML)
		{
			this.toolbarItems.push("extraHTML"); // �߰� �׸� HTML - �Ʒ� �±׳��븸 �����Ͻñ�. ��뿩�δ� ���� ��������...

			this.extraHTML = new Array();

			this.extraHTML.push("<div class='extraDiv1'><pre>", "</pre></div>");
			this.extraHTML.push("<div class='extraDiv2'><pre>", "</pre></div>");
			this.extraHTML.push("<div class='extraDiv3'><pre>", "</pre></div>");
			this.extraHTML.push("<div class='extraDiv4'><pre>", "</pre></div>");	
			this.extraHTML.push("<div class='extraDiv5'><pre>", "</pre></div>");
			this.extraHTML.push("<div class='extraDiv6'><pre>", "</pre></div>");
			this.extraHTML.push("<div class='extraDiv7'><pre>", "</pre></div>");
			this.extraHTML.push("<div class='extraDiv8'><pre>", "</pre></div>");
			this.extraHTML.push("<div class='extraDiv9'><pre>", "</pre></div>");
			this.extraHTML.push("<div class='extraDiv10'><pre>", "</pre></div>");
			this.extraHTML.push("<div class='extraDiv11'><pre>", "</pre></div>");
			this.extraHTML.push("<div class='extraDiv12'><pre>", "</pre></div>");
			this.extraHTML.push("<div class='extraDiv13'><pre>", "</pre></div>");
			this.extraHTML.push("<div class='extraDiv14'><pre>", "</pre></div>");
			this.extraHTML.push("<div class='extraDiv15'><pre>", "</pre></div>");	
			this.extraHTML.push("<div class='extraDiv16'><pre>", "</pre></div>");
		}
		return true;
	}
	
/////////// ���� �� //////////// ���� �յ� �ʿ� ���� ///////


	//// �ʼ� ������
	var is_IE = (window.showModelessDialog) ? true : false;
	var config = new alditorConfig();
	var editorHeight = new Array();
	var _1stRun = false;
	////

	var styleCss=document.createElement('LINK');
	styleCss.rel = 'stylesheet';
	styleCss.href = config.alditorPath+'buttons/'+config.buttonSet+'/alditor.css';

	var styleCssContent=document.createElement('LINK');
	styleCssContent.rel = 'stylesheet';
	styleCssContent.href = config.alditorPath+'alditorContent.css';

	var jsContent=document.createElement('script');
	jsContent.type = 'text/javascript';
	jsContent.language = 'javascript';
	jsContent.src = config.alditorPath+'alditorContent.js';

	document.getElementsByTagName('HEAD')[0].appendChild(styleCss);
	document.getElementsByTagName('HEAD')[0].appendChild(styleCssContent);
	document.getElementsByTagName('HEAD')[0].appendChild(jsContent);

	if (config.runOnLoad)
	{
		addEvent(window,"load", alditorAll);
	}


	function alditorAll() {
		var txtareas = document.getElementsByTagName("TEXTAREA");
		for ( i=0 ; i < txtareas.length ; i++ )
		{
	//		if (txtareas[i].offsetHeight > 0 && txtareas[i].style.display.toLowerCase() != 'none' && txtareas[i].style.visibility.toLowerCase() != 'hidden' && !txtareas[i].readOnly && !txtareas[i].disabled) 
			{
				var textarea = txtareas[i];

				if (!textarea.id) {
					if (document.getElementById(textarea.name) && document.getElementById(textarea.name).nodeName != 'TEXTAREA') { 
						textarea.id = 'text_' + textarea.name ;
					} else {
						textarea.id = textarea.name ;		
					}
				}
				if ( txtareas.length == 1)
				{
					new alditor(textarea.id);
				} else {
					setTimeout("new alditor('" + textarea.id + "')", 10 * (i));
				}
			}
		}
	}


	function killalditorAll() {
		var txtareas = document.getElementsByTagName("TEXTAREA");
		for ( i=0 ; i < txtareas.length ; i++ )
		{
			var txtarea = txtareas[i];
			if (txtarea.previousSibling && txtarea.previousSibling.id == txtarea.id + '_alditor') 
			{
				var _table = document.getElementById(txtarea.id + '_table');
				txtarea.style.display = 'block';
				txtarea.className = txtarea.rel;
				txtarea.style.cssText = txtarea.oldstyle;
				_table.parentNode.replaceChild(txtarea,_table);
				var extradiv = document.getElementById(txtarea.id + "_alditorextraDiv");
				extradiv.parentNode.removeChild(extradiv);
			}
		}
	}


	function alditorById(textareaID) {
		_1stRun = false;
		var txtarea = document.getElementById(textareaID);
		if (!txtarea || txtarea.nodeName != 'TEXTAREA')
		{
			txtarea = document.getElementsByTagName('TEXTAREA')[textareaID];
			if (document.getElementById(txtarea.name) && document.getElementById(txtarea.name).nodeName != 'TEXTAREA') { 
				txtarea.id = 'text_' + txtarea.name ;
			} else {
				txtarea.id = txtarea.name ;		
			}
		} else {
			if (!txtarea.id)
			{
				if (document.getElementById(txtarea.name) && document.getElementById(txtarea.name).nodeName != 'TEXTAREA') { 
					txtarea.id = 'text_' + txtarea.name ;
				} else {
					txtarea.id = txtarea.name ;		
				}
			}
		}
		if (!txtarea.previousSibling || (txtarea.previousSibling && txtarea.previousSibling.className !='alditorIframe'))
		{
			new alditor(txtarea);
		}
		return true;
	}


	function killalditor(txtID) {
		var txtarea = document.getElementById(txtID);
		if (!txtarea || txtarea.nodeName != "TEXTAREA")
		{
			txtarea = document.getElementsByTagName('TEXTAREA')[txtID];
		}
		txtID = txtarea.id;
		if (txtarea.previousSibling && txtarea.previousSibling.id == txtarea.id + '_alditor')
		{
			txtarea.style.display = 'block';
			txtarea.className = txtarea.rel;
			txtarea.style.cssText = txtarea.oldstyle;
			var _table = document.getElementById(txtID + "_table");
			_table.parentNode.replaceChild(txtarea,_table);
			var extradiv = document.getElementById(txtarea.id + "_alditorextraDiv");
			extradiv.parentNode.removeChild(extradiv);
		}
	}

	
	function getAlditor(textareaID) {
		var alditorObj = document.getElementById(textareaID + '_alditor');
		if (!alditorObj)
		{
			alditorObj = document.getElementById('text_' + textareaID + '_alditor');
		}
		if (alditorObj)
		{
			return alditorObj;
		} else {
			return false;
		}
	}


	// �˵��� ����
	function alditor(textareaObj) {
		if (typeof textareaObj == 'string')
		{
			textareaObj = document.getElementById(textareaObj);
		}
		if (textareaObj.nodeName != "TEXTAREA" || navigator.userAgent.indexOf('Mac') != -1 || textareaObj.getAttribute("editable") == 0)
		{
			return true;
		}
		if ((textareaObj.offsetHeight > 0) && (!textareaObj.previousSibling || textareaObj.previousSibling.id != textareaObj.id + "_alditor"))
		{
			var self = this;
			var tempWidth = textareaObj.offsetWidth;
			var tempHeight = textareaObj.offsetHeight;
			this._initHeight = tempHeight;

			this._textarea = textareaObj;
			this._iframe = document.createElement("IFRAME");

			this._textarea.rel = this._textarea.className;
			this._textarea.oldstyle = this._textarea.style.cssText;
			this._textarea.className = "alditorTextarea";
			this._textarea.style.display = "none";

			this._iframe.id = this._textarea.id + "_alditor";
			this._iframe.frameBorder = 0;
			this._iframe.marginWidth = 0;
			this._iframe.marginHeight = 0;
			this._iframe.className = "alditorIframe";

			editorHeight[ this._iframe.id ] = tempHeight;

			this._table = document.createElement("table");
			this._table.setAttribute("border", "0");
			this._table.setAttribute("cellPadding", "0");
			this._table.setAttribute("cellSpacing", "0");
			this._table.style.width = '100%';
			this._table.style.height='100%'
			this._table.className = "topTable";
			this._table.id = this._textarea.id + "_table";

				var topTablebody = document.createElement("tbody");

					var current_row1 = document.createElement("tr");    
					current_row1.setAttribute("valign", "middle");        
					current_row1.setAttribute("align", "left");
						this._toolbarTd = document.createElement("td");
						this._toolbarTd.id = this._iframe.id + "toolbarTd";
						this._toolbarTd.className = "toolbarTd";
						this._toolbarTd.unselectable = 'on';
						
					current_row1.appendChild(this._toolbarTd);

						this._toolbarDiv = document.createElement("div");
						this._toolbarDiv.id = this._iframe.id + "_toolbarDiv";
						this._toolbarDiv.className = "toolbarDiv";
						this._toolbarDiv.style.backgroundImage = "url('"+config.alditorPath+"buttons/" + config.buttonSet + "/toolbar_bg.gif')";
						if (config.movableToolbar)
						{
							this._toolbarDiv.onmousedown = function (event) {tb_moveStart(event, self._toolbarDiv, self._iframe);};
							this._toolbarDiv.className = "toolbarDiv updown";
						}
						//���� ����//
						var editor=document.getElementById("openpage_editor");
						editor.appendChild(this._toolbarDiv);

					var current_row2 = document.createElement("tr");    
					current_row2.setAttribute("valign", "top");        
					current_row2.setAttribute("align", "left");
						this._alditorTd = document.createElement("td");
						this._alditorTd.id = this._iframe.id + "alditorTd";
						this._alditorTd.className = "alditorTd";
						this._alditorTd.width = tempWidth;
						this._alditorTd.height = tempHeight;
						this._alditorTd.unselectable = 'on';
					current_row2.appendChild(this._alditorTd);

					var current_row3 = document.createElement("tr");    
					current_row3.setAttribute("valign", "bottom");        
					current_row3.setAttribute("align", "left");
						var bottomTd = document.createElement("td");
						bottomTd.id = this._iframe.id + "bottomTd";
						bottomTd.className = "bottomTd";
						bottomTd.unselectable = 'on';

							var bottomTable = document.createElement("table");
							bottomTable.setAttribute("border", "0");
							bottomTable.setAttribute("width", "100%");
							bottomTable.setAttribute("cellPadding", "0");
							bottomTable.setAttribute("cellSpacing", "2");
							bottomTable.style.tableLayout = "fixed";
								var bottomTablebody = document.createElement("tbody");
									var current_row = document.createElement("tr");    
									current_row.setAttribute("align", "left");
									current_row.setAttribute("valign", "bottom");        
										this._pathTd = document.createElement("td");
										this._pathTd.id = this._iframe.id + "pathTd";
										this._pathTd.className = "pathTd";
										this._pathTd.innerHTML = (config.showPath)? "Tags:" : "&nbsp;";
										this._pathTd.unselectable = 'on';
										var current_cell2 = document.createElement("td");
										if (config.allowDrag)
										{
											current_cell2.onmousedown = function (event) {resizeStart(event, self._table, self._iframe); return true;};
											current_cell2.className = "resizeHandle";
										}
										current_cell2.unselectable = "on";
									current_row.appendChild(this._pathTd);
									current_row.appendChild(current_cell2);
								bottomTablebody.appendChild(current_row);
							bottomTable.appendChild(bottomTablebody);

					current_row3.appendChild(bottomTd);

				topTablebody.appendChild(current_row1);
				topTablebody.appendChild(current_row2);
				topTablebody.appendChild(current_row3);

			this._table.appendChild(topTablebody);

			this.alditorToolbar();

			this._textarea.parentNode.insertBefore(this._table, this._textarea);
			this._alditorTd.appendChild(this._iframe);
			this._alditorTd.appendChild(this._textarea);

			if (config.allowDrag || config.showPath)
			{
				bottomTd.appendChild(bottomTable);
			}

			var tools = this._toolbarTd.getElementsByTagName('*');
			for (ti=0;ti< tools.length; ti++)
			{
				tools[ti].unselectable = 'on';
			}
			
			this._textarea.style.width = this._alditorTd.clientWidth + 'px';
			this._textarea.style.height = this._alditorTd.clientHeight - 2 + 'px';

			this.fillContents(this._textarea.value);

			if (config.toolbarItems.inArray('color') || config.toolbarItems.inArray('bgcolor'))
			{
				makeColorset();
			}
			if (config.toolbarItems.inArray('table'))
			{
				makeTableset();
			}
			if (config.toolbarItems.inArray('hilite'))
			{
				makeHiliteset();
			}
			if (config.noSelect)
			{
				makeFontset();
			}

			setTimeout(function () { self.setDesignMode(); },10);
			expanded = false;
			rowCnt = 0;
		}
		return true;
	}


	var expanded = false;
	var rowCnt = 0;
	alditor.prototype.alditorToolbar = function (startNo) {
		if (!startNo)
		{
			startNo = 0
		}
		var self = this;
		var tempi = 0;
		this._buttonSet = document.createElement("DIV");
		this._buttonSet.className = "buttonSet";
		this._buttonSet.unselectable = "on";
		if (expanded == true)
		{
			this._buttonSet.style.display = 'none';
		}
		
		for (var i = startNo; i < config.toolbarItems.length; i++)
		{
			switch (config.toolbarItems[i].split("_")[0])
			{
				case "htmlsource":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/source.gif", "�ҽ� ����", "html");
				break;

				case "fontname":
					if (config.noSelect)
					{
						this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/font.gif", "�۲�", "fontname");
					} else {
						this.createSelect(config.fontOptions, "fontname");	
					}
				break;

				case "fontsize":
					if (config.noSelect)
					{
						this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/size.gif", "����ũ��", "fontsize");
					} else {
						this.createSelect(config.fontSizeOptions, "fontsize");
					}
				break;

				case "bold":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/bold.gif", "����", "bold");
				break;

				case "underline":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/underline.gif", "����", "underline");
				break;

				case "italic":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/italic.gif", "����̱�", "italic");
				break;

				case "strike":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/strike.gif", "��Ҽ�", "StrikeThrough");
				break;

				case "color":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/fontcolor.gif", "���� ��", "color");
				break;

				case "bgcolor":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/backcolor.gif", "���� ����", "bgcolor");
				break;

				case "sup":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/super.gif", "��÷��", "Superscript");
				break;

				case "sub":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/sub.gif", "�Ʒ�÷��", "Subscript");
				break;

				case "link":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/link.gif", "��ũ ����", "link");
				break;

				case "unlink":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/unlink.gif", "��ũ ����", "unlink");
				break;

				case "image":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/image.gif", "�̹���/������/����/�÷��� ����", "image");
				break;

				case "emoticon":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/emoticon.gif", "�̸�Ƽ�� ����", "emoticon");
				break;

				case "specialchars":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/specialchars.gif", "Ư������ ����", "specialchars");
				break;

				case "hilite":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/hilite.gif", "���� ����", "hilite");
				break;

				case "nohilite":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/nohilite.gif", "���� ��� �� ���� ���ڼӼ� ����", "nohilite");
				break;

				case "unorderedlist":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/unordered.gif", "�� ���", "insertunorderedlist");
				break;

				case "orderedlist":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/ordered.gif", "���� ���", "insertorderedlist");
				break;

				case "indent":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/indent.gif", "�鿩����", "indent");
				break;

				case "outdent":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/outdent.gif", "�鿩���� ���", "outdent");
				break;

				case "left":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/left.gif", "���� ����", "justifyleft");
				break;

				case "center":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/center.gif", "�߾� ����", "justifycenter");
				break;

				case "right":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/right.gif", "������ ����", "justifyright");
				break;

				case "hr":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/hr.gif", "���μ� ����", "inserthorizontalrule");
				break;

				case "simpleDiv":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/simpleDiv.gif", "�ܼ� ����", "simpleDiv");
				break;

				case "table":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/table.gif", "���̺� ����", "table");
				break;

				case "showhide":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/showhide.gif", "���̱�/���߱�", "showhide");
				break;

				case "preview":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/preview.gif", "�̸�����", "preview");
				break;

				case "spellcheck":
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/spellcheck.gif", "�ѱ� �����/���� �˻�", "spellcheck");
				break;

				case "space":
				var SpaceWidth = (config.toolbarItems[i].split("_")[1])?config.toolbarItems[i].split("_")[1]:config.defaultSpaceWidth;
				this.createSpace(SpaceWidth);
				break;

				case "abs":
				this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/abs.gif", "position:absolute", "abs");
				break;

				case "extraHTML":
					this.extraDiv = document.createElement("DIV");
					this.extraDiv.id = this._iframe.id + "extraDiv";
					this.extraDiv.className = "extraDiv";
					this.extraDiv.unselectable = "on";
					for (xi=0; xi < config.extraHTML.length; xi +=2)
					{
						var divContent = document.createElement("DIV");
						divContent.innerHTML = config.extraHTML[xi] + "..." + config.extraHTML[xi + 1];
						divContent.onclick = function () { addExtraTag(self._iframe,this.innerHTML);}
						divContent.unselectable = "on";
						divContent.firstChild.unselectable = "on";
						this.extraDiv.appendChild(divContent);
					}
					document.body.appendChild(this.extraDiv);
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/extra.gif", "�߰� �׸� (����/�ݱ�)", "extraHTML");
				break;
			}
				tempi = i;
			if (config.toolbarItems[i] == "row")
			{  
				rowCnt++;
				if (config.useExpansion && expanded == false && rowCnt == config.minimumRow)
				{
					this.createButton(config.alditorPath+"buttons/" + config.buttonSet + "/expand.gif", "�Է� ���� Ȯ��", "expand");
					expanded = true;
				}
				break;
			}
		}

		this._toolbarDiv.appendChild(this._buttonSet);
		if (tempi != config.toolbarItems.length-1)
		{
			this.addRow(i+1)
		}
		return true;
	}


	alditor.prototype.toolbarClick = function(action, buttonObj) 
	{
		var self = this;
		var actionIframe = this._iframe;
		
		if (config.toolbarItems.inArray('color') || config.toolbarItems.inArray('bgcolor'))
		{
			hideColorPicker();
		}
		if (config.toolbarItems.inArray('table'))
		{
			hideTableset(); 
		}
		if (config.toolbarItems.inArray('hilite'))
		{
			hideHiliteSelector(); 
		}
		if (config.noSelect)
		{
			hideFontset();
		}

		actionIframe.contentWindow.focus();
		
		switch (action)
		{
			case "html":
				switchMode(actionIframe);
				if (actionIframe.style.display != 'none' && config.allowStretch)
				{
					self.reHeight(actionIframe.contentWindow.document.body.scrollTop);
				}
			break;

			case "fontname":
				if (config.noSelect)
				{
					getFontName(actionIframe, buttonObj);
				} else {
					actionIframe.contentWindow.document.execCommand("fontname", false, buttonObj.value);
					buttonObj.selectedIndex=0;
				}
			break;

			case "fontsize":
				if (config.noSelect)
				{
					getFontSize(actionIframe, buttonObj);
				} else {
					actionIframe.contentWindow.document.execCommand("fontsize", false, buttonObj.value);
					buttonObj.selectedIndex=0;
				}
			break;

			case "color":
				getColor(actionIframe, buttonObj, "ForeColor");
			break;

			case "bgcolor":
				if (is_IE)
				{
					getColor(actionIframe, buttonObj, "BackColor");
				} else {
					getColor(actionIframe, buttonObj, "Hilitecolor");
				}
			break;

			case "link":
			var url=config.alditorPath + 'alditorLink.jsp?id='+this._iframe.id + '&rnd=' + new Date().getTime()+'&url='+geturl()+'&page=';
	
				popWin(url, 540,500, actionIframe);
			break;

			case "image":
				popWin(config.alditorPath + 'alditorImage.html?id='+this._iframe.id + '&rnd=' + new Date().getTime() , 500,400, actionIframe, true);
			break;

			case "emoticon":
				popWin(config.alditorPath + 'alditorEmoticons.html?id='+this._iframe.id + '&rnd=' + new Date().getTime(), 540,460, actionIframe);
			break;

			case "specialchars":
				popWin(config.alditorPath + 'alditorSpecialchars.html?id='+this._iframe.id + '&rnd=' + new Date().getTime() ,350,400, actionIframe);
			break;

			case "hilite":
				getHilite(actionIframe, buttonObj);
			break;

			case "nohilite":
				actionIframe.contentWindow.document.execCommand("RemoveFormat",false,null);
			break;

			case "simpleDiv":
				addExtraTag(actionIframe, "<div class='simpleDiv'<pre>...</pre></div>");
			break;

			case "table":
				showTableset(actionIframe,buttonObj);
			break;

			case "showhide":
				addExtraTag(actionIframe, '<div><A class="showhide" onclick="alditor_ShowHide(this); return false;"  onfocus="this.blur();" href="#" title="">���� ����</A></div><div class="showhideDiv" [[_sh_]]>...������ ����...</div>', "showhide");
			break;

			case "preview":
				alditorPreview (actionIframe);
			break;

			case "spellcheck":
				 spellcheck(actionIframe);
			break;

			case "extraHTML":
			this.extraDiv.style.top = getOffsetTop(this._table) + 'px';
			if (is_IE)
			{
				this.extraDiv.style.height = this._table.offsetHeight + 'px';
			} else {
				this.extraDiv.style.height = this._table.offsetHeight - 2 + 'px';
			}
			
			var newLeft = getOffsetLeft(this._table) + this._table.offsetWidth;
			if ((newLeft + config.useExtraHTMLwidth) > document.body.clientWidth)
			{
				newLeft -= config.useExtraHTMLwidth;
			}
			this.extraDiv.style.left = newLeft + 'px';
			if (this.extraDiv.style.display == "none" || !this.extraDiv.style.display){
				this.extraDiv.style.display = "block";
			} else {
				this.extraDiv.style.display = "none";
			}
			break;

			case "expand":
				var buttonrows = this._toolbarDiv.childNodes;
				for (i=config.minimumRow; i< buttonrows.length; i++)
				{
					if (	buttonrows[i].style.display != 'none')
					{
						buttonrows[i].style.display = 'none';
					} else {
							buttonrows[i].style.display = 'block';
					}
				}
			break;
			
			case "abs":
				makeAbs(actionIframe);
			break;

			default:
			try { actionIframe.contentWindow.document.execCommand( action, false, null); } catch (e) {}

		}
		if (action != "html")
		{
			updatePath(actionIframe);
		}
		return true;
	}


	alditor.prototype.addRow = function (i) {
		this.alditorToolbar(i);
		return true;
	}


	alditor.prototype.createButton = function(imgSrc, title, action) 
	{
		var self = this;
		var tempButton = document.createElement("IMG");
		tempButton.title = title;
		tempButton.alt = action;
		tempButton.src = imgSrc;
		tempButton.align = 'absmiddle';
		tempButton.border = 0;
		tempButton.onmouseover = function () { window.status = title; } ;
		tempButton.onmousedown = toolbarDown;
		tempButton.onmouseup = toolbarUp;
		tempButton.onmouseout = toolbarUp;
		tempButton.onclick = function () { self.toolbarClick(action, this); return true; } ;
		this._buttonSet.appendChild(tempButton);

		return true;
	}


	alditor.prototype.createSelect = function(optionList, action) 
	{
		var self = this;
		var theSelect = document.createElement("select");
		theSelect.onchange = function () { self.toolbarClick(action, this); return true; } ;
		for (var i = 0; i < optionList.length; i += 2)
		{
			var theOption = document.createElement("option");
			var theText = document.createTextNode(optionList[i + 1]);
			theOption.value = optionList[i];
			theOption.appendChild(theText);
			theSelect.appendChild(theOption);
		}
		this._buttonSet.appendChild(theSelect);

		return true;
	}


	alditor.prototype.createSpace = function(width) 
	{
		var tempSpace = document.createElement("SPAN");
		tempSpace.style.width = parseInt(width) + "px";
		if (!is_IE)
		{
			for (iii=0;iii<width ;iii++ )
			{
				iii += 5;
				tempSpace.innerHTML += "&nbsp;";
			}
		}
		this._buttonSet.appendChild(tempSpace);

		return true;
	}


	alditor.prototype.fillContents = function(text) 
	{
		var documentTemplate = "\
		<html>\
			<head>\
				<style type=\"text/css\">@import url(\""+config.alditorPath+"alditorInnerContent.css\");</style>\
			</head>\
			<body contentEditable=\"true\">\
				" + text + "\
			</body>\
		</html>\
		";
		this._iframe.contentWindow.document.open();
		this._iframe.contentWindow.document.write(documentTemplate);
		this._iframe.contentWindow.document.close();

		if (is_IE && config.allowStretch)
		{
			this.reHeight(this._iframe.contentWindow.document.body.scrollTop);
		}

		return true;
	}


	alditor.prototype.setDesignMode = function() 
	{
		var self = this;
		self._iframe.contentWindow.document.designMode = 'On';

		var _form = self._iframe.parentNode;
		while (_form.nodeName.toLowerCase() != "form") {
			_form = _form.parentNode;
		}
		
		if (!_form.rel || _form.rel == '')
		{
			if (config.noOnsubmit == false)
			{			
				self.attachOnSubmit(_form);
				_form.rel = self._textarea.id;
			}
		}

		addEvent(self._iframe.contentWindow, "blur", function(){updateTextarea(self._iframe,true)});
		addEvent(self._iframe.contentWindow.document, "keydown", function(event){interceptKey(event,self._iframe);});
		addEvent(self._iframe.nextSibling, "keydown", function(event){allowTab(event, self._iframe.nextSibling);});

		if (config.allowStretch)
		{
			addEvent(self._iframe.contentWindow.document, "keyup", function(){self.reHeight(self._iframe.contentWindow.document.body.scrollTop);});
		}

		if (config.showPath)
		{
			if (config.showPathSafeMode == false)
			{
				addEvent(self._iframe.contentWindow.document, "keyup", function(){updatePath(self._iframe);});
			} else {
				addEvent(self._iframe.contentWindow.document, "keyup", function(event){updatePathSafe(event, self._iframe);});
			}
			addEvent(self._iframe.contentWindow.document, "click", function(){tempHide(self._iframe,true); updatePath(self._iframe);});
		} else {
			addEvent(self._iframe.contentWindow.document, "click", function(){tempHide(self._iframe,true);});
		}

		if (config.toolbarItems.inArray('abs'))
		{
			addEvent(self._iframe.contentWindow.document, "mousedown", function(event){moveAbs(event, self._iframe);});
		}
		
		if (config.setFocus && !_1stRun)
		{
			if (config.useSafeFocus == false)
			{
				editorFocus(self._iframe, 0);
			} else {
				if ((getOffsetTop(self._table) + self._toolbarTd.offsetHeight + 20) < document.body.clientHeight + document.body.scrollTop) {
					editorFocus(self._iframe, 0);
				}
			}
		}

		if (!is_IE && config.allowStretch)
		{
			self.reHeight(self._iframe.contentWindow.document.body.scrollTop);
		}

		_1stRun = true;

		self.tryTextType();

		return true;
	}

	var onsubmitHolder = new Array();
	var oldOnsubmit = new Array();
	alditor.prototype.attachOnSubmit = function(_form)
	{
		var self = this;
		if (!oldOnsubmit[self._textarea.id])
		{
			oldOnsubmit[self._textarea.id] = _form.onsubmit;
		}

		if (onsubmitHolder[self._textarea.id])
		{
			_form.onsubmit = onsubmitHolder[self._textarea.id];
		}

		if (typeof _form.onsubmit != "function")
		{
			addEvent(_form, "submit", function(event){
					if (self.contentCheck(_form))
					{
						self.targetBlank(_form);
						self.contentCopy();
						return true;
					} else {
						cancelDefault(event);
						return false;
					}
				});
		}
		else
		{
			if (typeof g4_url == 'string' )
			{
				addEvent(_form, "submit", function(event){
					self.targetBlank(_form);
					if (passed == true)
					{
						if (self.contentCheck(_form))
						{
							self.contentCopy();
							return true;
						} else {
							cancelDefault(event);
							return false;
						}
					} passed = false;
				});		
			} else {
				if (!onsubmitHolder[self._textarea.id]) {
					_form.onsubmit = function(event) {
						if (self.contentCheck(_form))
						{
							self.targetBlank(_form);
							if (oldOnsubmit[self._textarea.id]())
							{
								self.contentCopy();
								return true;
							} else {
								cancelDefault(event);
								return false;
							}
						} else {
							cancelDefault(event);
							return false;
						}
					}
					onsubmitHolder[self._textarea.id] = _form.onsubmit;
				}
			}
		}
	}


	alditor.prototype.contentCheck = function(_form)
	{
		var self = this;
		self.iframes = _form.getElementsByTagName("IFRAME");

		if (self.iframes.length == 0)
		{
			self.iframes = new Array();
			var ifs = document.getElementsByTagName("IFRAME");
			for (var i=0; i< ifs.length ; i++)
			{
				if (ifs[i].className == "alditorIframe") {
					self.iframes.push(ifs[i]);
				}
			}
		}

		for ( i=0 ; i < self.iframes.length ; i++ )
		{
			if (self.iframes[i].className == "alditorIframe")
			{	
				if (self.iframes[i].style.display == 'none')
				{
					showIframe(self.iframes[i]);
				}
				if (config.useContentCheck)
				{
					if (is_IE)
					{
						var content = self.iframes[i].contentWindow.document.body.innerText;
					} else {
						var content = self.iframes[i].contentWindow.document.body.textContent;
					}
					var textLengh = content.length;
					if (!is_IE)
					{
						if (typeof g4_url == 'undefined' )
						{
							textLengh -= 20;
						}
					}
					if (textLengh < config.minimumContent || textLengh == 0)
					{
						alert('������ '+config.minimumContent+'�� ���� �̰ų� �׸��� �ֽ��ϴ�. Ȯ�� �ٶ��ϴ�.');
						self.iframes[i].contentWindow.focus();
						return false;
					}
				}
			}
		}
		return true;
	}


	alditor.prototype.targetBlank = function(_form)
	{
		var from_iframes = _form.getElementsByTagName("IFRAME");

		if (from_iframes.length == 0)
		{
			from_iframes = new Array();
			var ifs = document.getElementsByTagName("IFRAME");
			for (var i=0; i< ifs.length ; i++)
			{
				if (ifs[i].className == "alditorIframe") {
					from_iframes.push(ifs[i]);
				}
			}
		}

		for ( i=0 ; i < from_iframes.length ; i++ )
		{
			if (from_iframes[i].className == "alditorIframe")
			{
				if (from_iframes[i].style.display == 'none')
				{
					updateIframe(from_iframes[i])
				}

				if (config.targetBlank)
				{
					var a = from_iframes[i].contentWindow.document.getElementsByTagName("A");

					for (ii=0; ii<a.length ;ii++ )
					{
						if (!a[ii].target)
						{
							a[ii].target = "_blank";
						}
					}
				}

				if (config.imgKeepAddress)
				{
					var img = from_iframes[i].contentWindow.document.getElementsByTagName("IMG");
					for (iii=0; iii<img.length ;iii++ )
					{
						if (img[iii].src.indexOf(document.location.protocol+'//'+document.location.host) != -1)
						{
							img[iii].src = img[iii].src.replace(document.location.protocol+'//'+document.location.host,'');
						}
					}
				}
				updateTextarea(from_iframes[i], true);
			}
		}
		updateTextareas(_form);
	}


	alditor.prototype.contentCopy = function() 
	{
		var self = this;
		var iframes = self.iframes;
		var contentHolder = '';

		for ( i=0 ; i < iframes.length ; i++ )
		{
			if (iframes[i].className == "alditorIframe")
			{
				var content =  iframes[i].nextSibling.value;

				if (config.saveRemoteIMG && content.toLowerCase().indexOf('<img') != -1)
				{
					if (is_IE)
					{
						var w = window.showModalDialog(config.alditorPath + "saveimage.php?rnd=" + new Date().getTime(), iframes[i].nextSibling ,"dialogHeight: 100px; dialogWidth: 150px; edge: Raised; center: Yes; help: No; resizable: Yes; status: No;");
						iframes[i].nextSibling.value = decodeURIComponent(iframes[i].nextSibling.value);
					} else {
						 http.open('GET', config.alditorPath + "saveimageFF.php?rnd=" + new Date().getTime() + '&source='+encodeURIComponent(iframes[i].nextSibling.value), false);
						 http.send(null);
						 if (http.status == 200) {
							 iframes[i].nextSibling.value =  decodeURIComponent(http.responseText);
						 } else {
							alert('�ܺ��̹����� �������� ���߽��ϴ�.');
						 }	
					}
				}

				if (iframes.length > 1 && content.length > 0)
				{
					if (i != 0 && contentHolder != '')
					{
						contentHolder += "\n\n\n\n";
					}
					contentHolder += (i +1) + "��° TextArea �� ����� ����\n\n";
				}
				if (content.length > 0)
				{ 
					contentHolder += iframes[i].nextSibling.value;
				}
			}
		}

		if (contentHolder.length > 0 && config.useCopy)
		{
			contentHolder = contentHolder.replace(/\[!--(.*)--\]/,'');
			copyContent(contentHolder);
		}

		this.tryTextType();
	}


	alditor.prototype.tryTextType = function()
	{
		var self = this;
		self._textarea.focus = function() {
			if (self._iframe.style.display != 'hidden')
			{
				self._iframe.contentWindow.focus();
			}
		}

		try { 
			var _form = self._iframe.parentNode;
			while (_form.nodeName.toLowerCase() != "form") {
				_form = _form.parentNode;
			}
		} catch (e) {}

		try { //���κ��� 4
			_form.elements['use_html'].value = 2;
			_form.elements['use_html'].checked = true;
			_form.elements['use_html'].onclick = function () { return false;};
		} 
		catch(e){}

		try { //�״����� 3
			_form.elements['wr_html'].value = 1;
			_form.elements['wr_html'].checked = true;
			_form.elements['wr_html'].onclick = function () { return false;};
		}
		catch(e){}

		try { //�״����� 4
			_form.elements['html'].value = 'html1';
			_form.elements['html'].checked = true;
			_form.elements['html'].onclick = function () { return false;};
		}
		catch(e){}

		try { // RG����
			var Htmlradio = _form.elements['rg_html_use'];
			for (i=0; i< Htmlradio.length; i++ )
			{
				if (Htmlradio[i].value == 1)
				{
					Htmlradio[i].checked = true;
				}
			}
		}
		catch(e){}

		try { // �̴Ϻ���
			_form.elements['textmode'].checked = false;
			_form.elements['textmode'].onclick = function () { return false;};
			_form.elements['auto_br'].checked = false;
			_form.elements['auto_br'].onclick = function () { return false;};
		}
		catch(e){}
	}


	alditor.prototype.reHeight = function(newHeight) 
	{
		var self = this;
		var strechBy = self._alditorTd.clientHeight + newHeight;
		if ((self._iframe.contentWindow.document.body.scrollWidth - self._iframe.contentWindow.document.body.clientWidth) > 0)
		{
			if (is_IE)
			{
				var extraH = 18;
			} else {
				var extraH = 21;
			}
		} else {
			var extraH = 0;
		}
		if (newHeight > 0)
		{
			self._alditorTd.style.height = strechBy + 3 + 'px';
			self._iframe.style.height = self._alditorTd.clientHeight + 3 + 'px';
			self._textarea.style.height = self._alditorTd.clientHeight + 1 + 'px';
		} else {
			if (is_IE)
			{
				var tempH = self._iframe.contentWindow.document.body.scrollHeight;
				if (tempH > editorHeight[self._iframe.id])
				{
					self._iframe.style.height = tempH + 3 + extraH + 'px';
					self._textarea.style.height = tempH  + 1 + extraH + 'px';
					self._alditorTd.style.height = tempH + 3 + extraH + 'px';
				} else if (self._alditorTd.clientHeight > editorHeight[self._iframe.id]) {
					self._iframe.style.height = editorHeight[self._iframe.id] - 1 + extraH + 'px';
					self._textarea.style.height = editorHeight[self._iframe.id] -3 + extraH + 'px';
					self._alditorTd.style.height = editorHeight[self._iframe.id] - 1 + extraH + 'px';
					if (config.movableToolbar)
					{
						if (getOffsetTop(self._toolbarDiv) > getOffsetTop(self._table) + self._table.offsetHeight)
						{
							self._toolbarDiv.style.top = '0px';
							self._toolbarDiv.newTop = 0;
						}	
					}
				}
			} else {
				var tempH = self._iframe.contentWindow.document.body.offsetHeight;
				if (tempH > editorHeight[self._iframe.id])
				{
					self._iframe.style.height = tempH + extraH + 'px';
					self._textarea.style.height = tempH  - 2 + extraH + 'px';
					self._alditorTd.style.height = tempH + extraH + 'px';
				} else if (self._alditorTd.clientHeight > editorHeight[self._iframe.id]) {
					self._iframe.style.height = editorHeight[self._iframe.id] + extraH + 'px';
					self._textarea.style.height = editorHeight[self._iframe.id] - 2 + extraH+ 'px';
					self._alditorTd.style.height = editorHeight[self._iframe.id] + extraH + 'px';
					if (config.movableToolbar)
					{
						if (getOffsetTop(self._toolbarDiv) > getOffsetTop(self._table) + self._table.offsetHeight)
						{
							self._toolbarDiv.style.top = '0px';
							self._toolbarDiv.newTop = 0;
						}	
					}
				}
			}
		}
		return true;
	}


	function switchMode(_iframe) {
		if (!_iframe) { return false; }
		if (_iframe.style.display != 'none')
		{  
			showTextarea(_iframe);
		} else {
			showIframe(_iframe);
		}
	}

	//������ ���� ǥ��
	function showIframe (_iframe) {
		if (!_iframe || _iframe.style.display != 'none') { return false; }
		var buttonRows = document.getElementById(_iframe.id+'_toolbarDiv').childNodes;
		for (i=0; i< buttonRows.length;i++ )
		{
			var buttons = buttonRows[i].childNodes;
			for (a=0; a< buttons.length;a++ )
			{
				if (buttons[a].alt != "html")
				{
					buttons[a].style.visibility = "visible";
				}
			}
		}
		updateIframe(_iframe);
		_iframe.style.display = '';
		_iframe.nextSibling.style.display = 'none';
		showPathTd(_iframe);
		editorFocus(_iframe, 0);
	}

	 //Textarea ǥ��
	function showTextarea (_iframe) {
		if (!_iframe || _iframe.style.display == 'none') { return false; }
		var buttonRows = document.getElementById(_iframe.id+'_toolbarDiv').childNodes;
		for (i=0; i< buttonRows.length;i++ )
		{
			var buttons = buttonRows[i].childNodes;
			for (a=0; a< buttons.length;a++ )
			{
				if (buttons[a].alt != "html")
				{
					buttons[a].style.visibility = "hidden";
				}
			}
		}
		updateTextarea(_iframe);
		_iframe.nextSibling.style.display = '';
		_iframe.style.display = 'none';
		hidePathTd(_iframe);
		textareaFocus(_iframe.nextSibling);
	}

	function updateTextareas(_form) {
		var iframes = _form.getElementsByTagName("IFRAME");
		if (iframes.length == 0)
		{
			iframes = new Array();
			var ifs = document.getElementsByTagName("IFRAME");
			for (var i=0; i< ifs.length ; i++)
			{
				if (ifs[i].className == "alditorIframe") {
					iframes.push(ifs[i]);
				}
			}
		}
		for ( i=0 ; i < iframes.length ; i++ )
		{
			if (iframes[i].className == "alditorIframe")
			{
				var editorValue = iframes[i].contentWindow.document.body.innerHTML;
				editorValue = beautifyTags(editorValue)
				editorValue = editorValue.replace(/(\n)/gi,'');
				iframes[i].nextSibling.value = editorValue;
			}
		}
	}

	function updateTextarea(_iframe,done) {
		var editorValue = _iframe.contentWindow.document.body.innerHTML;
		editorValue = beautifyTags(editorValue)
		if (done == true)
		{
			editorValue = editorValue.replace(/(\n)/gi,'');
		}
		_iframe.nextSibling.value = editorValue;
	}


	function updateIframe(_iframe) {
		var textareaValue = _iframe.nextSibling.value;
		_iframe.contentWindow.document.body.innerHTML = textareaValue.replace(/(\n)/gi,'');
	}


	function tempHide(_iframe) {
		hideExtra(_iframe,true); 
		if (config.toolbarItems.inArray('table'))
		{
			hideTableset(); 
		}
		if (config.noSelect)
		{
			hideFontset();
		}
		if (config.toolbarItems.inArray('color') || config.toolbarItems.inArray('bgcolor'))
		{
			hideColorPicker();
		}
		if (config.toolbarItems.inArray('hilite'))
		{
			hideHiliteSelector();
		}
		pressed = 0;
		currentEditor = _iframe;
	}


	function hideExtra(_iframe, real) {
		if (config.useExtraHTML)
		{
			var extraDiv = document.getElementById(_iframe.id+"extraDiv");
			if (!real)
			{
				extraDiv.style.visibility = "hidden";
			} else {
				extraDiv.style.display = "none";
			}
		}
	}


	function showExtra(_iframe) {
		if (config.useExtraHTML)
		{
			var extraDiv = document.getElementById(_iframe.id+"extraDiv");
			var mainTable = _iframe.parentNode;
			while (mainTable.nodeName.toLowerCase() != "table") {
				mainTable = mainTable.parentNode;
			}
			var newLeft = getOffsetLeft(mainTable) + mainTable.offsetWidth;
			if ((newLeft + config.useExtraHTMLwidth) > document.body.clientWidth)
			{
				newLeft -= config.useExtraHTMLwidth;
			}
			extraDiv.style.top = getOffsetTop(mainTable) + 'px';
			extraDiv.style.left =  newLeft + 'px';
			if (is_IE)
			{
				extraDiv.style.height = mainTable.offsetHeight + 'px';
			} else {
				extraDiv.style.height = mainTable.offsetHeight - 2 + 'px';
			}
			extraDiv.style.visibility = "visible";
		}
	}


	function hidePathTd(_iframe) {
		if (config.showPath)
		{
			if (!is_IE) {
				removeEvent(_iframe.contentWindow.document, "click", function(){updatePath(_iframe); return true;}, false);
				removeEvent(_iframe.contentWindow.document, "keyup", function(){updatePath(_iframe); return true;}, false);
			}
			document.getElementById(_iframe.id + 'pathTd').style.visibility = 'hidden';
			document.getElementById(_iframe.id + 'pathTd').innerHTML = (config.showPath)? "Tags:" : "&nbsp;";
		}
		hideExtra(_iframe);
	}


	function showPathTd(_iframe) {
		if (config.showPath)
		{
			document.getElementById(_iframe.id + 'pathTd').style.visibility = 'visible';
			if (!is_IE) {
				addEvent(_iframe.contentWindow.document, "click", function(){updatePath(_iframe); return true;});
				addEvent(_iframe.contentWindow.document, "keyup", function(){updatePath(_iframe); return true;});
			}
		}
		showExtra(_iframe);
	}


	// �ؽ�Ʈ ���� ����
	function beautifyTags(rawhtml)
	{
		rawhtml = rawhtml.replace(/(<br>)/gi,'<br />');
		if (rawhtml.substring(rawhtml.length-6) == "<br />" && !is_IE)
		{
			rawhtml = rawhtml.substring(0,rawhtml.length-6);
		}
		rawhtml = rawhtml.replace(/(<br \/>)/gi,'<br />\n'); 
		rawhtml = rawhtml.replace(/<[^> ]*/g, function(match){return match.toLowerCase();});
		rawhtml = rawhtml.replace(/(<img [^>]+[^\/])>/g, "$1 />");
		rawhtml = rawhtml.replace (/(^\s*)|(\s*$)/g, "");
		if (rawhtml == "<p>&nbsp;</p>")
		{
			rawhtml = '';
		}
		rawhtml = rawhtml.replace(/<strong(\s+|>)/g, "<b$1");
		rawhtml = rawhtml.replace(/<\/strong(\s+|>)/g, "</b$1");
		rawhtml = rawhtml.replace(/<em(\s+|>)/g, "<i$1");
		rawhtml = rawhtml.replace(/<\/em(\s+|>)/g, "</i$1");
		return rawhtml;
	}


	function editorFocus(_iframe, mode) {
		setTimeout(function () { moveCursorToEnd(_iframe, mode); return true; }, 100);
	}

	function moveCursorToEnd(_iframe, mode) {
		if (mode == 0 || !mode)
		{
			_iframe.contentWindow.document.execCommand("SelectAll", false, null);
		}
		if (mode <= 1)
		{
			if (is_IE) {
				try
				{
					var rng = _iframe.contentWindow.document.selection.createRange();
					rng.collapse(false);
					rng.select();					
				}
				catch (e) {	}
			}
			else {
				try
				{
					var sel = _iframe.contentWindow.getSelection();
					sel.collapseToEnd();					
				} 
				catch (e) {	}
			}
		}
		setTimeout(function () {_iframe.contentWindow.focus(); },0);
		updatePath(_iframe);
	}

	function textareaFocus(oInput,oStart,oEnd) {
		oInput.focus();
		if (!oStart && !oEnd)
		{
			oStart = oInput.value.length;
			oEnd = oInput.value.length;
		}
		if( oInput.setSelectionRange ) {
			oInput.setSelectionRange(oStart,oEnd);
		} else if( oInput.createTextRange ) {
			var range = oInput.createTextRange();
			range.collapse(true);
			range.moveEnd('character',oEnd);
			range.moveStart('character',oStart);
			range.select();
		}
	}

	function toolbarDown () {
		this.style.marginTop = '2px';
		this.style.marginBottom = '-2px';
	}

	function toolbarUp () {
		this.style.marginTop = '0px';
		this.style.marginBottom = '0px';
		window.status ='';
	}


	var pressed = 0;
	function interceptKey(evt , _iframe) 
	{
		evt = evt || window.event;
		var keyCode = evt.keyCode || evt.charCode;

		if (evt.altKey)
		{
			updateTextarea(_iframe,true);
		}
		
		if (is_IE)
		{
			if (config.useEnterBR)
			{
				try
				{
					var range = _iframe.contentWindow.document.selection.createRange();
					var parent = range.parentElement();

					var div = parent;
					while (div.nodeName.toLowerCase() != "div") {
						div = div.parentNode;	
					}
				}
				catch (e) { }

				if ((keyCode == 13 && pressed != 13) || (div && keyCode == 13) || (keyCode == 13 && config.useAutoP == false))
				{
					if (evt.shiftKey == false)
					{
						try
						{
							range.pasteHTML('<br />');
							evt.cancelBubble = true;
							evt.returnValue = false;
							range.select();
						}
						catch (e) { }
					}
				} else if (keyCode == 13 && pressed == 13){
					if (evt.shiftKey == false)
					{
						if (config.useAutoP)
						{
							try
							{ 
								var tempBRi, prevBR;
								range.pasteHTML('<br id="tempBR"/>');
								var tempBR = parent.getElementsByTagName('BR');
								for (var i=0; i<tempBR.length ;i++ )
								{
									if (tempBR[i].id == 'tempBR')
									{
										tempBRi = tempBR[i];
										break;
									}
								}
								prevBR = tempBRi.previousSibling;
								if (!prevBR)
								{
									if (tempBRi.parentNode.previousSibling.nodeName.toLowerCase() == "br")
									{
										prevBR = tempBRi.parentNode.previousSibling;
									}
									if (!prevBR)
									{
										if (tempBRi.parentNode.previousSibling.lastChild.nodeName.toLowerCase() == "br")
										{
											prevBR = tempBRi.parentNode.previousSibling.lastChild;
										}
									}
								}
								if (tempBRi.previousSibling.previousSibling && tempBRi.previousSibling.previousSibling.nodeName.toLowerCase() == "br")
								{
									parent.removeChild(tempBRi.previousSibling.previousSibling);
								}
								parent.removeChild(prevBR);
								parent.removeChild(tempBRi);
							}
							catch (e) { }

							pressed = 0;
							return;
						}
					}
				}
				if(keyCode == 9){
					try
					{
						(_iframe.contentWindow.document.selection.createRange()).text="    "; //\t
						evt.cancelBubble = true;
						evt.returnValue = false;
					}
					catch (e) { }
				}
				pressed = keyCode;
				return false;
			}
		} else {
			if (evt.ctrlKey)
			{
				switch(keyCode) {
					case 66 :
						_iframe.contentWindow.document.execCommand( 'bold', false, null);
						cancelDefault(evt);
						noPropagation(evt);
					break;

					case 73 :
						_iframe.contentWindow.document.execCommand( 'italic', false, null);
						cancelDefault(evt);
						noPropagation(evt);
					break;

					case 85 : 
						_iframe.contentWindow.document.execCommand( 'underline', false, null);
						cancelDefault(evt);
						noPropagation(evt);
					break;
				}
			}
			updateTextarea(_iframe, true);
		}
	}


	function allowTab(evt, target){
		evt = evt || window.event;
		var keyCode = evt.keyCode || evt.charCode;
		if(9==keyCode){
			try
			{
				document.selection.createRange().text="\t";
				evt.cancelBubble = true;
				evt.returnValue = false;
			}
			catch (e) {
				var txt = target.value.substring(target.selectionStart, target.selectionEnd);
				target.value = target.value.substring(0, target.selectionStart)
				+ "\t" + txt + target.value.substring(target.selectionEnd, target.value.length);
				evt.cancelBubble = true;
				evt.preventDefault();
			}    
		}
		return false;
	}


	function addExtraTag (_iframe, html, mode) {
		_iframe.contentWindow.focus();
		var rand = new Date().getTime();
		var selected = getSelectedHTML(_iframe);
		if (selected.toLowerCase() == "<p>&nbsp;</p>" || selected.toLowerCase() == "<p></p>" || selected.toLowerCase() == "<p> </p>" || selected.toLowerCase() == "<br />" || selected.toLowerCase() == "<br>")
		{
			selected = '';
		}
		if (selected.length > 0)
		{
			if (mode == "showhide")
			{
				html = html.replace('...������ ����...',selected);
			} else {
				html = html.replace('...',selected);
			}
		} else {
			if (mode == "showhide")
			{
				alert("������ ���� �κ��� �����ϼ���.");
				return false;
			}		
		}
		html = html.replace('unselectable="on"', '');
		html = html.substring(0,html.indexOf(' ')) + ' id="' + rand + '"' + html.substring(html.indexOf(' '));
		if (mode == "showhide")
		{
			html = html.replace('[[_sh_]]', 'id='+ rand + 'sh');
		}
		if (is_IE)
		{	
			var range = _iframe.contentWindow.document.selection.createRange();
			range.pasteHTML(html);
			if (selected.length < 1)
			{
				range.moveToElementText(_iframe.contentWindow.document.getElementById(rand));
				range.select();
			} else {
				range.collapse(false);
			}
		} else {
			html += "<div> </div>";
			_iframe.contentWindow.document.execCommand("InsertHTML", false, html);
		}
	}


	function getSelectedHTML(win){
			var rng=null,html="";

			if (win.contentWindow.document.selection && win.contentWindow.document.selection.createRange){
					rng=win.contentWindow.document.selection.createRange();
					html=rng.htmlText||"";
			}else if (win.contentWindow.getSelection){
					rng=win.contentWindow.getSelection();
					if (rng.rangeCount > 0 && win.contentWindow.XMLSerializer){
							rng=rng.getRangeAt(0);
							html=new XMLSerializer().serializeToString(rng.cloneContents());
					}
			}
			return html;
	}


	function alditorPreview (_iframe) {
		var param = getCenterWinStr(800, 600);
		var previewWin = window.open(null, "previewWin",param+",menubar=no,scrollbars=no,statusbar=yes, resizable=yes");
		var content = "\
			<html>\
				<head>\
				<title> �� �� �� �� </title>\
				<meta http-equiv=content-type content=text/html;charset=utf-8>\
					<style>@import url( '"+config.alditorPath+"alditorInnerContent.css' );</style>\
					<SCRIPT LANGUAGE='JavaScript' type='text/javascript' src='" + config.alditorPath + "alditorInnerContent.js'></SCRIPT>\
				</head>\
				<body scroll='auto'>\
					<div style=\"overflow:auto; width:100%;word-break:break-all;height:100%\">\
				" + _iframe.contentWindow.document.body.innerHTML + "\
					</div>\
				</body>\
			</html>";
		previewWin.document.open();
		previewWin.document.write(content);
		previewWin.document.close();
	}


	function spellcheck(_iframe) {
		if (is_IE)
		{
			var contentText = _iframe.contentWindow.document.body.innerText;
		} else {
			var contentText = _iframe.contentWindow.document.body.textContent;
		}

		var param = getCenterWinStr(450, 550);
		var spellcheckWin = window.open(config.spellcheckLink, "spellcheckWin",param+",menubar=no,scrollbars=yes, statusbar=no, resizable=yes");

		var formObj = document.createElement('form');
		formObj.setAttribute('name','form');
		formObj.setAttribute('action',config.spellcheckAction);
		formObj.setAttribute('method','post');
		formObj.setAttribute('target','spellcheckWin');

		var spellText = document.createElement('input');
		spellText.setAttribute('type', 'hidden');
		spellText.setAttribute('name', 'text1');
		spellText.setAttribute('value', contentText);
		formObj.appendChild(spellText);
		document.body.appendChild(formObj);

		formObj.submit();
		spellcheckWin.focus();
		spellcheckWin.opener = null;
	}


	//abs ���
	var zindexCnt = 0;
	function makeAbs(_iframe) {
		var elm = getParentElement(_iframe);
		currentEditor = _iframe;
		var selected = getSelectedHTML(_iframe);
		selected = selected.replace (/(^\s*)|(\s*$)/g, "");

		if (selected)
		{
			zindexCnt ++;
			selected = "<span style='position:absolute; z-index:"+zindexCnt+";'>" + selected + "</span>";
			if (is_IE)
			{	
				currentEditor.contentWindow.document.execCommand("delete", false, null);
				var sel = currentEditor.contentWindow.document.selection;
				var range = sel.createRange();
				range.pasteHTML(selected);
			} else {
				currentEditor.contentWindow.document.execCommand("InsertHTML", false, selected);
			}				
		} else {
			if (elm && elm.tagName.toLowerCase() != 'body')
			{
				if (elm.style.position != 'absolute')
				{
					zindexCnt ++;
					elm.style.position = 'absolute';
					elm.style.zIndex = zindexCnt;
				} else {
					elm.style.position = '';
					elm.style.zIndex = '';
					elm.style.marginLeft = '';
					elm.style.marginTop = '';
					elm.style.top = '';
					elm.style.left = '';
				}
			}
		} 
	}

	var absOnMove = false;
	var init_marginL = 0;
	var init_marginT = 0;
	var marginL = 0
	var marginT = 0
	var absObj;
	function moveAbs(evt, _iframe) {
		var e = evt || window.event;
		var elm = getParentElement(_iframe);
		var t = e.target ? e.target : e.srcElement;
		var CurElem = t ? (t.id || t.tagName || t.nodeName || t) : '';
		if (is_IE)
		{
			var sel = _iframe.contentWindow.document.selection;
			var selType = sel.type;
		}

		if (is_IE)
		{
			if (elm && elm.style.position == 'absolute' && CurElem == elm.tagName && selType == "Control")
			{
				cancelDefault(e);
				absObj = elm;
				absOnMove = true;

				init_marginL = e.pageX ? e.pageX : e.clientX;
				init_marginT = e.pageY ? e.pageY : e.clientY;
				marginL = (parseInt(elm.style.marginLeft) || 0);
				marginT = (parseInt(elm.style.marginTop)  || 0);

				addEvent(elm, "dragstart", nodrag);
				addEvent(_iframe.contentWindow.document, "mousemove", moveAbsING);
				addEvent(_iframe.contentWindow.document, "mouseup", moveAbsEnd);
			}
		} else {
			if (elm && elm.style.position == 'absolute' && CurElem == elm.tagName)
			{
				cancelDefault(e);
				absObj = elm;
				absOnMove = true;
		
				init_marginL = e.pageX ? e.pageX : e.clientX;
				init_marginT = e.pageY ? e.pageY : e.clientY;
				marginL = (parseInt(elm.style.marginLeft) || 0);
				marginT = (parseInt(elm.style.marginTop)  || 0);

				addEvent(_iframe.contentWindow.document, "mousemove", moveAbsING);
				addEvent(_iframe.contentWindow.document, "mouseup", moveAbsEnd);
			}
		}
	}

	function nodrag() {
		return false;
	}

	function moveAbsING(evt) {
		if (!absOnMove) return;
		var e = evt || window.event;
		cancelDefault(e);

		if (!is_IE)
		{
			absObj.style.top = null; 
			absObj.style.left = null;
		}

		var end_marginL = e.pageX ? e.pageX : e.clientX;
		var end_marginT = e.pageY ? e.pageY : e.clientY;

		var diff_marginL = end_marginL - init_marginL;
		var diff_marginT = end_marginT - init_marginT;

		if (end_marginL <=  currentEditor.contentWindow.document.body.offsetWidth && end_marginL > 0)
		{
			absObj.style.marginLeft = marginL + diff_marginL + 'px';
		}
		if (end_marginT <=  currentEditor.contentWindow.document.body.offsetHeight && end_marginT > 0)
		{
			absObj.style.marginTop = marginT + diff_marginT + 'px';
		}
	}

	function moveAbsEnd(evt) {
		absOnMove = false;
		if (is_IE)
		{
			removeEvent(absObj, "dragstart", nodrag, false);
		} else {
			absObj.style.top = null; 
			absObj.style.left = null;			
		}
		removeEvent(currentEditor.contentWindow.document, "mousemove", moveAbsING, false);
		removeEvent(currentEditor.contentWindow.document, "mouseup", moveAbsEnd, false);
	}


	// ���� �巹��
	var on_move = false;
	var init_y = 0;
	var new_y = 0;
	var movableObj;
	var parentEditor;
	function tb_moveStart(evt, _toolbarDiv, _iframe) {
			var e = evt || window.event;
			cancelDefault(e);
			init_y = e.pageY ? e.pageY : e.clientY;

			movableObj = _toolbarDiv;
			parentEditor = _iframe;
			on_move = true;

			addEvent(document, "mousemove", tb_moveING);
			addEvent(document, "mouseup", tb_moveEnd);
	}

	function tb_moveING(evt) {
		if (!on_move) return;
		var e = evt || window.event;
		cancelDefault(e);

		if (parentEditor.style.display != 'none')
		{
			parentEditor.style.visibility = 'hidden';	
		}

		var current_y = (movableObj.newTop)? movableObj.newTop : 0;
		var end_y = e.pageY ? e.pageY : e.clientY;
		new_y = current_y + (end_y - init_y);
		if (new_y < 0)
		{
			new_y = 0;
		}
		movableObj.style.top = new_y + 'px';
	}

	function tb_moveEnd(evt) {
		on_move = false;
		if (parentEditor.style.visibility == 'hidden')
		{
			parentEditor.style.visibility = 'visible';	
		}
		movableObj.newTop = new_y;
		removeEvent(document, "mousemove", tb_moveING, false);
		removeEvent(document, "mouseup", tb_moveEnd, false);
	}


	//�������� �巹��
	var on_resize = false;
	var start_x = 0, start_y = 0, objWidth = 0, objHeight = 0, newWidth = 0, newHeight = 0;
	var outerTable, resizableObj, wasShown;

	function resizeStart(evt, _table, _iframe) {
		var e = evt || window.event;
		cancelDefault(e);

		start_x = e.pageX ? e.pageX : e.clientX;
		start_y = e.pageY ? e.pageY : e.clientY;

		outerTable = _table;
		outerTable.className = "topTableDrag";

		resizableObj = _iframe.parentNode;

		if (resizableObj.childNodes[0].style.display != "none")
		{
			wasShown = "editor";
			newWidth = resizableObj.childNodes[0].offsetWidth;
		} else {
			wasShown = "textarea";
			newWidth = resizableObj.childNodes[1].offsetWidth;
		}

		newHeight = resizableObj.offsetHeight ;

		resizableObj.childNodes[0].style.display = "none";
		resizableObj.childNodes[1].style.display = "none";
		hidePathTd(_iframe);

		objWidth = newWidth;
		objHeight = newHeight;

		on_resize = true;

		addEvent(document, "mousemove", resizING);
		addEvent(document, "mouseup", resizeEnd);
	};

	function resizING(evt) {
		if (!on_resize) return;
		var e = evt || window.event;
		cancelDefault(e);

		var end_x = e.pageX ? e.pageX : e.clientX;
		var end_y = e.pageY ? e.pageY : e.clientY;

		var diff_x = end_x - start_x;
		var diff_y = end_y - start_y;

		newWidth = objWidth + diff_x;
		newHeight = objHeight + diff_y;

		(newWidth < config.minWidth)? newWidth = config.minWidth : newWidth;
		(newHeight < config.minHeight)? newHeight = config.minHeight : newHeight;

		if (config.dragMode == 1 || config.dragMode > 2)
		{
			outerTable.style.width = newWidth + 'px';
		} 
		if (config.dragMode > 1)
		{
			resizableObj.style.height    = newHeight + 'px';
		}
	};

	function resizeEnd(evt) {
		var e = evt || window.event;
		cancelDefault(e);

		resizableObj.childNodes[0].style.width = resizableObj.clientWidth + 'px';
		resizableObj.childNodes[0].style.height = resizableObj.clientHeight + 'px';
		resizableObj.childNodes[1].style.width = resizableObj.clientWidth +'px';
		resizableObj.childNodes[1].style.height = resizableObj.clientHeight - 2 + 'px';

		outerTable.className = "topTable";

		if (wasShown == "editor")
		{
			resizableObj.childNodes[0].style.display = "";
			editorFocus(resizableObj.childNodes[0], 0);
			showPathTd(resizableObj.childNodes[0]);
		} else {
			resizableObj.childNodes[1].style.display = "";
			textareaFocus(resizableObj.childNodes[1]);
		}
		
		editorHeight[resizableObj.childNodes[0].id] = newHeight;

		on_resize = false;
		removeEvent(document, "mousemove", resizING, false);
		removeEvent(document, "mouseup", resizeEnd, false);
	};


	// �±�ǥ�ð���
	function updatePathSafe(evt, _iframe) {
		evt = evt || window.event;
		var keyCode = evt.keyCode || evt.charCode;
		switch (evt.keyCode) {
			case 37:
				updatePath(_iframe);
				break;    
			case 38:
				updatePath(_iframe);
				break;    
			case 39:
				updatePath(_iframe);
				break;    
			case 40:
				updatePath(_iframe);
				break;   
			case 8:
				updatePath(_iframe);
				break;    			
		 }
		 return true;
	}

	var removeButton = 1;
	var selectedNode;
	function updatePath(_iframe)
	{
		var bodyContent = _iframe.contentWindow.document.body;
		if (bodyContent.firstChild && bodyContent.firstChild.nodeName.toLowerCase() == "p" && bodyContent.childNodes.length < 2)
		{
			if (bodyContent.firstChild.innerHTML == "&nbsp;" || bodyContent.firstChild.innerHTML == "")
			{
				bodyContent.removeChild(bodyContent.firstChild);
			}
		}
		var ancestors = null;
		var pathTdArea = document.getElementById(_iframe.id + 'pathTd');
		var ancestors = getAllAncestors(_iframe);
		if (config.showPath)
		{
			pathTdArea.innerHTML = "Tags:";
			for ( var i = ancestors.length; --i >= 0; )
			{
				var el = ancestors[i];
				if ( !el || el.tagName.toLowerCase() == "br") // || el.tagName.toLowerCase() == "body"
				{
					continue;
				}
				var a = document.createElement("a");
				a.href = "javascript:void(0)";
				a.node = el;
				a.onclick = function() {
					selectNodeContents(_iframe,this.node);
					return false;
				}
				var txt = el.tagName.toLowerCase();
				if (txt != "body")
				{
					a.title = el.style.cssText;
				}
				if ( el.id )
				{
				// txt += "#" + el.id;
				}
				if ( el.className )
				{
				// txt += "." + el.className;
				}
				a.appendChild(document.createTextNode(txt));

				pathTdArea.appendChild(a);
				if ( i !== 0 ) //&& el.tagName.toLowerCase() != "body"
				{
					pathTdArea.appendChild(document.createTextNode(String.fromCharCode(0xbb)));
				}
			}

			if(is_IE)
			{
				var sel = _iframe.contentWindow.document.selection.createRange().text;
			} else {
				var sel = _iframe.contentWindow.getSelection();
			}

			if ((removeButton > 1) && sel != '')
			{
				var a = document.createElement("a");
				a.href = "javascript:void(0)";
				a.onclick = function() {
					removeTag(_iframe);
					return false;
				};
				a.unselectable = 'on';
				a.title = "���õ�(���ΰ� �ִ�) �±׸� ��ȿȭ �մϴ� (���� ���� �ƴ�!)";
				a.appendChild(document.createTextNode("x"));
				pathTdArea.appendChild(a);
				removeButton --;
			}
		}
		return false;
	}


	function getAllAncestors(_iframe)
	{
	var p = getParentElement(_iframe);
	var a = [];
	while ( p && (p.nodeType == 1) && ( p.tagName.toLowerCase() != 'body' ) )
	{
		a.push(p);
		p = p.parentNode;
	}
	a.push(_iframe.contentWindow.document.body);
	return a;
	}


	function getParentElement(_iframe) {
		if(is_IE)
		{
			var sel = _iframe.contentWindow.document.selection;
			var range = sel.createRange();
		} else {
			var sel = _iframe.contentWindow.getSelection();
			var range = sel.getRangeAt(0);
		}
		if (is_IE) {
			try {
				switch ( sel.type )
				{
					case "Text":
						var parent = range.parentElement();
						while ( true )
						{
							var TestRange = range.duplicate();
							TestRange.moveToElementText(parent);
							if ( TestRange.inRange(range) )
							{
								break;
							}
							if ( ( parent.nodeType != 1 ) || ( parent.tagName.toLowerCase() == 'body' ) )
							{
								break;
							}
							parent = parent.parentElement;
						}
					return parent;

					case "None":
					return range.parentElement();

					case "Control":
					return range.item(0);
				
					default:
					return _iframe.contentWindow.document.body;
				}
			} catch(e) {}
		} else {
			try
			{
				var p = range.commonAncestorContainer;
				if ( !range.collapsed && range.startContainer == range.endContainer && range.startOffset - range.endOffset <= 1 && range.startContainer.hasChildNodes() )
				{
					p = range.startContainer.childNodes[range.startOffset];
				}
				while ( p.nodeType == 3 )
				{
					p = p.parentNode;
				}
				return p;
			}
			catch (ex)
			{
				return null;
			}
		}
	}


	function selectNodeContents (_iframe, node) {
		if (!node)
		{
			return;
		}
		_iframe.contentWindow.focus();
		_iframe.contentWindow.document.body.style.visibility = "hidden";
		_iframe.contentWindow.document.body.style.visibility = "visible";

		if ( is_IE )
		{
			var range;
			if (node.tagName && node.tagName.toLowerCase().match(/table|img|input|select|textarea/) )
			{
				range = _iframe.contentWindow.document.body.createControlRange();
				range.add(node);
			}
			else
			{
				range = _iframe.contentWindow.document.body.createTextRange();
				range.moveToElementText(node);
			}
			range.select();
		} else {
			var range;
			var sel = _iframe.contentWindow.getSelection();
			range = sel.getRangeAt(0);
			if (node.tagName && node.tagName.toLowerCase().match(/table|img|input|textarea|select/) )
			{
				range.selectNode(node);
			}
			else
			{
				 range.selectNodeContents(node);
			}
			sel.removeAllRanges();
			sel.addRange(range);
		}
		selectedNode = node;
		if (node.parentNode.tagName.toLowerCase() != "html")
		{
			removeButton = 3;
		} else {
			removeButton = 1;
		}
		updatePath(_iframe);
	}


	function removeTag(_iframe) {
		if (selectedNode && selectedNode.parentNode != null)
		{
			try {
				var len = selectedNode.childNodes.length;
				for (i=0; i < len ; i++)
				{ 
					selectedNode.parentNode.insertBefore( selectedNode.firstChild, selectedNode);
				}
				selectedNode.parentNode.removeChild(selectedNode);
				selectedNode = null;
				removeButton = 1;
			}catch (e) {}
		} 
		editorFocus(_iframe, 1); // �Ʒ� �ּ��� ���� (�±� ������ �������? | ����: ���)
		//updatePath(_iframe); 
	}


	// ��Ʈ ���̾�
	function getFontName(_iframe, buttonObj) {
		currentEditor = _iframe;
		var fontSelector = document.getElementById("fontSelector");
		fontSelector.style.left = getOffsetLeft(buttonObj) + 'px';
		fontSelector.style.top = getOffsetTop(buttonObj) + buttonObj.offsetHeight + 'px';
		fontSelector.style.display="";
	}

	function setFont(fontname) {
		currentEditor.contentWindow.document.execCommand("fontname",false,fontname);
		hideFontset();
		currentEditor.contentWindow.focus();
	}

	function hideFontset()
	{
		document.getElementById("fontSelector").style.display="none";
		hideFontSizeset();
	}

	function makeFontset() {
		if(document.getElementById("fontSelector") == null){
			var fontDiv = document.createElement("div");
			fontDiv.id = "fontSelector";
			fontDiv.unselectable = "on";
			fontDiv.style.width = "185px";
			fontDiv.style.display = "none";
			fontDiv.style.zIndex = 5;
			fontDiv.style.position = "absolute";
			fontDiv.style.border = "#9B9B9B 1px solid";

			var tablestr = '<table width=100% border="0" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF"><tr><td title="�ʱ�ȭ�� �����Ͻ� ������ ���� �����ϼž� �մϴ�. (IE ������ �۵�)" unselectable="on" align="center" valign="top" style="padding:4 0 2 0px"><a unselectable="on" href="javascript:;" onclick="setFont('+null+');"><font style="font-family:����; font-size:9pt;"unselectable="on" >�ʱ�ȭ</font></a></td></tr>';

			var optionList = config.fontOptions;
			for (var i = 0; i < optionList.length; i += 2)
			{
				tablestr += '<tr><td unselectable="on" align="center" valign="top" style="padding:2 0 2 0px"><a unselectable="on" href="javascript:;" onclick="setFont(\''+optionList[i]+'\');"><font style="font-family:'+optionList[i]+';font-size:9pt;" unselectable="on" >'+optionList[i + 1]+' (��,A,a,1)</font></a></td></tr>';
			}
			tablestr += '</table>';

			fontDiv.innerHTML = tablestr;
			document.body.appendChild(fontDiv);

			makeFontSizeset();
		}
	}


	// ��Ʈũ�� ���̾�
	function getFontSize(_iframe, buttonObj) {
		currentEditor = _iframe;
		var fontSizeSelector = document.getElementById("fontSizeSelector");
		fontSizeSelector.style.left = getOffsetLeft(buttonObj) + 'px';
		fontSizeSelector.style.top = getOffsetTop(buttonObj) + buttonObj.offsetHeight + 'px';
		fontSizeSelector.style.display="";
	}

	function setFontSize(fontsize) {
		if (config.freeFontSize)
		{
			setFontSizeFree(fontsize);
		} else {
			currentEditor.contentWindow.document.execCommand("fontsize",false,fontsize);
		}
		hideFontSizeset();
		currentEditor.contentWindow.focus();
	}


	function setFontSizeFree(fontsize){
		if (is_IE){
			 var sel = currentEditor.contentWindow.document.selection
		} else {
			var sel = currentEditor.contentWindow.getSelection();
		}
		var type = sel.type;
		if("Control" == type){
			   return;
		}
		var html = getSelectedHTML(currentEditor);
		if (document.getElementById('hiddenFontDiv') == null)
		{
			var tempdiv = document.createElement("div");
			tempdiv.id = "hiddenFontDiv";
			tempdiv.style.display = "none";
			document.body.appendChild(tempdiv);
		} else {
			var tempdiv = document.getElementById('hiddenFontDiv');
		}
		tempdiv.innerHTML = html;
		var eles = tempdiv.getElementsByTagName('*');
		var lng = eles.length;
		for (i=0; i < lng ; i++)
		{
			if (eles[i].nodeName == "FONT")
			{
				eles[i].size = null;
				eles[i].style.fontSize = fontsize;
			} 
			if (eles[i].nodeName != "BR" && eles[i].nodeName != "HR" && eles[i].nodeName != "UL" && eles[i].nodeName != "OL") {
				eles[i].style.fontSize = fontsize;
			}
		}
		var texts = tempdiv.childNodes;
		var lng1 =  texts.length;
		for (i=0; i < lng1 ; i++ )
		{
			if (texts[i].nodeType == 3)
			{
				var newspan = document.createElement('span');
				newspan.style.fontSize = fontsize;
				newspan.innerHTML = texts[i].nodeValue;
				texts[i].parentNode.replaceChild(newspan, texts[i]);
			}
		}
		var newhtml = " "+document.getElementById('hiddenFontDiv').innerHTML;
		if (newhtml != '')
		{
			if (is_IE)
			{	
				currentEditor.contentWindow.document.execCommand("delete", false, null);
				var range = sel.createRange();
				range.pasteHTML(newhtml);
			} else {
				currentEditor.contentWindow.document.execCommand("InsertHTML", false, newhtml);
			}
		}
		if (html == '' || newhtml == ''){
			alert('\n�������� ������ ũ�⸦ ������ ������ ������ �ּ���.\t\n\n(���콺 �巡�� �Ǵ� shift + ����Ű)');
		}
	}


	function hideFontSizeset()
	{
		document.getElementById("fontSizeSelector").style.display="none";
	}

	function makeFontSizeset() {
		if(document.getElementById("fontSizeSelector") == null){
			var fontSizeDiv = document.createElement("div");
			fontSizeDiv.id = "fontSizeSelector";
			fontSizeDiv.unselectable = "on";
			fontSizeDiv.style.width = "100px";
			fontSizeDiv.style.display = "none";
			fontSizeDiv.style.zIndex = 5;
			fontSizeDiv.style.position = "absolute";
			fontSizeDiv.style.border = "#9B9B9B 1px solid";

			var optionList = config.fontSizeOptions;

			if (config.freeFontSize)
			{
				var starti = 0;
			} else {
				var starti = 2;
			}

			var tablestr = '<table width=100% border="0" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF"><tr><td title="�ʱ�ȭ�� �����Ͻ� ������ ���� �����ϼž� �մϴ�. (IE ������ �۵�)" colspan=2 unselectable="on" align="center" valign="top" style="padding:4 0 2 0px"><a unselectable="on" href="javascript:;" onclick="setFontSize('+null+');"><font style="font-family:����; font-size:9pt;"unselectable="on" >�ʱ�ȭ</font></a></td></tr><tr>';

			var tdcont = 0;
			for (var i = starti; i < optionList.length; i += 2)
			{
				tablestr += '<td unselectable="on" align="center" valign="top" style="padding:2 0 2 0px"><a unselectable="on" href="javascript:;" onclick="setFontSize(\''+optionList[i]+'\');"><font style="font-family:����; font-size:9pt;"unselectable="on" >'+optionList[i + 1]+'</font></a></td>';

				if (i == (optionList.length - 2))
				{
					tablestr += '<td> </td>';
				}

				tdcont ++;
				if (tdcont == 2)
				{
					tablestr += '</tr><tr>';
					tdcont = 0;
				}
			}
			tablestr += '</tr></table>';

			fontSizeDiv.innerHTML = tablestr;
			document.body.appendChild(fontSizeDiv);
		}
	}


	// �÷���Ŀ
	var command, currentEditor;
	function getColor(_iframe, buttonObj, cmd) {
		currentEditor = _iframe;
		command = cmd;
		var colorSelector = document.getElementById("colorSelector");
		colorSelector.style.left = getOffsetLeft(buttonObj) + 'px';
		colorSelector.style.top = getOffsetTop(buttonObj) + buttonObj.offsetHeight + 'px';
		colorSelector.style.display="";
	}


	function hideColorPicker()
	{
		document.getElementById("colorSelector").style.display="none";
	}


	function previewColor(color) {
		document.getElementById("color_view").bgColor = color;
		document.getElementById("color_value").style.color = "#"+color;
		document.getElementById("color_value").value = color;
	}


	function chooseColor(color) {
		currentEditor.contentWindow.document.execCommand(command,false,color);
		hideColorPicker();
		editorFocus(currentEditor,2);
	}


	function makeColorset() {
		if(document.getElementById("colorSelector") == null){
			var colorDiv = document.createElement("div");
			colorDiv.id = "colorSelector";
			colorDiv.unselectable = "on";
			colorDiv.style.padding = "5px";
			colorDiv.style.display = "none";
			colorDiv.style.zIndex = 5;
			colorDiv.style.position = "absolute";
			colorDiv.style.backgroundColor = "#FFFFFF";
			colorDiv.style.border = "#9b9b9b 1px solid";
			colorDiv.align="center";

			colorDiv.innerHTML = '<table cellspacing="1" cellpadding="0" width="145" bgcolor="#000000" border="0"><tbody><tr height="11"><td style="cursor:pointer;" onmouseover="previewColor(\'FE1100\')" onclick="chooseColor(\'FE1100\');" bgcolor="#fe1100" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'FE4C24\')" onclick="chooseColor(\'FE4C24\');" bgcolor="#fe4c24" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'FE875A\')" onclick="chooseColor(\'FE875A\');" bgcolor="#fe875a" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'FECDA7\')" onclick="chooseColor(\'FECDA7\');" bgcolor="#fecda7" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'040967\')" onclick="chooseColor(\'040967\');" bgcolor="#040967" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'2D328D\')" onclick="chooseColor(\'2D328D\');" bgcolor="#2d328d" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'44499A\')" onclick="chooseColor(\'44499A\');" bgcolor="#44499a" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'686EB8\')" onclick="chooseColor(\'686EB8\');" bgcolor="#686eb8" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'007B1D\')" onclick="chooseColor(\'007B1D\');" bgcolor="#007b1d" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'2F9D4C\')" onclick="chooseColor(\'2F9D4C\');" bgcolor="#2f9d4c" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'8BCDA2\')" onclick="chooseColor(\'8BCDA2\');" bgcolor="#8bcda2" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'AEDEC1\')" onclick="chooseColor(\'AEDEC1\');" bgcolor="#aedec1" unselectable="on"></td></tr><tr height="11"><td style="cursor:pointer;" onmouseover="previewColor(\'6E0017\')" onclick="chooseColor(\'6E0017\');" bgcolor="#6e0017" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'7B243D\')" onclick="chooseColor(\'7B243D\');" bgcolor="#7b243d" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'834C6B\')" onclick="chooseColor(\'834C6B\');" bgcolor="#834c6b" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'987E95\')" onclick="chooseColor(\'987E95\');" bgcolor="#987e95" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'006BD4\')" onclick="chooseColor(\'006BD4\');" bgcolor="#006bd4" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'0087E1\')" onclick="chooseColor(\'0087E1\');" bgcolor="#0087e1" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'37B7FE\')" onclick="chooseColor(\'37B7FE\');" bgcolor="#37b7fe" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'A7DEFE\')" onclick="chooseColor(\'A7DEFE\');" bgcolor="#a7defe" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'FEFE00\')" onclick="chooseColor(\'FEFE00\');" bgcolor="#fefe00" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'FEFE03\')" onclick="chooseColor(\'FEFE03\');" bgcolor="#fefe03" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'FEFE9F\')" onclick="chooseColor(\'FEFE9F\');" bgcolor="#fefe9f" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'FEFED0\')" onclick="chooseColor(\'FEFED0\');" bgcolor="#fefed0" unselectable="on"></td></tr><tr height="11"><td style="cursor:pointer;" onmouseover="previewColor(\'4E003D\')" onclick="chooseColor(\'4E003D\');" bgcolor="#4e003d" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'6D2262\')" onclick="chooseColor(\'6D2262\');" bgcolor="#6d2262" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'926594\')" onclick="chooseColor(\'926594\');" bgcolor="#926594" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'C2A9C5\')" onclick="chooseColor(\'C2A9C5\');" bgcolor="#c2a9c5" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'005557\')" onclick="chooseColor(\'005557\');" bgcolor="#005557" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'03747B\')" onclick="chooseColor(\'03747B\');" bgcolor="#03747b" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'579D9F\')" onclick="chooseColor(\'579D9F\');" bgcolor="#579d9f" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'A2C6CC\')" onclick="chooseColor(\'A2C6CC\');" bgcolor="#a2c6cc" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'F45F00\')" onclick="chooseColor(\'F45F00\');" bgcolor="#f45f00" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'FE9739\')" onclick="chooseColor(\'FE9739\');" bgcolor="#fe9739" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'FECD8A\')" onclick="chooseColor(\'FECD8A\');" bgcolor="#fecd8a" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'FEE2B0\')" onclick="chooseColor(\'FEE2B0\');" bgcolor="#fee2b0" unselectable="on"></td></tr><tr height="11"><td style="cursor:pointer;" onmouseover="previewColor(\'1B0B73\')" onclick="chooseColor(\'1B0B73\');" bgcolor="#1b0b73" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'4C379D\')" onclick="chooseColor(\'4C379D\');" bgcolor="#4c379d" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'876EBA\')" onclick="chooseColor(\'876EBA\');" bgcolor="#876eba" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'BBBAEF\')" onclick="chooseColor(\'BBBAEF\');" bgcolor="#bbbaef" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'008E37\')" onclick="chooseColor(\'008E37\');" bgcolor="#008e37" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'26B168\')" onclick="chooseColor(\'26B168\');" bgcolor="#26b168" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'47BE80\')" onclick="chooseColor(\'47BE80\');" bgcolor="#47be80" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'76D3A2\')" onclick="chooseColor(\'76D3A2\');" bgcolor="#76d3a2" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'B31C00\')" onclick="chooseColor(\'B31C00\');" bgcolor="#b31c00" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'B03F21\')" onclick="chooseColor(\'B03F21\');" bgcolor="#b03f21" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'AE623A\')" onclick="chooseColor(\'AE623A\');" bgcolor="#ae623a" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'AC6E54\')" onclick="chooseColor(\'AC6E54\');" bgcolor="#ac6e54" unselectable="on"></td></tr><tr height="11"><td style="cursor:pointer;" onmouseover="previewColor(\'FFFFFF\')" onclick="chooseColor(\'FFFFFF\');" bgcolor="#fefefe" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'E6E6E6\')" onclick="chooseColor(\'E6E6E6\');" bgcolor="#e6e6e6" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'CDCDCD\')" onclick="chooseColor(\'CDCDCD\');" bgcolor="#cdcdcd" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'B4B4B4\')" onclick="chooseColor(\'B4B4B4\');" bgcolor="#b4b4b4" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'A8A8A8\')" onclick="chooseColor(\'A8A8A8\');" bgcolor="#a8a8a8" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'8D8D8D\')" onclick="chooseColor(\'8D8D8D\');" bgcolor="#8d8d8d" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'747474\')" onclick="chooseColor(\'747474\');" bgcolor="#747474" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'595959\')" onclick="chooseColor(\'595959\');" bgcolor="#595959" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'4B4B4B\')" onclick="chooseColor(\'4B4B4B\');" bgcolor="#4b4b4b" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'303030\')" onclick="chooseColor(\'303030\');" bgcolor="#303030" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'0A0A0A\')" onclick="chooseColor(\'0A0A0A\');" bgcolor="#0a0a0a" unselectable="on"></td><td style="cursor:pointer;" onmouseover="previewColor(\'000000\')" onclick="chooseColor(\'000000\');" bgcolor="#000000" unselectable="on"></td></tr></tbody></table><table cellspacing="0" cellpadding="0" width="145" border="0" bgcolor="#FFFFFF"><tbody><tr height=6><td colspan=3></td></tr><tr><td style="cursor:pointer;" unselectable="on"><input unselectable="on" readonly="readonly" id="color_value" style="BORDER-RIGHT: #cccccc 1px solid; BORDER-TOP: #cccccc 1px solid; BORDER-LEFT: #cccccc 1px solid; WIDTH: 57px; COLOR: #8d8d8d; BORDER-BOTTOM: #cccccc 1px solid; HEIGHT: 18px" maxlength="6" value="" name="color_value"/></td><td unselectable="on"><table height="18" cellspacing="1" cellpadding="0" width="51" bgcolor="#cccccc" border="0"><tbody><tr valign="center" align="middle" bgcolor="#ffffff"><td><table height="12" cellspacing="0" cellpadding="0" width="45" border="0" bgcolor="#FFFFFF"><tbody><tr><td id="color_view" unselectable="on"></td></tr></tbody></table></td></tr></tbody></table></td><td style="cursor:pointer;" align="right" onclick="hideColorPicker();" unselectable="on"><img unselectable="on" src="'+config.alditorPath+'images/ok.gif" border="0"/></td></tr></tbody></table></div>';

			document.body.appendChild(colorDiv);
		}
	}


	//���̶���Ʈ ��Ŀ
	function getHilite(_iframe, buttonObj) {
		currentEditor = _iframe;
		var hiliteSelector = document.getElementById("hiliteSelector");
		hiliteSelector.style.left = getOffsetLeft(buttonObj) + 'px';
		hiliteSelector.style.top = getOffsetTop(buttonObj) + buttonObj.offsetHeight + 'px';
		hiliteSelector.style.display="";
	}

	function hideHiliteSelector()
	{
		document.getElementById("hiliteSelector").style.display="none";
	}

	function chooseHilite(color1, color2, act) 
	{
		if (act == true)
		{
			currentEditor.contentWindow.document.execCommand("RemoveFormat",false,null);
			hideHiliteSelector();
			editorFocus(currentEditor,2);
			return;
		} else {
			if (color1)
			{
				currentEditor.contentWindow.document.execCommand("ForeColor", false, color1);
			}
			if (is_IE)
			{
				currentEditor.contentWindow.document.execCommand("BackColor", false, color2);
			} else {
				currentEditor.contentWindow.document.execCommand("Hilitecolor", false, color2);
			}
			hideHiliteSelector();
			editorFocus(currentEditor,1);
		}
	}

	function makeHiliteset() {
		if(document.getElementById("hiliteSelector") == null){
			var hiliteDiv = document.createElement("div");
			hiliteDiv.id = "hiliteSelector";
			hiliteDiv.unselectable = "on";
			hiliteDiv.style.padding = "5px";
			hiliteDiv.style.display = "none";
			hiliteDiv.style.zIndex = 5;
			hiliteDiv.style.width = "154px";
			hiliteDiv.style.position = "absolute";
			hiliteDiv.style.backgroundColor = "#FFFFFF";
			hiliteDiv.style.border = "#9b9b9b 1px solid";
			hiliteDiv.align="center";

			hiliteDiv.innerHTML = '<table width=100% border="0" cellpadding="0" cellspacing="2" bgcolor="#FFFFFF" style="cursor:pointer; table-layout:fixed" unselectable="on"><tr height=16><td unselectable="on" style="font-size:8pt; padding: 1px;  background-color:#ffff00; color:#000000" onclick="chooseHilite(\'000000\', \'FFFF00\')"> ���ƴ޾Ƹ���</td><td unselectable="on" style=" font-size:8pt; padding: 1px; background-color:#ffff00; color:#FE1100" onclick="chooseHilite(\'FE1100\', \'FFFF00\')"> ���ƴ޾Ƹ���</td></tr><tr height=16><td unselectable="on" style="font-size:8pt; padding: 1px;  background-color:#000000; color:#ffffff" onclick="chooseHilite(\'FFFFFF\', \'000000\')"> ���ƴ޾Ƹ���</td><td unselectable="on" style=" font-size:8pt; padding: 1px; background-color:#000000; color:#fe1100" onclick="chooseHilite(\'FE1100\', \'000000\')"> ���ƴ޾Ƹ���</td></tr><tr height=16><td unselectable="on" style="font-size:8pt; padding: 1px;  background-color:#000000; color:#ffff00" onclick="chooseHilite(\'FFFF00\', \'000000\')"> ���ƴ޾Ƹ���</td><td unselectable="on" style=" font-size:8pt; padding: 1px; background-color:#fe1100; color:#ffffff" onclick="chooseHilite(\'FFFFFF\', \'FE1100\')"> ���ƴ޾Ƹ���</td></tr><tr height=16><td unselectable="on" style=" font-size:8pt; padding: 1px;  background-color:#2f9d4c; color:#ffffff" onclick="chooseHilite(\'FFFFFF\', \'2F9D4C\')"> ���ƴ޾Ƹ��� </td><td unselectable="on" style=" font-size:8pt; padding: 1px;  background-color:#006bd4; color:#ffffff"onclick="chooseHilite(\'FFFFFF\', \'006BD4\')"> ���ƴ޾Ƹ���</td></tr><tr height=16><td unselectable="on" style="font-size:8pt; padding: 1px; background-color:#8d8d8d; color:#ffffff" onclick="chooseHilite(\'FFFFFF\', \'8D8D8D\')"> ���ƴ޾Ƹ���</td><td unselectable="on" style=" font-size:8pt; padding: 1px; background-color:#926594; color:#ffffff" onclick="chooseHilite(\'FFFFFF\', \'926594\')"> ���ƴ޾Ƹ���</td></tr><tr height=16><td colspan=2 unselectable="on" align="center" ><span style=" width: 100%; background-color: #EEEEEE; font-size:8pt; padding: 1px; " unselectable="on" onclick="chooseHilite(null,null,true);">���� ȿ�� ����</span></td></tr></table>';

			document.body.appendChild(hiliteDiv);
		}
	}



	// ���̺� ����Ŀ
	function showTableset(_iframe, buttonObj) {
		currentEditor = _iframe;
		var tableCreator = document.getElementById("tableCreatorDiv");
		tableCreator.style.left = getOffsetLeft(buttonObj) + 'px';
		tableCreator.style.top = getOffsetTop(buttonObj) + buttonObj.offsetHeight + 'px';
		tableCreator.style.display="";
	}


	function hideTableset() {
		document.getElementById('tableCreatorDiv').style.display = 'none';
	}


	function makeTableset()
	{
		var rows = 5;
		var cols = 7;

		if(document.getElementById("tableCreatorDiv") == null){
			var tablesetDiv = document.createElement("div");
			tablesetDiv.style.border = "#CCCCCC 1px solid";
			tablesetDiv.style.width = "145px";
			tablesetDiv.style.display = "none";
			tablesetDiv.style.position = "absolute";
			tablesetDiv.style.zIndex = 5;
			tablesetDiv.style.backgroundColor = "#FFFFFF";
			tablesetDiv.id = "tableCreatorDiv";
			tablesetDiv.unselectable = "on";
				
				var tablesetTable =  document.createElement("table");
				tablesetTable.width = "100%";
				tablesetTable.cellSpacing = 2;
				tablesetTable.cellPadding = 0;
				tablesetTable.border = 0;
				tablesetTable.style.tableLayout = "fixed";
				tablesetTable.style.cursor = "pointer";
				tablesetTable.id = "tableCreator";

					var tbody = document.createElement("tbody");

						for (i=0; i < rows ; i++ )
						{
							var row = document.createElement("TR");
							row.height = 12;

							for (ii=0; ii< cols ; ii++)
							{
								var col = document.createElement("TD");
								col.style.border = "#CCCCCC 1px solid";
								col.style.fontSize = "12px";
								col.unselectable = "on";
								col.onclick = new Function('createTable(' + (i + 1) + ',' + (ii + 1) + ')');
								col.onmouseover = new Function('createTableHover(' + (i + 1) + ',' + (ii + 1) + ')');
								col.innerHTML = "&nbsp;";
								
								row.appendChild(col);
							}
							tbody.appendChild(row);
						}
				tablesetTable.appendChild(tbody);

			tablesetDiv.appendChild(tablesetTable);
			document.body.appendChild(tablesetDiv);
		}
	}


	function createTableHover(row, col)
	{
		var table = document.getElementById('tableCreator');
		var tableRow = table.firstChild.childNodes;
		
		for (var i = 0; i < tableRow.length; i++) {
			for (var j = 0; j <tableRow[i].childNodes.length; j++) {
				tableRow[i].childNodes[j].bgColor = (i < row && j < col) ? '#B4D2DE' : '#FFFFFF';
			}
		}
	}


	function createTable(rows,cols)
	{
		var tableHtml = '<table width="100%" cellspacing="0" cellpadding="0" border="1" bordercolor="#FFFFFF" bordercolordark="#FFFFFF" bordercolorlight="#CCCCCC">';
		for (var i = 0; i < rows; i++) {
			tableHtml += '<tr>';
			for (var j = 0; j < cols; j++) {
				tableHtml += '<td>&nbsp;</td>';
			}
		}
		tableHtml += '</table>';
		
		currentEditor.contentWindow.focus();

		if (is_IE)
		{
			currentEditor.contentWindow.document.selection.createRange().pasteHTML(tableHtml);
		} else {
			currentEditor.contentWindow.document.execCommand("InsertHTML", false, tableHtml);
		}

		hideTableset();
	}


	// �迭 ����
	Array.prototype.inArray = function (value)
	{
		var i;
		for (i=0; i < this.length; i++) {
			if (this[i] === value) {
				return true;
			}
		}
		return false;
	};


	// �̺�Ʈ ����
	function addEvent(elm, evType, fn) {
		if (elm.addEventListener) {
			elm.addEventListener(evType, fn, false);
			return true;
		} else if (elm.attachEvent) {
			var r = elm.attachEvent('on' + evType, fn);
			return r;
		} else {
			elm['on' + evType] = fn;
		}
	};


	function removeEvent(elm, evType, fn, useCapture) {
		if (elm.removeEventListener) {
			elm.removeEventListener(evType, fn, useCapture);
			return true;
		} else if (elm.detachEvent) {
			var r = elm.detachEvent('on' + evType, fn);
			return r;
		} else {
			elm['on' + evType] = null;
		}
	};


	function cancelDefault(e) {
		if (e && e.preventDefault)
		e.preventDefault();
		else if (window.event)
		window.event.returnValue = false;
	};

	function noPropagation(e) {
		if (e && e.stopPropagation) 
			e.stopPropagation();
		else if (window.event) 
			window.event.cancelBubble = true;
	}

	// �˾�����
	function popWin(url, w, h, _iframe, forcePop) {
		if (is_IE && !forcePop)
		{
			var newObject = new Object();
			newObject._path = config.alditorPath;
			newObject._iframe = _iframe;
			newObject._uploadLink = config.uploadLink;
			var win = window.showModalDialog(url, newObject,"dialogHeight: "+h+"px; dialogWidth: "+w+"px; edge: Raised; center: Yes; help: No; resizable: No; status: No;");
		} else {
			var param = getCenterWinStr(w, h);
			var win = window.open(url, "popWin", param+",menubar=no,scrollbars=auto,statusbar=yes, resizable=yes");
			win.focus();
		}
		return win;
	}


	function getCenterWinStr(width, height) {
		var str = "";
		str = "height=" + height + ",innerHeight=" + height;
		str += ",width=" + width + ",innerWidth=" + width;
		if (window.screen) {
			var ah = screen.availHeight - 30;
			var aw = screen.availWidth - 10;
			var xc = (aw - width) / 2;
			var yc = (ah - height) / 2;
			str += ",left=" + xc + ",screenX=" + xc;
			str += ",top=" + yc + ",screenY=" + yc;
		}
		return str;
	}


	// ��ġ����
	function getOffsetTop(elm) {
		var mOffsetTop = elm.offsetTop;
		var mOffsetParent = elm.offsetParent;
		while(mOffsetParent){
			mOffsetTop += mOffsetParent.offsetTop;
			mOffsetParent = mOffsetParent.offsetParent;
		}
		return mOffsetTop;
	}


	function getOffsetLeft(elm) {
		var mOffsetLeft = elm.offsetLeft;
		var mOffsetParent = elm.offsetParent;
		while(mOffsetParent){
			mOffsetLeft += mOffsetParent.offsetLeft;
			mOffsetParent = mOffsetParent.offsetParent;
		}
		return mOffsetLeft;
	}


	// �������
	function copyContent(str)
	{
		if (confirm("�ۼ��Ͻ� ������ HTML�ҽ��� Ŭ�����忡 ���� �Ͻðڽ��ϱ�?\n\n�ٽ� �ۼ��� �ҽ�â�� �ٿ��ֱ�(Ctrl + V) �ϽǼ� �ֽ��ϴ�."))
		{
			if (document.selection)
			{
				bResult = window.clipboardData.setData("Text",str);
				if (bResult) alert('Ŭ�����忡 ����Ǿ����ϴ�.');
			} else {
				str = encodeforFlash(str);
				var flashcopier = 'flashcopier';
				if(!document.getElementById(flashcopier)) {
					var divholder = document.createElement('div');
					divholder.id = flashcopier;
					document.body.appendChild(divholder);
				}
				document.getElementById(flashcopier).innerHTML = '';
				var divinfo = '<embed src="'+config.alditorPath+'images/_clipboard.swf" FlashVars="clipboard='+str+'" width="1" height="1" type="application/x-shockwave-flash"></embed>';
				document.getElementById(flashcopier).innerHTML = divinfo;
				alert('Ŭ�����忡 ����Ǿ����ϴ�.');
			}
		}
	};


	function encodeforFlash(str)
	{
		var SAFECHARS = "0123456789" +
						"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
						"abcdefghijklmnopqrstuvwxyz" +
						"-_.!~*'()";
		var HEX = "0123456789ABCDEF";

		var plaintext = str;
		var encoded = "";
		for (var i = 0; i < plaintext.length; i++ ) {
			var ch = plaintext.charAt(i);
			if (ch == " ") {
				encoded += "+";
			} else if (SAFECHARS.indexOf(ch) != -1) {
				encoded += ch;
			} else {
				var charCode = ch.charCodeAt(0);
				if (charCode > 255) {
					encoded += ch; //�ѱ��� ���
				} else {
					encoded += "%";
					encoded += HEX.charAt((charCode >> 4) & 0xF);
					encoded += HEX.charAt(charCode & 0xF);
				}
			}
		} // for

		return encoded;
	};


	//���� ���� ����
	function killerror(){
		return true;
	}

	if (config.killError)
	{
		window.onerror = killerror;
	}


	////ajax ����..
	function getHTTPObject() {
	  var xmlhttp;
	  /*@cc_on
	  @if (@_jscript_version >= 5)
		try {
		  xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
		  try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		  } catch (E) {
			xmlhttp = false;
		  }
		}
	  @else
	  xmlhttp = false;
	  @end @*/
	  if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
		try {
		  xmlhttp = new XMLHttpRequest();
		} catch (e) {
		  xmlhttp = false;
		}
	  }
	  return xmlhttp;
	}
	var http = getHTTPObject();