package com.hzpz.pzlibrary.utils;

import java.io.IOException;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import android.content.Context;
import android.text.TextUtils;
import android.util.Log;

public class ChannelTools {

	private static String Tag = "channel" ;
	/**
	 * 获取渠道号
	 * @param context
	 * @return
	 */
	public static String getChannel(Context context) {
        String sourceDir = context.getApplicationInfo().sourceDir;
        String ret = "";
        ZipFile zipfile = null;
        try {
            zipfile = new ZipFile(sourceDir);
            Enumeration<?> entries = zipfile.entries();
            while (entries.hasMoreElements()) {
                ZipEntry entry = ((ZipEntry) entries.nextElement());
                String entryName = entry.getName();
                if (entryName.startsWith("META-INF/hs_")) {
                    ret = entryName;
                    break;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (zipfile != null) {
                try {
                    zipfile.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        String[] split = ret.split("_");
        if (split != null && split.length >= 2) {
            return ret.substring(split[0].length() + 1);
        } else {
            return "0000";
        }
    }
	/**
	 * 给渠道号赋值
	 * @param ctx
	 * @param chnnelNo
	 * @param channelName
	 */
	public static void setChannelValues(Context ctx , String chnnelNo , String channelName){
		String channelInfo = getChannel(ctx);
		Log.d(Tag, "channelInfo = " + channelInfo);
		String no = null ;
		String um = null;
		if(!TextUtils.isEmpty(channelInfo)){
			String[] info = channelInfo.split("_");
			if(info != null && info.length > 0){
				no = info[0];
				if(info.length > 1)
					um = info[1];
			}
		}
		if (no != null)
		{
			String c = no.substring(1, no.length());
			Log.i("TAG", "chann=" + c);
			Log.d(Tag, "channel_no = " + no);
			chnnelNo = no;
		}
		if (um != null)
		{
			Log.i("TAG", "um=" + um);
			Log.d(Tag, "channel_um = " + um);
			channelName = um ;
		}
	}
	
	/**
	 * 给渠道号赋值
	 * @param ctx
	 * @param chnnelNo
	 * @param channelName
	 */
	public static String[] setChannelValues(Context ctx) {
		String[] channelArray = new String[2];
		String channelInfo = getChannel(ctx);
		Log.d(Tag, "channelInfo = " + channelInfo);
		String no = null ;
		String um = "";
		if(!TextUtils.isEmpty(channelInfo)){
			String[] info = channelInfo.split("_");
			if(info != null && info.length > 0){
				no = info[0];
				if(info.length > 1)
					um = info[1];
			}
		}
		if (no != null)
		{
			String c = no.substring(1, no.length());
			Log.d(Tag, "channel_no = " + no);
		}else{
			no = "0000" ;
		}
		channelArray[0] = no;
		channelArray[1] = um;
		if (!TextUtils.isEmpty(um))
		{
			Log.d(Tag, "channel_um = " + um);
		}
		return channelArray ;
	}
	
	/**
	 * 获取渠道号信息 
	 * [0] = 渠道号
	 * [1] = 友盟渠道名
	 * @param ctx
	 * @param chnnelNo
	 * @param channelName
	 */
	public static String[] getChannelInfo(Context ctx ){
		String channelInfo = getChannel(ctx);
		String no = null ;
		String um = null;
		String[] channelArr = {"0000","WG0000"} ;
		if(!TextUtils.isEmpty(channelInfo)){
			String[] info = channelInfo.split("_");
			if(info != null && info.length > 0){
				no = info[0];
				if(info.length > 1)
					um = info[1];
			}
		}
		if (!TextUtils.isEmpty(no))
		{
			channelArr[0] = no ;
		}
		if (!TextUtils.isEmpty(um))
		{
			channelArr[1] = um ;
		}
		
		return channelArr ;
	}
}
