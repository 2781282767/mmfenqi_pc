package com.hzpz.pzlibrary.utils;

import java.io.File;
import java.util.List;


import android.app.ActivityManager;
import android.app.ActivityManager.RunningServiceInfo;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.content.pm.ResolveInfo;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.Environment;
import android.os.StatFs;
import android.provider.Settings;
import android.speech.RecognizerIntent;
import android.telephony.TelephonyManager;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;

/**
 * 功能说明: 获取手机相关参数的工具类
 * 
 * @Author 陈小冬
 * @Date 2011-1-6
 * @Version 1.0
 */
public class TelephoneUtil {
	private static final String TAG = "TelephoneUtil";

	/** 安装位置 */
	/** auto */
	public static final int APP_INSTALL_AUTO = 0;
	/** internal */
	public static final int APP_INSTALL_DEVICE = 1;
	/** external eg:sdcard */
	public static final int APP_INSTALL_SDCARD = 2;
	/** default install location */
	public static final String DEFAULT_INSTALL_LOCATION = "default_install_location";

	/**
	 * 获取当前系统 默认设置安装位置
	 * 
	 * @param ctx
	 * @return
	 */
	public static int getAppInstallLocation(Context ctx) {
		int selectedLocation = Settings.System.getInt(ctx.getContentResolver(), DEFAULT_INSTALL_LOCATION, APP_INSTALL_AUTO);
		switch (selectedLocation) {
		case APP_INSTALL_AUTO:
			return APP_INSTALL_AUTO;
		case APP_INSTALL_DEVICE:
			return APP_INSTALL_DEVICE;
		case APP_INSTALL_SDCARD:
			return APP_INSTALL_SDCARD;
		default:
			return APP_INSTALL_AUTO;
		}
	}

	/**
	 * 设置 安装位置
	 * 
	 * @param ctx
	 * @param id
	 */
	public static void setAppInstallLocation(Context ctx, int id) {
		Settings.System.putInt(ctx.getContentResolver(), DEFAULT_INSTALL_LOCATION, id);
	}

	/**
	 * 获取CPU的ABI
	 * 
	 * @return
	 */
	public static String getCPUABI() {
		String abi = Build.CPU_ABI;
		abi = (abi == null || abi.trim().length() == 0) ? "" : abi;
		// 检视是否有第二类型，1.6没有这个字段
		try {
			String cpuAbi2 = Build.class.getField("CPU_ABI2").get(null).toString();
			cpuAbi2 = (cpuAbi2 == null || cpuAbi2.trim().length() == 0) ? null : cpuAbi2;
			if (cpuAbi2 != null) {
				abi = abi + "," + cpuAbi2;
			}
		} catch (Exception e) {
		}
		return abi;
	}

	/**
	 * 取得IMEI号
	 * 
	 * @param ctx
	 * @return
	 */
	public static String getIMEI(Context ctx) {
		TelephonyManager tm = (TelephonyManager) ctx.getSystemService(Context.TELEPHONY_SERVICE);
		String imei = tm.getDeviceId();
		if (null == imei)
			return "";
		else
			return imei;
	}

	/**
	 * 取得IMSI号
	 * 
	 * @param ctx
	 * @return
	 */
	public static String getIMSI(Context ctx) {
		TelephonyManager tm = (TelephonyManager) ctx.getSystemService(Context.TELEPHONY_SERVICE);
		String imsi = tm.getSubscriberId();
		if (null == imsi)
			return "";
		else
			return imsi;
	}

	/**
	 * 获取机器名称 如 milestone
	 * 
	 * @return
	 */
	public static String getMachineName() {
		return android.os.Build.MODEL;
	}

