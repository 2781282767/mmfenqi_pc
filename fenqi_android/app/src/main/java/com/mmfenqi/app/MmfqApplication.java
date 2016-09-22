package com.mmfenqi.app;



import java.io.File;
import java.util.LinkedList;
import java.util.List;

import android.app.Activity;
import android.os.Environment;
import android.util.Log;

import com.hzpz.pzlibrary.App;
import com.hzpz.pzlibrary.http.ApiHttpClient;
import com.hzpz.pzlibrary.utils.ChannelTools;
import com.hzpz.pzlibrary.utils.TelephoneUtil;
import com.hzpz.pzlibrary.utils.XorValue;
import com.loopj.android.http.AsyncHttpClient;

public class MmfqApplication extends App {

	public static Boolean isLogin = false;//是否登录
	public AsyncHttpClient httpClient;
	private List<Activity> mActivityList = new LinkedList<Activity>();
	private static MmfqApplication instance;
	public static String locationCity="";//定位城市
	public static String selectCity="杭州";//当前选择的城市


	@Override
	public Object getSystemService(String name) {
		return super.getSystemService(name);
	}

	@Override
	public void onCreate() {
		super.onCreate();
		//用户管理器初始化
//		UserLoginManager.getInstance().init(this);
		XorValue.init("2015PCH_FMUserloginKey", "2015PCH_FMPassWordKey");
		//CrashHandler crashHandler = CrashHandler.getInstance();
		//crashHandler.init(this);

//		EMOptions options = new EMOptions();
//		// 默认添加好友时，是不需要验证的，改成需要验证
//		options.setAcceptInvitationAlways(false);
//		//初始化
//		EMClient.getInstance().init(getApplicationContext(), options);
//		//在做打包混淆时，关闭debug模式，避免消耗不必要的资源
//		EMClient.getInstance().setDebugMode(true);
	}
	
	@Override
	public void onInit(ApiHttpClient apiHttpClient, AsyncHttpClient httpClient) {
		super.onInit(apiHttpClient, httpClient);
		try
		{
			String[] pnos = ChannelTools.getChannelInfo(this);
			String no = pnos[0];
			String um = pnos[1];
			if (no != null)
			{
				Log.i("TAG", "chann=" + no);
//				ChanleNo = no;
			}
			if (um != null)
			{
				Log.i("TAG", "um=" + um);
//				AnalyticsConfig.setChannel(um);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		this.httpClient = httpClient ;
		httpClient.setTimeout(10000);   //网络请求默认超时时间10s
		httpClient.addHeader("IMEI", TelephoneUtil.getIMEI(this));
		httpClient.addHeader("IMSI", TelephoneUtil.getIMSI(this));
//		httpClient.addHeader("ClientId", MmfqApplication.clientID);
//		httpClient.addHeader("ChannelId", MmfqApplication.ChanleNo);
//		httpClient.addHeader("TEL", "0");
//		httpClient.addHeader("V", MmfqApplication.VERSON_NAME + TelephoneUtil.getVersionName(this));
	}
	
	@Override
	public File imageDiskCache() {
		String pathDir = "";
		if (Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)) {
			pathDir = Environment.getExternalStorageDirectory().toString();
		} else {
			return null;
		}
		String path = pathDir + "/mmfq/img";
		File dirFile = new File(path);
		if (dirFile.exists()) {
			return dirFile;
		} else {
			dirFile.mkdirs();
		}
		return dirFile;
	}

	public synchronized static MmfqApplication getInstance() {
		if (null == instance) {
			instance = new MmfqApplication();
		}
		return instance;
	}

	// add Activity
	public void addActivity(Activity activity) {
		if (!mActivityList.contains(activity))
			mActivityList.add(activity);
	}

	/**
	 * 退出程序，关闭所有打开的Activity
	 */
	public void exit() {
		try {
			for (Activity activity : mActivityList) {
				if (activity != null /*&& !activity.isFinishing()*/)
					activity.finish();
			}
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}
}
