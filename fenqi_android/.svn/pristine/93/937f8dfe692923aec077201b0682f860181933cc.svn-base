package com.mmfenqi.dialog;

import java.util.ArrayList;
import java.util.HashMap;

import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup.LayoutParams;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.DatePicker;
import android.widget.DatePicker.OnDateChangedListener;
import android.widget.GridView;
import android.widget.SimpleAdapter;
import cn.sharesdk.framework.Platform;
import cn.sharesdk.framework.Platform.ShareParams;
import cn.sharesdk.framework.ShareSDK;
import cn.sharesdk.sina.weibo.SinaWeibo;
import cn.sharesdk.tencent.qq.QQ;
import cn.sharesdk.tencent.qzone.QZone;
import cn.sharesdk.wechat.favorite.WechatFavorite;
import cn.sharesdk.wechat.friends.Wechat;
import cn.sharesdk.wechat.moments.WechatMoments;

import com.hzpz.pzlibrary.data.BaseData;
import com.hzpz.pzlibrary.utils.StringUtil;
import com.hzpz.pzlibrary.utils.ToolUtil;
import com.mmfenqi.httpdata.ThirdShare;
import com.mmfenqi.mmfq.R;

/**
 *
 *
 */
public class ShareDialog extends Dialog implements OnDateChangedListener {

	private Context mContext;
	private Activity mActivity;
	private GridView gridview;
	private ArrayList alist;
	private HashMap hashmap;
	private ShareParams sparam;
	private String iconUrl;
	private String msg;
	private String title;
	private String shareUrl;
	private Platform platform = null;

	/**
	 * 
	 * @param act
	 * @param cxt
	 */
	public ShareDialog(Activity act, Context cxt) {
		super(cxt, R.style.MyDialog);
		this.mContext = cxt;
		this.mActivity = act;
		ToolUtil.initDisplayMetrics(mActivity);
	}

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		ShareSDK.initSDK(mActivity);
		LayoutParams lp = new LayoutParams(LayoutParams.MATCH_PARENT,
				LayoutParams.WRAP_CONTENT);
		lp.width = (int) (BaseData.ScreenWidth * 10 / 10); // 设置宽度

		setContentView(
				LayoutInflater.from(mContext).inflate(R.layout.dialog_share,
						null), lp);
		alist = new ArrayList();
		hashmap = new HashMap();
		hashmap.put("image", R.mipmap.icon_login_weixin);
		hashmap.put("name", "微信好友");
		alist.add(hashmap);

		hashmap = new HashMap();
		hashmap.put("image", R.mipmap.icon_login_moments);
		hashmap.put("name", "微信朋友圈");
		alist.add(hashmap);

		hashmap = new HashMap();
		hashmap.put("image", R.mipmap.icon_login_qq);
		hashmap.put("name", "QQ");
		alist.add(hashmap);

		hashmap = new HashMap();
		hashmap.put("image", R.mipmap.icon_login_qzone);
		hashmap.put("name", "QQ空间");
		alist.add(hashmap);

		hashmap = new HashMap();
		hashmap.put("image", R.mipmap.icon_login_weibo);
		hashmap.put("name", "新浪微博");
		alist.add(hashmap);
//		hashmap = new HashMap();
		/*hashmap.put("image", R.drawable.icon_login_tencent);
		hashmap.put("name", "腾讯微博");
		alist.add(hashmap);

		hashmap=new HashMap(); hashmap.put("image",R.drawable.icon_login_qq);
		hashmap.put("name", "短信"); alist.add(hashmap);
		
		hashmap=new HashMap();
		hashmap.put("image",R.drawable.icon_login_weibo); hashmap.put("name",
		"复制链接"); alist.add(hashmap);
		 */
		gridview = (GridView) findViewById(R.id.dialog_grid);
		SimpleAdapter simple = new SimpleAdapter(mContext, alist,
				R.layout.dialog_share_item, new String[] { "image", "name" },
				new int[] { R.id.share_img, R.id.share_name });

		gridview.setAdapter(simple);

