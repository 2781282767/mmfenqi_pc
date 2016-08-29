package com.hzpz.pzlibrary.utils;

import java.io.File;
import java.net.URL;
import java.net.URLEncoder;
import java.util.TimerTask;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.Dialog;
import android.content.ContentResolver;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Bitmap.Config;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.PorterDuff.Mode;
import android.graphics.PorterDuffXfermode;
import android.graphics.Rect;
import android.graphics.RectF;
import android.graphics.drawable.Drawable;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.provider.Settings;
import android.provider.Settings.SettingNotFoundException;
import android.telephony.TelephonyManager;
import android.text.TextUtils;
import android.text.format.DateFormat;
import android.util.DisplayMetrics;
import android.util.Log;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.InputMethodManager;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.hzpz.pzlibrary.R;
import com.hzpz.pzlibrary.data.BaseData;

@SuppressLint("NewApi")
public class ToolUtil {

	private static Dialog progressDialog = null;

	private static Dialog mTabDialog = null;
	private static boolean isToastShowing = false;
	private static boolean isTimerStart = false;

	/**
	 * 显示输入法
	 * 
	 * @param ctx
	 * @param view
	 */
	public static void showInput(Context ctx, View view) {
		InputMethodManager manager = (InputMethodManager) ctx.getSystemService(Context.INPUT_METHOD_SERVICE);
		manager.showSoftInput(view, InputMethodManager.SHOW_FORCED);
	}

	/**
	 * 隐藏输入法
	 * 
	 * @param ctx
	 * @param view
	 */
	public static void hideInput(Context ctx, View view) {
		InputMethodManager manager = (InputMethodManager) ctx.getSystemService(Context.INPUT_METHOD_SERVICE);
		manager.hideSoftInputFromWindow(view.getWindowToken(), InputMethodManager.HIDE_NOT_ALWAYS);
	}

	static TimerTask task;

	// 获取手机型号
	public static String gotoGetMobileInfo(Context context) {
		TelephonyManager telephonyManager = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
		String imei = telephonyManager.getDeviceId();
		String imsi = telephonyManager.getSubscriberId();
		String model = android.os.Build.MODEL; // 手机型号
		String numer = telephonyManager.getLine1Number();// 手机号码，有的可得，有的不可得
		if (TextUtils.isEmpty(model)) {
			return "未能取到手机型号";
		} else {
			return model;
		}
	}

	/**
	 * 获取手机IMSI
	 * 
	 * @param context
	 * @return
	 */
	public static String getMobileIMSI(Context context) {
		return ((TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE)).getSubscriberId();
	}

	/**
	 * 获取手机IMEI
	 * 
	 * @param context
	 * @return
	 */
	public static String getMobileIMEI(Context context) {
		return ((TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE)).getDeviceId();
	}

	/**
	 * 获取手机型号
	 */
	public static String getMobileModel(Context context) {
		return android.os.Build.MODEL;
	}

	/**
	 * 获取手机系统版本
	 */
	public static String getMobileVersion(Context context) {
		return android.os.Build.VERSION.RELEASE;
	}

	/**
	 * 获取手机SDK版本
	 */
	public static int getMobileSDK(Context context) {
		return android.os.Build.VERSION.SDK_INT;
	}

	/**
	 * 将所有英文标号替换为中文标号
	 * 
	 * @param str
	 * @return
	 */
	public static String stringFilter(String str) {
		str = str.replaceAll("!", "！").replaceAll(":", "：").replace("(", "（").replace(")", "）").replace("\\n", "");// 替换中文标号
		return ToDBC(str.trim());
	}

	/**
	 * 半角转换为全角
	 * 
	 * @param input
	 * @return
	 */
	private static String ToDBC(String input) {
		char[] c = input.toCharArray();
		for (int i = 0; i < c.length; i++) {
			if (c[i] == 12288) {
				c[i] = (char) 32;
				continue;
			}
			if (c[i] > 65280 && c[i] < 65375)
				c[i] = (char) (c[i] - 65248);
		}
		return new String(c);
	}

