package com.mmfenqi.httpdata;

import java.util.HashMap;
import android.os.Handler;
import cn.sharesdk.framework.Platform;
import cn.sharesdk.framework.Platform.ShareParams;
import cn.sharesdk.framework.PlatformActionListener;

/**
 * 第三方平台分享
 * 
 * @author sunyl
 * 
 */
public class ThirdShare implements PlatformActionListener {
	
	private static final int MSG_AUTH_CANCEL = 2;
	private static final int MSG_AUTH_ERROR= 3;
	private static final int MSG_AUTH_COMPLETE = 4;
	private static ThirdShare share;
	private ThirdShareListener mListener;

	public static ThirdShare getInstance() {
		if (share == null) {
			share = new ThirdShare();
		}
		return share;
	}

	/**
	 * sharesdk 第三方登录通用接口
	 * 
	 * @param plat
	 * @param sparam
	 * @param listener
	 */
	public void share(Platform plat, ShareParams sparam, ThirdShareListener listener) {
		this.mListener = listener;
		plat.setPlatformActionListener(this); // 设置分享事件回调
		// 执行图文分享
		plat.share(sparam);
		plat.setPlatformActionListener(this);
		plat.showUser(null);

	}

	Handler showHandler = new Handler() {
		public void handleMessage(android.os.Message msg) {
			switch(msg.what) {
			case MSG_AUTH_CANCEL:
				//取消授权
				int action = msg.arg1;
				mListener.cancel("取消分享", action);
				break;
			case MSG_AUTH_ERROR:
				//授权失败
				Throwable t = (Throwable) msg.obj;
				int action1 = msg.arg1;
				mListener.fail(t, action1);
				break;
			case MSG_AUTH_COMPLETE:
				//授权成功
				int action2 = msg.arg1;
				mListener.share(null, action2);
				break;
			}
		}
	};

	@Override
	public void onCancel(Platform plat, int action) {
		mListener.cancel("取消分享", action);
	}

	@Override
	public void onComplete(Platform plat, int action, HashMap<String, Object> res) {
		mListener.share(null, action);
	}

	@Override
	public void onError(Platform plat, int action, Throwable t) {
		mListener.fail(t, action);
	}

	public interface ThirdShareListener {
		public void share(HashMap<String, Object> res, int action);

		public void fail(Throwable t, int action);

		public void cancel(String msg, int action);
	}

}