		gridview.setOnItemClickListener(new OnItemClickListener() {
			@Override
			public void onItemClick(AdapterView<?> parent, View view,
					int position, long id) {
				if (position == 0) {
					platform = ShareSDK.getPlatform(Wechat.NAME);
					sparam = new Wechat.ShareParams();
					sparam.setTitle(title);
					if (StringUtil.isNotBlank(msg)) {
						if (msg.length() >= 140) {
							msg = msg.substring(0, 139);
						}
					}
					sparam.setText(msg);
					sparam.setUrl(shareUrl);
					sparam.setImageUrl(iconUrl);
					sparam.setShareType(Platform.SHARE_WEBPAGE);
				} else if (position == 1) {
					platform = ShareSDK.getPlatform(WechatMoments.NAME);
					sparam = new WechatMoments.ShareParams();
					sparam.setTitle(title);
					if (StringUtil.isNotBlank(msg)) {
						if (msg.length() >= 140) {
							msg = msg.substring(0, 139);
						}
					}
					sparam.setText(msg);
					sparam.setUrl(shareUrl);
					sparam.setImageUrl(iconUrl);
					sparam.setShareType(Platform.SHARE_WEBPAGE);
				} else if (position == 2) {
					platform = ShareSDK.getPlatform(QQ.NAME);
					sparam = new QQ.ShareParams();
					sparam.setTitle(title);
					sparam.setTitleUrl(shareUrl);
					if (StringUtil.isNotBlank(msg)) {
						if (msg.length() >= 140) {
							msg = msg.substring(0, 139);
						}
					}
					sparam.setText(msg);
					sparam.setImageUrl(iconUrl);
					sparam.setShareType(Platform.SHARE_WEBPAGE);
				} else if (position == 3) {
					platform = ShareSDK.getPlatform(QZone.NAME);
					sparam = new QZone.ShareParams();
					sparam.setTitle(title);
					sparam.setTitleUrl(shareUrl);
					if (StringUtil.isNotBlank(msg)) {
						if (msg.length() >= 140) {
							msg = msg.substring(0, 139);
						}
					}
					sparam.setText(msg);
					sparam.setImageUrl(iconUrl);
					sparam.setSite(title);
					sparam.setSiteUrl(shareUrl);
					sparam.setShareType(Platform.SHARE_WEBPAGE);
				} else if (position == 4) {
					platform = ShareSDK.getPlatform(SinaWeibo.NAME);
					platform.SSOSetting(true);
					sparam = new SinaWeibo.ShareParams();
					sparam.setTitle(title);
					if (StringUtil.isNotBlank(msg)) {
						if (msg.length() >= 140) {
							msg = msg.substring(0, 139);
						}
					}
					sparam.setText(msg+" "+shareUrl);
					sparam.setImageUrl(iconUrl);
					sparam.setSite(title);
//					sparam.setSiteUrl(shareUrl);
					sparam.setShareType(Platform.SHARE_WEBPAGE);
				} else if (position == 5) {

				}
				if (platform != null)
					ThirdShare.getInstance().share(platform, sparam,
							new MThirdShareListener());
			}
		});
	}

	public void setShowInfo(String shareUrl,String title,String msg, String iconUrl) {
		this.shareUrl=shareUrl;
		this.title=title;
		this.msg = msg;
		this.iconUrl = iconUrl;
	}

	/**
	 * sharesdk分享回调方法
	 * 
	 * @author sunyl
	 * 
	 */
	public class MThirdShareListener implements ThirdShare.ThirdShareListener {

		@Override
		public void share(HashMap<String, Object> res, int action) {
			ToolUtil.Toast(mActivity, "分享成功" + action);
			dismiss();
		}

		@Override
		public void fail(Throwable t, int action) {
			ToolUtil.Toast(mActivity,
					"分享失败;错误码:" + action + ";错误信息:" + t.getMessage());
			Log.e("Share",t.getMessage());
		}

		@Override
		public void cancel(String msg, int action) {
			ToolUtil.Toast(mActivity,"分享取消");

		}

	}

	@Override
	public void onDateChanged(DatePicker view, int year, int monthOfYear,
			int dayOfMonth) {

	}
}