	/**
	 * 获取数字型API_LEVEL 如：4、6、7
	 * 
	 * @return
	 */
	public static int getApiLevel() {
		int apiLevel = 7;
		try {
			apiLevel = Integer.parseInt(android.os.Build.VERSION.SDK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return apiLevel;
	}

	/**
	 * 获取字符串型的固件版本，如1.5、1.6、2.1
	 * 
	 * @return
	 */
	public static String getFirmWareVersion() {
		final String version_3 = "1.5";
		final String version_4 = "1.6";
		final String version_5 = "2.0";
		final String version_6 = "2.0.1";
		final String version_7 = "2.1";
		final String version_8 = "2.2";
		final String version_9 = "2.3";
		final String version_10 = "2.3.3";
		final String version_11 = "3.0";
		final String version_12 = "3.1";
		final String version_13 = "3.2";
		final String version_14 = "4.0";
		final String version_15 = "4.0.3";
		final String version_16 = "4.1";
		final String version_17 = "4.2";
		String versionName = "";
		try {
			// android.os.Build.VERSION.SDK_INT Since: API Level 4
			// int version = android.os.Build.VERSION.SDK_INT;
			int version = Integer.parseInt(android.os.Build.VERSION.SDK);
			switch (version) {
			case 3:
				versionName = version_3;
				break;
			case 4:
				versionName = version_4;
				break;
			case 5:
				versionName = version_5;
				break;
			case 6:
				versionName = version_6;
				break;
			case 7:
				versionName = version_7;
				break;
			case 8:
				versionName = version_8;
				break;
			case 9:
				versionName = version_9;
				break;
			case 10:
				;
				versionName = version_10;
				break;
			case 11:
				versionName = version_11;
				break;
			case 12:
				versionName = version_12;
				break;
			case 13:
				versionName = version_13;
				break;
			case 14:
				versionName = version_14;
				break;
			case 15:
				versionName = version_15;
				break;
			case 16:
				versionName = version_16;
				break;
			case 17:
				versionName = version_17;
				break;
			default:
				versionName = version_8;
			}
		} catch (Exception e) {
			versionName = version_8;
		}
		return versionName;
	}

	/**
	 * 获取软件包名
	 * 
	 * @return
	 */
	public static String getPackageName(Context ctx) {
		String packageName = "";
		try {
			PackageInfo packageinfo = ctx.getPackageManager().getPackageInfo(ctx.getPackageName(), PackageManager.GET_INSTRUMENTATION);
			packageName = packageinfo.packageName;
		} catch (NameNotFoundException e) {
			e.printStackTrace();
		}
		return packageName;
	}

	/**
	 * 获取软件版本名称
	 * 
	 * @return
	 */
	public static String getVersionName(Context ctx) {
		String versionName = "";
		try {
			PackageInfo packageinfo = ctx.getPackageManager().getPackageInfo(ctx.getPackageName(), PackageManager.GET_INSTRUMENTATION);
			versionName = packageinfo.versionName;
		} catch (NameNotFoundException e) {
			e.printStackTrace();
		}
		return versionName;
	}

	/**
	 * 获取软件版本号 code
	 * 
	 * @return
	 */
	public static int getVersionCode(Context ctx) {
		int versionCode = 0;
		try {
			PackageInfo packageinfo = ctx.getPackageManager().getPackageInfo(ctx.getPackageName(), PackageManager.GET_INSTRUMENTATION);
			versionCode = packageinfo.versionCode;
		} catch (NameNotFoundException e) {
			e.printStackTrace();
		}
		return versionCode;
	}

	/**
	 * 网络是否可用
	 * 
	 * @param context
	 * @return
	 */
	public synchronized static boolean isNetworkAvailable(Context context) {
		if (context == null)
			return false;
		boolean result = false;
		ConnectivityManager connectivityManager = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
		NetworkInfo networkInfo = null;
		if (null != connectivityManager) {
			networkInfo = connectivityManager.getActiveNetworkInfo();
			if (null != networkInfo && networkInfo.isAvailable() && networkInfo.isConnected()) {
				result = true;
			}
		}
		return result;
	}

	/**
	 * wifi是否启动
	 * 
	 * @param ctx
	 * @return
	 */
	public static boolean isWifiEnable(Context ctx) {
		// 解决日志反馈空指针问题，增加对null的判断
		try {
			if (ctx == null)
				return false;
			ConnectivityManager tele = (ConnectivityManager) ctx.getSystemService(Context.CONNECTIVITY_SERVICE);
			if (tele != null && (tele.getActiveNetworkInfo() == null || !tele.getActiveNetworkInfo().isAvailable())) {
				return false;
			}
			int type = tele.getActiveNetworkInfo().getType();
			return type == ConnectivityManager.TYPE_WIFI;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * 返回网络连接方式
	 * 
	 * @param ctx
	 * @return 0为wifi连接;1为gprs连接
	 */
	public static int getNetworkState(Context ctx) {
		if (isWifiEnable(ctx)) {
			return 0;
		} else {
			return 1;
		}
	}

	/**
	 * sim卡是否存在
	 * 
	 * @param ctx
	 * @return
	 */
	public static boolean isSimExist(Context ctx) {
		TelephonyManager manager = (TelephonyManager) ctx.getSystemService(Context.TELEPHONY_SERVICE);
		if (manager.getSimState() == TelephonyManager.SIM_STATE_ABSENT)
			return false;
		else
			return true;
	}

	/**
	 * sd卡是否存在
	 * 
	 * @return
	 */
	public static boolean isSdcardExist() {
		return android.os.Environment.getExternalStorageState().equals(android.os.Environment.MEDIA_MOUNTED);
	}

	/**
	 * 返回屏幕分辨率,字符串型。如 320x480
	 * 
	 * @param ctx
	 * @return
	 */
	public static String getScreenResolution(Context ctx) {
		DisplayMetrics metrics = new DisplayMetrics();
		WindowManager windowManager = (WindowManager) ctx.getApplicationContext().getSystemService(Context.WINDOW_SERVICE);
		windowManager.getDefaultDisplay().getMetrics(metrics);
		int width = metrics.widthPixels < metrics.heightPixels ? metrics.widthPixels : metrics.heightPixels;
		int height = metrics.widthPixels < metrics.heightPixels ? metrics.heightPixels : metrics.widthPixels;
		// String resolution = width + "x" + height;
		String resolution = width + "*" + height;
		return resolution;
	}

	/**
	 * 返回屏幕分辨率,数组型。width小于height
	 * 
	 * @param ctx
	 * @return
	 */

	public static int[] getScreenResolutionXY(Context ctx) {
		int[] resolutionXY = new int[2];
		if (resolutionXY[0] != 0) {
			return resolutionXY;
		}
		DisplayMetrics metrics = new DisplayMetrics();
		WindowManager windowManager = (WindowManager) ctx.getApplicationContext().getSystemService(Context.WINDOW_SERVICE);
		windowManager.getDefaultDisplay().getMetrics(metrics);
		resolutionXY[0] = metrics.widthPixels < metrics.heightPixels ? metrics.widthPixels : metrics.heightPixels;
		resolutionXY[1] = metrics.widthPixels < metrics.heightPixels ? metrics.heightPixels : metrics.widthPixels;
		return resolutionXY;
	}

	/**
	 * 返回屏幕密度
	 * 
	 * @param ctx
	 * @return
	 */

	public static float getScreenDensity(Context ctx) {
		return ctx.getResources().getDisplayMetrics().density;
	}

	/**
	 * 查询系统广播
	 * 
	 * @param ctx
	 * @param packageName
	 * @return
	 */
	public static boolean queryBroadcastReceiver(Context ctx, String actionName) {
		PackageManager pm = ctx.getPackageManager();
		try {
			Intent intent = new Intent(actionName);
			List<ResolveInfo> apps = pm.queryBroadcastReceivers(intent, 0);
			if (apps.isEmpty())
				return false;
			else
				return true;
		} catch (Exception e) {
			Log.d(TAG, "queryBroadcastReceivers: " + e.toString());
			return false;
		}
	}

	/**
	 * 获取IP地址
	 * 
	 * @Title: getWifiAddress
	 * @param ctx
	 * @return
	 * @throws
	 */
	public static String getWifiAddress(Context ctx) {

		try {
			// 获取wifi服务
			WifiManager wifiManager = (WifiManager) ctx.getSystemService(Context.WIFI_SERVICE);
			// 判断wifi是否开启
			if (wifiManager.isWifiEnabled()) {
				WifiInfo wifiInfo = wifiManager.getConnectionInfo();
				int ipAddress = wifiInfo.getIpAddress();
				String ip = intToIp(ipAddress);
				return ip;
			}
			return "";
		} catch (Exception e) {
			e.printStackTrace();
			return "";
		}
	}

	private static String intToIp(int i) {
		return (i & 0xFF) + "." + ((i >> 8) & 0xFF) + "." + ((i >> 16) & 0xFF) + "." + (i >> 24 & 0xFF);
	}

	/**
	 * 
	 * @Title: isServiceRunning
	 * @Description:判断服务是否运行
	 * @param ctx
	 * @param className
	 * @return
	 * @throws
	 */
	public static boolean isServiceRunning(Context ctx, String className) {
		ActivityManager activityManager = (ActivityManager) ctx.getSystemService("activity");
		List<RunningServiceInfo> serviceList = activityManager.getRunningServices(30);
		if (serviceList == null)
			return false;
		for (int i = 0; i < serviceList.size(); i++) {
			if (serviceList.get(i).service.getClassName().equals(className))
				return true;
		}
		return false;
	}

	/**
	 * Check to see if a recognition activity is present
	 * 
	 * @param ctx
	 * @return
	 */
	public static boolean isSupportRecognizer(Context ctx) {
		// Check to see if a recognition activity is present
		PackageManager pm = ctx.getPackageManager();
		List<ResolveInfo> activities = pm.queryIntentActivities(new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH), 0);
		if (activities.size() != 0) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 获取内部存储器可用大小
	 */
	public static long getAvailableInternalMemorySize() {
		long availableExternalMemorySize = 0;
		File path = Environment.getDataDirectory();
		StatFs stat = new StatFs(path.getPath());
		long blockSize = stat.getBlockSize();
		long availableBlocks = stat.getAvailableBlocks();
		availableExternalMemorySize = availableBlocks * blockSize;
		return availableExternalMemorySize;
	}

	/**
	 * 获取外部存储器可用大小
	 */
	public static long getAvailableExternalMemorySize() {
		long availableExternalMemorySize = 0;
		if (Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)) {
			File path = Environment.getExternalStorageDirectory();
			StatFs stat = new StatFs(path.getPath());
			long blockSize = stat.getBlockSize();
			long availableBlocks = stat.getAvailableBlocks();
			availableExternalMemorySize = availableBlocks * blockSize;
		} else if (Environment.getExternalStorageState().equals(Environment.MEDIA_REMOVED)) {
			availableExternalMemorySize = -1;
		}
		return availableExternalMemorySize;
	}

	/**
	 * 判断是否为首次运行
	 * 
	 * @param mContext
	 * @return
	 */
	public static boolean isFirstApp(Context ctx) {
		int versionCode = TelephoneUtil.getVersionCode(ctx);
		int firstVersionCode = PreferenceUtil.getInteger(ctx, PreferenceUtil.KEY_FIRST_ENTER, 0);
		if (firstVersionCode < versionCode) {
			PreferenceUtil.putInteger(ctx, PreferenceUtil.KEY_FIRST_ENTER, versionCode);
			return true;
		}
		return false;
	}

	public static void collapseSoftInputMethod(Context ctx, EditText inputText) {
		InputMethodManager imm = (InputMethodManager) ctx.getSystemService(Context.INPUT_METHOD_SERVICE);
		imm.hideSoftInputFromWindow(inputText.getWindowToken(), 0);
	}

	
}