	/**
	 * 获取屏幕大小
	 * 
	 * @param activity
	 */
	public static void initDisplayMetrics(Activity activity) {
		DisplayMetrics dm = null;// 屏幕分辨率容器

		dm = new DisplayMetrics();

		activity.getWindowManager().getDefaultDisplay().getMetrics(dm);
		// 获得手机的宽度和高度像素单位为px
		int width = dm.widthPixels;
		int height = dm.heightPixels;
		BaseData.ScreenWidth = width;
		BaseData.ScreenHeight = height;
		System.out.println("手机屏幕分辨率为:" + dm.widthPixels + "* " + dm.heightPixels);
	}

	/**
	 * 获取当前时间显示为 时:分
	 * 
	 * @return
	 */
	public static String getCurrentTimeTransToHM() {
		String time = null;
		long dateTaken = System.currentTimeMillis();
		if (dateTaken != 0) {
			time = DateFormat.format("kk:mm", dateTaken).toString();
		}
		return time;
	}

	/**
	 * 获取当前时间显示为 时:分
	 * 
	 * @return
	 */
	public static String getCurrentTimeTransToYMDHM() {
		String time = null;
		long dateTaken = System.currentTimeMillis();
		if (dateTaken != 0) {
			time = DateFormat.format("yyyy-MM-dd kk:mm", dateTaken).toString();
		}
		return time;
	}

	/**
	 * 获取当前时间显示为 年月日
	 * 
	 * @return
	 */
	public static String getCurrentTimeTransToYMD() {
		String time = null;
		long dateTaken = System.currentTimeMillis();
		if (dateTaken != 0) {
			time = DateFormat.format("yyyy-MM-dd", dateTaken).toString();
		}
		return time;
	}

	/**
	 * 获取当前时间显示为 年月日
	 * 
	 * @return
	 */
	public static String getCurrentTimeTransToYMDHMS() {
		String time = null;
		long dateTaken = System.currentTimeMillis();
		if (dateTaken != 0) {
			time = DateFormat.format("yyyy-MM-dd kk:mm:ss", dateTaken).toString();
		}
		return time;
	}

	public static int pxTOsp(Context activity, int px) {
		return (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_SP, px, activity.getResources().getDisplayMetrics());
	}

	public static int pxTOdp(Context activity, int px) {
		return (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, px, activity.getResources().getDisplayMetrics());
	}

	public static String getNameFromUrlStr(String urlStr) {
		if (TextUtils.isEmpty(urlStr))
			return null;
		return urlStr.substring(urlStr.lastIndexOf("/") + 1);
	}

	/**
	 * 设置Listview的高度
	 * 
	 * @param listView
	 */
	public static void setListViewHeightBasedOnChildren(ListView listView) {
		ListAdapter listAdapter = listView.getAdapter();
		if (listAdapter == null)
			return;
		int totalHeight = 0;
		for (int i = 0; i < listAdapter.getCount(); i++) {
			View listItem = listAdapter.getView(i, null, listView);
			listItem.measure(0, 0);
			totalHeight += listItem.getMeasuredHeight();
		}
		ViewGroup.LayoutParams params = listView.getLayoutParams();
		params.height = totalHeight + (listView.getDividerHeight() * (listAdapter.getCount() - 1));
		// ((MarginLayoutParams) params).setMargins(10, 10, 10, 10);
		listView.setLayoutParams(params);
	}

	public static void unWaittingTab() {
		if (mTabDialog != null) {
			if (mTabDialog.isShowing()) {
				mTabDialog.dismiss();
				mTabDialog = null;
			}
		}
	}

	public static boolean isTabDialogShowing() {
		if (mTabDialog != null && mTabDialog.isShowing()) {
			return true;
		}
		return false;
	}

	public static boolean isWatting() {

		if (progressDialog != null) {
			if (progressDialog.isShowing()) {
				return true;
			}
		}
		return false;
	}

	public static void unWaitting(Activity activity) {
		if (progressDialog != null) {
			if (progressDialog.isShowing()) {
				if (activity != null && !activity.isFinishing()) {
					progressDialog.dismiss();
					progressDialog = null;
				}
			}
		}
	}

