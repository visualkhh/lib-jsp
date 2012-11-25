<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>[##_title_##] - [##_page_title_##]</title>
<link rel="alternate" type="application/rss+xml" title="[##_title_##]" href="[##_rss_url_##]">
<link href="./style.css" rel="stylesheet" type="text/css">
<link rel="shortcut icon" href="[##_blog_link_##]favicon.ico" />
<script language="JavaScript">
function allblur() {
  for (i = 0; i < document.links.length; i++) {
    var obj = document.links[i];
    if(obj.addEventListener) obj.addEventListener("focus", oneblur, false);
    else if(obj.attachEvent) obj.attachEvent("onfocus", oneblur);
  }
}
 
function oneblur(e) {
  var evt = e ? e : window.event;
  if(evt.target) evt.target.blur();
  else if(evt.srcElement) evt.srcElement.blur();
}
function clickshow(num){
	menu = document.getElementById("block"+num);
	if( menu != null && typeof menu != "undefined" )
		{
			if (menu.style.display=="block"){
			menu.style.display="none"; //닫고
		}
	else{
		menu.style.display="block";//하위메뉴를 펼친다.
		}
	}
}
</script>
</head>
<body onload="allblur()">
<s_t3>
  <!-- #### Container Start #### -->
  <div id="container">
    <!-- #### Header Start #### -->
    <div id="header-wrapper">
	    <div id="header">
	      <div class="header_title"><a href="[##_blog_link_##]"><!--img src="./images/topLogo.gif" alt="[##_title_##]" /-->[##_title_##]
	        </a></div>
	      <div class="blog_info">[##_desc_##]</div>
	    </div>
    </div>
    <div class="top_menu"><a href="[##_localog_link_##]">Location</a> | <a href="[##_taglog_link_##]">Tag</a> | <a href="[##_blog_link_##]media">Media</a> | <a href="[##_guestbook_link_##]"><font color="#FF6600">Guest Book</font></a> &nbsp;||&nbsp; <a href="[##_owner_url_##]"><font color="#000000">A</font></a> | <a href="[##_blog_link_##]owner/entry/post"><font color="#0066CC">P</font></a></div>
    
    <!-- #### Header End #### -->
    <!-- #### Side Start #### -->
    <div id="side">
      <!-- Blog infomation -->
      <div class="sidebar_title1">ABOUT ME</div>
      <img alt='My Photo' class='profile-img' height='80' src="[##_image_##]" width='67'/>
      <dl class='profile-datablock'>
            <dt class='profile-data'>CAPRISONG</dt>
      </dl>
      <a class='profile-link' href="http://www.songminu.com" target="new">PROFILE</a>
      <div class="sidebar_title1">&nbsp;</div>
      <div class="sidebar_title1">&nbsp;</div>
      <!-- CATEGORY	-->
      <div class="sidebar_title" onclick="clickshow(2)">CATEGORY</div>
      <div class="td_info" id="block2" style="display:block;">
        <div>[##_category_##]</div>
      </div>
      <div class="sidebar_title" onclick="clickshow(3)">TAGS</div>
      <div class="td_info" id="block3" style="display:block;">
        <s_random_tags><a href="[##_tag_link_##]" class="[##_tag_class_##]">[##_tag_name_##]</a> </s_random_tags>
      </div>
      <!-- RECENT COMMENTS	-->
      <div class="sidebar_title" onclick="clickshow(5)">Recent Comments</div>
      <div class="td_info" id="block5" style="display:block;">
        <div id="recentComments">
          <s_rctrp_rep> <a href="[##_rctrp_rep_link_##]" class="info_link"> [##_rctrp_rep_desc_##]</a><br>
            <span class="f11 gray3">[##_rctrp_rep_time_##] - [##_rctrp_rep_name_##]</span><br>
          </s_rctrp_rep>
        </div>
      </div>
      <!-- LINK SITES	-->
      <div class="sidebar_title" onclick="clickshow(9)">Link Site</div>
      <div class="td_info" id="block9" style="display:none;">
        <s_link_rep> <a href="[##_link_url_##]" target="_blank" class="info_link"> [##_link_site_##]</a><br>
        </s_link_rep>
      </div>
      <!-- Connect Statistics	-->
      <div class="side_counter"><font color="#3675B3">[##_count_total_##]</font> Visitors up to today!<br />
        Today <font color="#9E9E9E">[##_count_today_##]</font> hit, Yesterday <font color="#9E9E9E">[##_count_yesterday_##]</font> hit </div>
      <div class="side_button"><img src="./images/crossbrowsing.gif"></div><br/>
      <!-- Search	-->
      <div class="s_search">
        <s_search>
          <input type="text" class="search_input" name="[##_search_name_##]" value="[##_search_text_##]"  onkeypress="if (event.keyCode == 13) { [##_search_onclick_submit_##] }"/>
          <input value="Search" type="button" onclick="[##_search_onclick_submit_##]" class="submit"/>
        </s_search>
      </div>
      <!-- Sidebar End	-->
      </div>
      
    <!-- #### Side End #### -->
    <!-- #### Main Start #### -->
    <div id="contents">
      <div id="mainShadow">
        <div id="main">
          <div class="mainInsideBox">
            <!-- tag -->
            <s_tag>
              <div class="head_title tagHead">태그 목록</div>
              <div class="tag_cloud">
                <s_tag_rep> <a href="[##_tag_link_##]" class="[##_tag_class_##]">[##_tag_name_##]</a> </s_tag_rep>
              </div>
            </s_tag>
            <!-- search list -->
            <s_list>
              <div class="head_title">'[##_list_conform_##]'에 해당되는 글 [##_list_count_##]건</div>
              <div class="list_box">
                <s_list_rep>
                  <div class="list"><a href="[##_list_rep_link_##]">[##_list_rep_title_##] <span class="date">[##_list_rep_rp_cnt_##] | [##_list_rep_regdate_##]</span></a></div>
                </s_list_rep>
              </div>
            </s_list>
            <!-- search reply list -->
            <s_rplist>
              <div class="head_title">'[##_rplist_conform_##]'에 해당되는 댓글 [##_rplist_count_##]건</div>
              <s_rplist_rep>
                <div class="rplist_box">
                  <div class="name"><a href="[##_rplist_rep_link_##]">[##_rplist_rep_name_##]</a> <span class="date">| [##_rplist_rep_regdate_##]</span></div>
                  <div class="rplist"><a href="[##_rplist_rep_link_##]">[##_rplist_rep_body_##]</a></div>
                </div>
              </s_rplist_rep>
            </s_rplist>
            <!-- location -->
            <s_local>
              <div class="head_title localHead">위치 로그</div>
              <div id="location">
                <s_local_spot_rep>
                  <div class="location_spot" style="margin-left: [##_local_spot_depth_##]px">ㆍ[##_local_spot_##]
                    <s_local_info_rep>
                      <div class="location_info" style="margin-left: [##_local_info_depth_##]px"><a href="[##_local_info_link_##]">＃ [##_local_info_title_##]</a></div>
                    </s_local_info_rep>
                  </div>
                </s_local_spot_rep>
              </div>
            </s_local>
            <!-- guestbook -->
            <s_guest>
              <div class="head_title guestHead">그대가 던지는 사랑의 그물... </div>
              <div class="guestbook_form_box">
                <s_guest_member>
                  <s_guest_form>
                    <input type="text" id="guestName" name="[##_guest_input_name_##]" value="[##_guest_name_##]" class="form_input" style="width:160px;" />
                    Name<br />
                    <input type="password" maxlength="8" id="guestPassword" name="[##_guest_input_password_##]" value="[##_guest_password_##]" class="form_input" style="width:160px;" />
                    Password <br />
                    <input type="text" id="guestHomepage" name="[##_guest_input_homepage_##]" value="[##_guest_homepage_##]" class="form_input" style="width:300px;" />
                    Homepage </s_guest_form>
                  <br />
                  <div class="secret">
                    <input type="checkbox" id="[##_guest_input_is_secret_##]" align="absmiddle" />
                    Secret</div>
                </s_guest_member>
                <textarea cols="60" rows="6" id="guestBody" name="[##_guest_textarea_body_##]" class="form_textarea"></textarea>
                <input type="button" value=" Save a Comment " onclick="[##_EmailAction_##][##_guest_onclick_submit_##]" class="form_submit" />
              </div>
              <!-- guestbook list -->
              <s_guest_rep>
                <div class="box"> <span class="name">[##_guest_rep_name_##]</span> <span class="opt">| [##_guest_rep_date_##] | <a href="#" onclick="[##_guest_rep_onclick_delete_##]">EDIT/DEL</a> | <a href="#" onclick="[##_guest_rep_onclick_reply_##]">REPLY</a></span><br />
                  <div class="desc">[##_guest_rep_desc_##]</div>
                  <s_guest_reply_rep>
                    <div class="reply_box"> <span class="name">[##_guest_rep_name_##]</span> <span class="opt">| [##_guest_rep_date_##] | <a href="#" onclick="[##_guest_rep_onclick_delete_##]">EDIT/DEL</a></span><br />
                      <div class="desc">[##_guest_rep_desc_##]</div>
                    </div>
                  </s_guest_reply_rep>
                </div>
              </s_guest_rep>
            </s_guest>
            <!-- notice -->
            <s_notice_rep>
              <div class="head_title noticeHead"><a href="[##_notice_rep_link_##]">[##_notice_rep_title_##]</a> </div>
              <div class="notice_date">[##_notice_rep_date_##]</div>
              <div class="article">[##_notice_rep_desc_##]</div>
            </s_notice_rep>
            <!-- pretected entries -->
            <s_article_protected>
              <div class="head_title articleHead protected">[##_article_rep_title_##]</div>
              <div class="info">[보호되어 있는 글입니다. 비밀번호를 입력해 주세요.]</div>
              <p align="center" class="tb_name">Secret Entry! Enter Password <br />
                <input type="password" maxlength="16" id="[##_article_password_##]" name="[##_article_password_##]" value="" onkeydown="if (event.keyCode == 13) [##_article_dissolve_##]" class="form_input" style="width:120px;" />
                <input type="button" class="form_submit" style="width:80px;height:18px;" value=" Submit " onclick="[##_article_dissolve_##]" />
              </p>
              <br />
              <br />
            </s_article_protected>
            <!-- entries -->
            <s_article_rep>
              <div class="head_title articleHead"><a href="[##_article_rep_link_##]">[##_article_rep_title_##]</a></div>
              <div class="date">[##_article_rep_date_##]</div>
              <div class="info">[<a href="[##_article_rep_category_link_##]">[##_article_rep_category_##]</a>]</div>
              <s_ad_div>
                <div class="owner"><a href="[##_s_ad_m_link_##]">수정</a> : <a href="#" onclick="[##_s_ad_m_onclick_##]">수정(창으로)</a> / <a href="#" onclick="[##_s_ad_d_onclick_##]">삭제</a> / <a href="#" onclick="[##_s_ad_t_onclick_##]">트랙백 등록</a> / <a href="#" onclick="[##_s_ad_s2_onclick_##]">[##_s_ad_s2_label_##]</a></div>
              </s_ad_div>
              <div class="article">[##_article_rep_desc_##]</div>
              <!-- tag label, trackback, comment -->
<div class="article_bottom">
                <s_tag_label>
                  <div class="tag_box">[##_tag_label_rep_##]</div>
                </s_tag_label>
                <div class="tb_cmt_btn"><a href="#tb" onclick="[##_article_rep_tb_link_##]">Trackback[##_article_rep_tb_cnt_##]</a> : <a href="#rp" onclick="[##_article_rep_rp_link_##]">Comment<font class="sthm">[##_article_rep_rp_cnt_##]</font></a></div>
              </div>
              <!-- trackback -->
              <s_tb>
                <div class="tb_address">Trackback Address :: [##_tb_address_##]</div>
                <s_tb_rep>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td class="tb_list_box"><div class="tb_title"><a href="[##_tb_rep_url_##]" onclick="window.open(this.href); return false">[##_tb_rep_title_##]</a></div>
                        <div class="opt"><span class="tb_name">Tracked from <a href="[##_tb_rep_url_##]" onclick="window.open(this.href); return false">[##_tb_rep_site_##]</a></span> | [##_tb_rep_date_##] | <a href="#" onclick="[##_tb_rep_onclick_delete_##]; return false">DEL</a></div>
                        <div class="desc">[##_tb_rep_desc_##]</div></td>
                    </tr>
                  </table>
                </s_tb_rep>
              </s_tb>
              <!-- comment -->
              <s_rp>
                <div class="cmt_box">
                  <s_rp_rep>
                    <div class="box"> <span class="name">[##_rp_rep_name_##]</span> <span class="opt">| [##_rp_rep_date_##] | <a href="[##_rp_rep_link_##]">PERMALINK</a> | <a href="#" onclick="[##_rp_rep_onclick_delete_##]">EDIT/DEL</a> | <a href="#" onclick="[##_rp_rep_onclick_reply_##]">REPLY</a></span><br />
                      <div class="desc">[##_rp_rep_desc_##]</div>
                      <s_rp2_rep>
                        <div class="reply_box"> <span class="name">[##_rp_rep_name_##]</span> <span class="opt">| [##_rp_rep_date_##] | <a href="[##_rp_rep_link_##]">PERMALINK</a> | <a href="#" onclick="[##_rp_rep_onclick_delete_##]">EDIT/DEL</a></span><br />
                          <div class="desc">[##_rp_rep_desc_##]</div>
                        </div>
                      </s_rp2_rep>
                    </div>
                  </s_rp_rep>
                </div>
                <!-- comment write-->
                <div class="cmt_form_box">
                  <s_rp_member>
                    <s_rp_guest>
                      <input type="text" id="name_[##_article_rep_id_##]" name="[##_rp_input_name_##]" value="[##_guest_name_##]" class="form_input" style="width:160px;" />
                      Name<br />
                      <input type="password" maxlength="8" id="password_[##_article_rep_id_##]" name="[##_rp_input_password_##]" value="[##_rp_admin_check_##]" class="form_input" style="width:160px;" />
                      Password <br />
                      <input type="text" id="homepage_[##_article_rep_id_##]" name="[##_rp_input_homepage_##]" value="[##_guest_homepage_##]" class="form_input" style="width:300px;" />
                      Homepage</s_rp_guest>
                    <br />
                    <div class="secret">
                      <input type="checkbox" id="secret_[##_article_rep_id_##]" name="[##_rp_input_is_secret_##]" align="absmiddle" />
                      Secret</div>
                  </s_rp_member>
                  <textarea cols="100%" rows="6" id="comment_[##_article_rep_id_##]" name="[##_rp_input_comment_##]" class="form_textarea"></textarea>
                  <input type="button" value=" Save a Comment " onclick="[##_EmailAction_##][##_rp_onclick_submit_##]" class="form_submit" />
                </div>
              </s_rp>
            </s_article_rep>
            <!-- paging -->
            <s_paging>
             <table class="paging">
             	<tr>
             		<td>
	             		<a [##_prev_page_##]><img src="./images/page_prev.gif" alt=prev"" border="0" /></a>
	               		<s_paging_rep> <a [##_paging_rep_link_##]>[##_paging_rep_link_num_##]</a> </s_paging_rep>
	             		<a [##_next_page_##]><img src="./images/page_next.gif" border="0" alt="next" /></a>
             		</td>
             	</tr>
             </table>                             
            </s_paging>
          </div>
        </div>
      </div>
      <!-- #### Main End #### -->
      <div id="footer">
        <div class="menu"><a href="[##_localog_link_##]">Location</a> : <a href="[##_taglog_link_##]">Tag</a> : <a href="[##_blog_link_##]media">Media</a> : <a href="[##_guestbook_link_##]">GuestBook</a> : <a href="[##_owner_url_##]">Admin</a> </div>
        <div class="copy">Powered by <a href="http://www.daum.net" onclick="window.open(this.href); return false">Daum</a> /
          Designed by <a href="http://daisy.pe.kr" onclick="window.open(this.href); return false">Daisy</a></div>
      </div>
    </div>
  </div>
  <!-- #### Container End #### -->
</s_t3>
</body>
</html>
    