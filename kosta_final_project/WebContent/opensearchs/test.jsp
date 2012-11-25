<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html> 
<head> 

<body> 

<div align="center" id=desc><center><h3>필터를 적용하려면 아래 링크를 클릭 해 보세요</h3></center><span id=fcode>현재는 필터가 적용되지 않은 상태 입니다</span></div> 
<br><center> 

<span id=flink onmouseover="this.style.color='red'"; onmouseout="this.style.color='0000ff'"; onclick="theImg.style.filter='alpha(opacity=50,)'; desc.innerHTML='Alpha: alters the opacity of an object, allowing it to blend with the background.<br><span id=fcode>filter: alpha(opacity=50)</span>';">alpha</span>?

<span id=flink onmouseover="this.style.color='red'"; onmouseout="this.style.color='0000ff'"; onclick="theImg.style.filter='blur(direction=45, strength=5, add=0)'; desc.innerHTML='Motion Blur: blurs an object with the direction and strength specified.<br><span id=fcode>filter: blur(direction=45, strength=5, add=0)</span>';">blur</span>?

<span id=flink onmouseover="this.style.color='red'"; onmouseout="this.style.color='0000ff'"; onclick="theImg.style.filter='dropshadow(offx=-4, offy=3, color=#9cf)'; desc.innerHTML='Drop Shadow: creates a shadow of the object at a specified x-y offset and color.<br><span id=fcode>filter: dropshadow(offx=-4, offy=3, color=#9cf)</span>';">dropShadow</span>?

<span id=flink onmouseover="this.style.color='red'"; onmouseout="this.style.color='0000ff'"; onclick="theImg.style.filter='fliph()'; desc.innerHTML='Flip Horizontal: flips the visible pixels in the horizontal axis.<br><span id=fcode>filter: fliph()</span>';">flipH</span>?

<span id=flink onmouseover="this.style.color='red'"; onmouseout="this.style.color='0000ff'"; onclick="theImg.style.filter='flipv()'; desc.innerHTML='Flip Vertical: flips the visible pixels in the vertical axis.<br><span id=fcode>filter: flipv()</span>';">flipV</span>?

<span id=flink onmouseover="this.style.color='red'"; onmouseout="this.style.color='0000ff'"; onclick="theImg.style.filter='glow(strength=3, color=orange)'; desc.innerHTML='Glow: creates a glow around the opaque pixels of an object.<br><span id=fcode>filter: glow(strength=3, color=orange)</span>';">glow</span>?

<span id=flink onmouseover="this.style.color='red'"; onmouseout="this.style.color='0000ff'"; onclick="theImg.style.filter='gray()'; desc.innerHTML='Grayscale: converts the visible pixels to 256 shades of gray.<br><span id=fcode>filter: gray()</span>';">gray</span>?

<span id=flink onmouseover="this.style.color='red'"; onmouseout="this.style.color='0000ff'"; onclick="theImg.style.filter='invert()'; desc.innerHTML='Invert: maps the pixels to their opposite value in the color spectrum.<br><span id=fcode>filter: invert()</span>';">invert</span>?

<span id=flink onmouseover="this.style.color='red'"; onmouseout="this.style.color='0000ff'"; onclick="theImg.style.filter='mask(color=olive)'; desc.innerHTML='Mask: turns transparent pixels to a specified color and opaque pixels transparent.<br><span id=fcode>filter: mask(color=olive)</span>';">mask</span>?

<span id=flink onmouseover="this.style.color='red'"; onmouseout="this.style.color='0000ff'"; onclick="theImg.style.filter='shadow(color=silver, direction=135)'; desc.innerHTML='Shadow: creates an attenuated shadow in the direction and color specified.<br><span id=fcode>filter: shadow(color=silver, direction=135)</span>';">shadow</span>?

<span id=flink onmouseover="this.style.color='red'"; onmouseout="this.style.color='0000ff'"; onclick="theImg.style.filter='wave(freq=4, strength=9, phase=0, lightstrength=0, add=0)'; desc.innerHTML='Wave: applies a sine wave deformation to an object.<br><span id=fcode>filter: wave(freq=4, strength=9, phase=0, lightstrength=0, add=0)</span>';">wave</span>?

<span id=flink onmouseover="this.style.color='red'"; onmouseout="this.style.color='0000ff'"; onclick="theImg.style.filter='xray()'; desc.innerHTML='Xray: grayscales and flattens the color depth.<br><span id=fcode>filter: xray()</span>';">xray</a></span></div> 
<br> 

<div style="width:100%" align="center" id=theImg> 
<h4><a href="http://bizserver.new21.net">자바스크립트 소스뱅크 </a></h4> 
<a href="http://bizserver.new21.net"><img src="homer.jpg" hspace=10 vspace=10></a><br> 

<button onclick="theImg.style.filter=''; desc.innerHTML='링크를 클릭 해 보세요<br><span id=fcode>no filter applied</span>';">Clear Filter</button> 

</div> 


</body> 
</html> 
