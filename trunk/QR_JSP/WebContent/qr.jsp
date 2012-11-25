<%@ page language="java" contentType="image/png"%>


<%@page import="javax.imageio.ImageIO"%>
<%@page import="java.io.ByteArrayOutputStream"%>
<%@ page import="com.google.zxing.BarcodeFormat" %>
<%@ page import="com.google.zxing.client.j2se.MatrixToImageWriter" %>
<%@ page import="com.google.zxing.common.BitMatrix" %>
<%@ page import="com.google.zxing.qrcode.QRCodeWriter" %>
<%@ page import="java.io.File" %>
<%@ page import="java.io.FileOutputStream" %>
<%@ page import="java.awt.image.BufferedImage" %>
<%
QRCodeWriter q = new QRCodeWriter();
try {
    //String text = "arkjsdfjkgjk|fjvjdjvjdfj|dejkkigk|534543534@#$%@#$|dfrdfkdvkl";
    String text = "김개똥|헬로|534543534@#$%@#$|dfrdfkdvkl";
    text = new String(text.getBytes("UTF-8"), "ISO-8859-1");
    BitMatrix bitMatrix = q.encode(text, BarcodeFormat.QR_CODE, 500, 500);
    
    BufferedImage is =  MatrixToImageWriter.toBufferedImage(bitMatrix);
    
    //MatrixToImageWriter.writeToStream(bitMatrix, "png", new FileOutputStream(new File("c:\\testqrcode.png")));
    
    
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    ImageIO.write(is, "png", baos);
    baos.flush();
    ServletOutputStream o = response.getOutputStream();
    o.write(baos.toByteArray());
    o.flush();
    o.close();
    baos.flush();
    
} catch (Exception e) {
 //   e.printStackTrace();
}

%>