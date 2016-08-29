package com.hzpz.pzlibrary.utils;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 字符工具类
 * 
 * @author lyf 2013-7-16
 */
public class StringUtil {
	
	public static boolean isEmpty(CharSequence c) {
		return c == null || "".equals(c.toString().trim());
	}
	
	public static boolean isBlank(String str) {
		return !isNotBlank(str);
	}
	
	public static boolean isNotBlank(String str) {
		return (str != null && str.trim().length() > 0);
	}
	
	public static String listToString(List<String> stringList){
	        if (stringList == null || stringList.isEmpty()) {
	            return null;
	        }
	        StringBuilder result=new StringBuilder();
	        boolean flag=false;
	        for (String string : stringList) {
	            if (flag) {
	                result.append(",");
	            }else {
	                flag=true;
	            }
	            result.append(string);
	        }
	        return result.toString();
	    }
	
	/**
	 * 验证手机号输入是否合法
	 * @param phone 手机号
	 * @return
	 */
	public static boolean phoneCheck(String phone){
		// 只允许字母和数字
		String regEx = "^[1][3,5,8]\\d{9}$";
		Pattern p = Pattern.compile(regEx);
		Matcher m = p.matcher(phone);
		return m.matches();
	}
}
