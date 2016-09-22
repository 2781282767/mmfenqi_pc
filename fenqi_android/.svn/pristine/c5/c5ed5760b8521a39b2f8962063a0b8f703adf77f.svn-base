package com.hzpz.pzlibrary;

import java.io.File;

import com.hzpz.pzlibrary.core.AppContext;
import com.hzpz.pzlibrary.http.ApiHttpClient;
import com.loopj.android.http.AsyncHttpClient;
import com.nostra13.universalimageloader.cache.disc.impl.UnlimitedDiscCache;
import com.nostra13.universalimageloader.core.DisplayImageOptions;
import com.nostra13.universalimageloader.core.ImageLoader;
import com.nostra13.universalimageloader.core.ImageLoaderConfiguration;
import com.nostra13.universalimageloader.core.assist.ImageScaleType;
import com.nostra13.universalimageloader.core.display.SimpleBitmapDisplayer;

import android.app.Application;
import android.graphics.Bitmap;
import android.os.Environment;
import android.support.v4.util.ArrayMap;

/**
 * 基类Application
 * 
 * @author Idock
 *
 */
public abstract class App extends Application implements ApiHttpClient.InitListener{

	private ArrayMap<String, Object> services;

	@Override
	public void onCreate() {
		super.onCreate();

		AppContext.getInstance().setApp(this);
		
		services = new ArrayMap<String, Object>();
		// 初始化网络请求服务
		services.put(ApiHttpClient.APIHTTPCLIENT_SERVICE, ApiHttpClient.getInstance());

		// 初始化图片加载
		ImageLoaderConfiguration config ;
		if (Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)) {
			config = new ImageLoaderConfiguration.Builder(this)//
			.diskCache(new UnlimitedDiscCache(imageDiskCache()))//
			.diskCacheSize(diskMaxCacheSize())//
			.memoryCacheSize(memoryCacheSize())//
			.defaultDisplayImageOptions(getDisplayImageOptions())//
			.build();
		} else {
			config = new ImageLoaderConfiguration.Builder(this)//
			.memoryCacheSize(memoryCacheSize())//
			.defaultDisplayImageOptions(getDisplayImageOptions())//
			.build();
		}
		/*ImageLoaderConfiguration config = new ImageLoaderConfiguration.Builder(this)//
				.diskCache(new UnlimitedDiscCache(imageDiskCache()))//
				.diskCacheSize(diskMaxCacheSize())//
				.memoryCacheSize(memoryCacheSize())//
				.defaultDisplayImageOptions(getDisplayImageOptions())//
				.build();*/
	
		ImageLoader.getInstance().init(config);
	}
	
	@Override
	public Object getSystemService(String name) {
		if (services != null && services.containsKey(name))
			return services.get(name);
		return super.getSystemService(name);
	}
	
	@Override
	public void onInit(ApiHttpClient apiHttpClient, AsyncHttpClient httpClient) {
	}

	/**
	 * 获取图片缓存目录
	 * 
	 * @return
	 */
	public abstract File imageDiskCache();

	/**
	 * 获取图片在Disk中最大的缓存值,默认50M
	 * 
	 * @return
	 */
	protected int diskMaxCacheSize() {
		return 50 * 1024 * 1024;
	}
	/**
	 * 获取图片在内存中最大的缓存值,默认3M
	 * 
	 * @return
	 */
	protected int memoryCacheSize() {
		return 3 * 1024 * 1024;
	}

	/**
	 * 获取图片显示的设置
	 * @return
	 */
	protected DisplayImageOptions getDisplayImageOptions(){
		DisplayImageOptions options = new DisplayImageOptions.Builder()
				.delayBeforeLoading(0) // 加载图片前延迟时间，默认为0
				.cacheInMemory(true) // 是否启用内存缓存，默认为false
				.cacheOnDisk(true) // 是否启用磁盘缓存，默认为false
				.imageScaleType(ImageScaleType.IN_SAMPLE_POWER_OF_2) // 解析图片时缩放因子，这里是默认值
				.bitmapConfig(Bitmap.Config.ARGB_8888) // 解析图片时采用的色彩格式，这里是默认值
				.displayer(new SimpleBitmapDisplayer()) // 图片显示器，这里是默认方式
				.build();
		return options;
	}

}
