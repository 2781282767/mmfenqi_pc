package com.hzpz.pzlibrary.utils;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;

import com.hzpz.pzlibrary.utils.Base64;

public class XorValue {

	
	public static  String  LOGIN_KEY= "" ; 
	public static  String PASS_WORD_KEY = "" ; 
	
	public static void init(String loginKey , String passWordKey){
		LOGIN_KEY = loginKey ;
		PASS_WORD_KEY = passWordKey ;
	}

	public static String getUsernameEncode(String userName){
		return getEncode(userName,LOGIN_KEY) ;
	}
	
	public static String getPassWordEncode(String password){
		return getEncode(password,PASS_WORD_KEY) ;
	}
	/**
	 * 获取加密值
	 * @param value
	 * @param key
	 * @return
	 */
	public static String getEncode(String value , String key){
		return getBase64(xor(getBase64(value), key)) ;
	}
	/**
	 * 转字符异或
	 * @param value
	 * @param key
	 * @return
	 */
	public static String xor(String value, String key){
		
		byte b1[] = value.getBytes();
		byte b2[] = key.getBytes();

		for (int i = 0; i < b1.length; i++) {
			for (int j = 0; j < b2.length; j++) {
				int b = (int) b1[i] ^ (int) b2[j];
				b1[i] = (byte) b;
			}
		}
		
		return new String(b1);
	}
	

	public static String getBase64(String str) {
		byte[] b = null;
		String s = null;
		try {
			b = str.getBytes("utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		if (b != null) {
			s = new Base64().encode(b);
		}
		return s;
	}

	// 解密
	public static String getFromBase64(String s) {
		byte[] b = null;
		String result = null;
		if (s != null) {
			Base64 decoder = new Base64();
			try {
				b = decoder.decode(s);
				result = new String(b, "utf-8");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return result;
	}

	/**
	 * 保留小数点后几位
	 * @param v 需要操作的值
	 * @param scale	需要保留到小数点后几位
	 * @return
	 */
	public static double round(Double v, int scale) {
        if (scale < 0) {
            throw new IllegalArgumentException("The scale must be a positive integer or zero");
        }

        BigDecimal b = null == v ? new BigDecimal("0.0") : new BigDecimal(Double.toString(v));
        BigDecimal one = new BigDecimal("1");
        return b.divide(one, scale, BigDecimal.ROUND_HALF_UP).doubleValue();
	}
}