	public static String URLEncoderForImage(String urlstr) {
		if (TextUtils.isEmpty(urlstr))
			return urlstr;
		String[] urls = urlstr.split("/");
		urls[urls.length - 2] = URLEncoder.encode(urls[urls.length - 2]);
		String url = "";
		for (int i = 0; i < urls.length; i++) {
			if (i == urls.length - 1) {
				url += urls[i];
				break;
			}
			url += urls[i] + "/";
		}
		Log.i("ToolUtil", "url = " + url);
		return url;
	}

	public static String YDURLEncoderForImage(String urlstr) {
		if (TextUtils.isEmpty(urlstr))
			return urlstr;
		if (urlstr.getBytes().length == urlstr.length())
			return urlstr;
		urlstr = urlstr.replace("http://", "");
		String[] urls = urlstr.split("/");
		// urls[urls.length - 2] = URLEncoder.encode(urls[urls.length - 2]);
		String url = "http://";
		for (int i = 0; i < urls.length; i++) {
			if (i == 0) {
				url += urls[i] + "/";
				continue;
			}
			urls[i] = URLEncoder.encode(urls[i]);
			if (i == urls.length - 1) {
				url += urls[i];
				break;
			}
			url += urls[i] + "/";
		}
		return url;
	}

	// MD5加密
	public static String getMD5(byte[] source) {
		String s = null;
		char hexDigits[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' };// 用来将字节转换成 16 进制表示的字符
		try {
			java.security.MessageDigest md = java.security.MessageDigest.getInstance("MD5");
			md.update(source);
			byte tmp[] = md.digest(); // MD5 的计算结果是一个 128 位的长整数，
			// 用字节表示就是 16 个字节
			char str[] = new char[16 * 2]; // 每个字节用 16 进制表示的话，使用两个字符，
			// 所以表示成 16 进制需要 32 个字符
			int k = 0; // 表示转换结果中对应的字符位置
			for (int i = 0; i < 16; i++) { // 从第一个字节开始，对 MD5 的每一个字节
				// 转换成 16 进制字符的转换
				byte byte0 = tmp[i]; // 取第 i 个字节
				str[k++] = hexDigits[byte0 >>> 4 & 0xf]; // 取字节中高 4 位的数字转换,
				// >>> 为逻辑右移，将符号位一起右移
				str[k++] = hexDigits[byte0 & 0xf]; // 取字节中低 4 位的数字转换
			}
			s = new String(str); // 换后的结果转换为字符串
		} catch (Exception e) {
			e.printStackTrace();
		}
		return s;
	}

	public static String getcMD5(byte[] source) {
		String s = null;
		char hexDigits[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };// 用来将字节转换成 16 进制表示的字符
		try {
			java.security.MessageDigest md = java.security.MessageDigest.getInstance("MD5");
			md.update(source);
			byte tmp[] = md.digest(); // MD5 的计算结果是一个 128 位的长整数，
			// 用字节表示就是 16 个字节
			char str[] = new char[16 * 2]; // 每个字节用 16 进制表示的话，使用两个字符，
			// 所以表示成 16 进制需要 32 个字符
			int k = 0; // 表示转换结果中对应的字符位置
			for (int i = 0; i < 16; i++) { // 从第一个字节开始，对 MD5 的每一个字节
				// 转换成 16 进制字符的转换
				byte byte0 = tmp[i]; // 取第 i 个字节
				str[k++] = hexDigits[byte0 >>> 4 & 0xf]; // 取字节中高 4 位的数字转换,
				// >>> 为逻辑右移，将符号位一起右移
				str[k++] = hexDigits[byte0 & 0xf]; // 取字节中低 4 位的数字转换
			}
			s = new String(str); // 换后的结果转换为字符串

		} catch (Exception e) {
			e.printStackTrace();
		}
		return s;
	}

	public static String md5(String text) {
		if (text != null)
			return getcMD5(text.getBytes());
		return text;
	}

	/**
	 * 获取系统亮度
	 * 
	 * @param activity
	 * @return 系统亮度取出为一阿尔法值
	 */
	public static float getScreenBrightness(Activity activity) {
		int value = 10;
		ContentResolver cr = activity.getContentResolver();
		Log.e("DAI", "Settings.System.SCREEN_BRIGHTNESS_MODE_AUTOMATIC:" + Settings.System.SCREEN_BRIGHTNESS_MODE_AUTOMATIC);
		try {
			value = Settings.System.getInt(cr, Settings.System.SCREEN_BRIGHTNESS);
			Log.e("DAI", "value:" + value);
		} catch (SettingNotFoundException e) {
			Log.e("DAI", "error:value:" + value);
		}
		return (float) (value * 100 / 255) / 100;
	}

	/**
	 * 做成圆形图片
	 * 
	 * @param bitmap
	 * @param ratio
	 * @return
	 */
	public static Bitmap getRoundedCornerBitmap(Bitmap bitmap, float ratio) {
		if (bitmap == null)
			return null;
		try {
			Bitmap output = Bitmap.createBitmap(bitmap.getWidth(), bitmap.getHeight(), Config.ARGB_8888);
			Canvas canvas = new Canvas(output);
			final Paint paint = new Paint();
			final Rect rect = new Rect(0, 0, bitmap.getWidth(), bitmap.getHeight());
			final RectF rectF = new RectF(rect);

			paint.setAntiAlias(true);
			canvas.drawARGB(0, 0, 0, 0);
			canvas.drawRoundRect(rectF, bitmap.getWidth() / ratio, bitmap.getHeight() / ratio, paint);

			paint.setXfermode(new PorterDuffXfermode(Mode.SRC_IN));
			canvas.drawBitmap(bitmap, rect, rect, paint);
			/**
			 * 新加 释放bitmap 避免内存溢出
			 */
			if (bitmap != null && bitmap.isRecycled()) {
				bitmap.recycle();
				bitmap = null;
			}
			return output;
		} catch (OutOfMemoryError e) {
			return bitmap;
		}
	}

	public static Bitmap getHeadIcon(String url) {
		if (url != null && url != "") {
			try {
				URL picUrl = new URL(url);
				Bitmap pngBM = getRoundedCornerBitmap(BitmapFactory.decodeStream(picUrl.openStream()), 2);
				return pngBM;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	// 页面加载机制更改 DAI -2015.1.27========================
	/**
	 * 获取作品详情数据先
	 * 
	 * @param bookid
	 */
	public static ProgressBar pb;
	public static Activity mactivity;

	/**
	 * 加载的进度条动画
	 */
	public static void progress(int what, int progress) {
		if (what == 200) {
			hander.removeMessages(100);
		} else if (what == 100) {
			if (pb != null) {
				pb.setProgress(progress);
			}
			Message msg = new Message();
			msg.what = 100;
			msg.obj = progress;
			hander.sendMessageDelayed(msg, 800);
		}
	}

	static Handler hander = new Handler() {
		public void handleMessage(android.os.Message msg) {
			switch (msg.what) {
			case 100:
				int p = Integer.parseInt(msg.obj.toString());
				if (p < 90) {
					if (pb != null) {
						pb.setProgress(p);
					}
					progress(100, p + (int) (Math.random() * 10));
				}
				break;
			default:
				break;
			}
		};
	};

	// ========================页面加载机制更改

	public static int getMaxMemory() {
		int maxMemory = (int) Runtime.getRuntime().maxMemory();
		return maxMemory;
	}

	/**
	 * 给控件设置背景
	 * 
	 * @param cxt
	 * @param v
	 *            控件
	 * @param db
	 *            背景
	 */
	public static void setBg(Context cxt, View v, Drawable bd) {
		if (v == null || bd == null)
			return;
		if (getMobileSDK(cxt) < 16) {
			v.setBackgroundDrawable(bd);
		} else {
			v.setBackground(bd);
		}
	}

	public static void Toast(final Context context, final CharSequence str) {
		new Thread(new Runnable() {

			@Override
			public void run() {
				Looper.prepare();
				LayoutInflater inflater = LayoutInflater.from(context);
				View layoutView = inflater.inflate(R.layout.toast_layout, null);
				TextView tvMsg = (TextView) layoutView.findViewById(R.id.tvToastMsg);
				tvMsg.setText(str);
				// Toast toast = Toast.makeText(context, str, Toast.LENGTH_SHORT);
				Toast toast = new Toast(context);
				toast.setGravity(Gravity.CENTER, 0, 0);
				toast.setView(layoutView);
				toast.setDuration(Toast.LENGTH_SHORT);
				toast.show();
				Looper.loop();
			}
		}).start();

	}

	public static boolean isWifi(Context ct) {
		return isWifi(ct, true);
	}

	public static boolean isWifi(final Context ct, final boolean isShow) {
		ConnectivityManager conManager = (ConnectivityManager) ct.getSystemService(Context.CONNECTIVITY_SERVICE);
		NetworkInfo networkinfo = conManager.getActiveNetworkInfo();
		if (networkinfo == null || !networkinfo.isAvailable() || networkinfo.getState() != NetworkInfo.State.CONNECTED) {
			if (isShow) {
				if (!isToastShowing) {
					ToolUtil.Toast(ct, "当前网络不可用,请检查网络情况");
					isToastShowing = true;
				}
			}
			return false;
		}
		return true;
	}

	/**
	 * 密码匹配 （大于6位小于16位，以字母,数字组成）
	 * 
	 * @param pwd
	 * @return
	 */
	public static boolean pwdMatch(String pwd) {
		if (pwd == null || "".equals(pwd) || pwd.length() < 6 || pwd.length() > 16) {
			return false;
		}
		return pwd.matches("^[A-Za-z0-9]+$");
	}

	/**
	 * 删除空目录
	 * 
	 * @param dir
	 *            将要删除的目录路径
	 */
	public static void doDeleteEmptyDir(String dir) {
		boolean success = (new File(dir)).delete();
		if (success) {
			System.out.println("Successfully deleted empty directory: " + dir);
		} else {
			System.out.println("Failed to delete empty directory: " + dir);
		}
	}
	/**
	 * 将时间（毫秒单位）转换成几分几秒样式
	 * @param time
	 * @return
	 */
	public static String getPlaytime(long time){
		String result = "00:00" ;
		long m = time/(60 * 1000);
		long s = (time % (60 * 1000))/1000 ;
		if(m < 10){
			result = "0" + m +"分" ;
		}else{
			result =  m +"分" ;
		}
		
		if(s < 10){
			result = result + "0" + s +"秒";
		}else{
			result = result + s +"秒";
		}
		return result ;
	}
	
	/**
	 * 将时间（毫秒单位）转换成（分：秒）样式
	 * @param time
	 * @return
	 */
	public static String getPlaytimeByMS(long time){
		String result = "00:00" ;
		long m = time/(60 * 1000);
		long s = (time % (60 * 1000))/1000 ;
		if(m < 10){
			result = "0" + m +":" ;
		}else{
			result =  m +":" ;
		}
		
		if(s < 10){
			result = result + "0" + s;
		}else{
			result = result + s;
		}
		return result ;
	}
	
	/**
	 * 递归删除目录下的所有文件及子目录下所有文件
	 * 
	 * @param dir
	 *            将要删除的文件目录
	 * @return boolean
	 */
	public static boolean deleteFile(File dir) {
		if (dir.isDirectory()) {
			File[] files = dir.listFiles();
			for (File file : files) {
				deleteFile(file);
			}
		}
		// 目录此时为空，可以删除
		return dir.delete();
	}
	
	/**
	 * 将数量转换为x万的格式，保留小数点后一位
	 * @param time
	 * @return
	 */
//	public static String getCountByWan(String count){
//		String result="";
//		double data = 0;
//		double totalCount=Double.parseDouble(count);
//		if (totalCount>10000) {
//			data=XorValue.round(totalCount, 1);
//			result=String.valueOf(data)+"万";
//		}else{
//			result=count;
//		}
//		return result;
//	}
}
