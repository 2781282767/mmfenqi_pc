package com.hzpz.pzlibrary.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 时间类
 * 
 * @author sunyl
 * 
 */
public class DateUtil {
	
	private static SimpleDateFormat formater = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static long ns = 1000;
	private static long nm = ns * 60;// 一分钟的毫秒数
	private static long nh = nm * 60;// 一小时的毫秒数
	private static long nd = nh * 24;// 一天的毫秒数
	
	
	/**
	 * 将日期转换为时间
	 * @param date   
	 * @return
	 */
	public static String date2Time(Date date){
		if(date != null){
			try {
				return formater.format(date);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}
	
	
	/**
	 * 将时间转换为日期 传入的参数格式：yyyy-MM-dd HH:mm:ss
	 * @param time   
	 * @return
	 */
	public static Date time2Date(String time){
		if(StringUtil.isNotBlank(time)){
			try {
				return formater.parse(time);
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	/**
	 * 计算两个时间之间差多少毫秒，
	 * 
	 * @param oldTime
	 *            传入的时间
	 * @param nowTime
	 *            现在时间
	 * @return
	 */
	public static Long calDateDiff(Date oldTime, Date nowTime) {
		if(oldTime != null && nowTime != null)
			return nowTime.getTime() - oldTime.getTime();
		return 0L;
	}

	/**
	 * 将毫秒转换为时间
	 * 
	 * @param millsecond   毫秒
	 * @param returnDay    是否返回天数
	 * @return
	 */
	public static String calMS2Time(Long millSecond, boolean returnDay) {
		long day = millSecond / nd;// 计算差多少天
		long hour = millSecond % nd / nh;// 计算差多少小时
		long min = millSecond % nd % nh / nm;// 计算差多少分钟
		long sec = millSecond % nd % nh % nm / ns;// 计算差多少秒
		String hourTime = hour >= 0 && hour < 10 ? "0" + hour : "" + hour;
		String minTime = min >= 0 && min < 10 ? "0" + min : "" + min;
		String secTime = sec >= 0 && sec < 10 ? "0" + sec : "" + sec;
		if (returnDay) {
			return day + ":" + hourTime + ":" + minTime + ":" + secTime;
		}
		return hourTime + ":" + minTime + ":" + secTime;
	};

}
