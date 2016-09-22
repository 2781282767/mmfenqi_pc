package com.mmfenqi.mmfq;


import android.app.ActionBar.LayoutParams;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.hzpz.pzlibrary.utils.StringUtil;
import com.hzpz.pzlibrary.utils.ToolUtil;
import com.mmfenqi.app.MmfqApplication;
import com.mmfenqi.dialog.DataLoadingProgress;

public class BaseActivity extends FragmentActivity {

	private RelativeLayout mBaseLayout;
	private View titlebar;
	protected TextView tvTitle;
	protected TextView tvRight;
	protected ImageView ivBack;
	protected ImageView ivPlaying;
	private ExitReceive exitReceiver ;
	public static final String EXIT_ACTIVITY_BROADCAST = "exit_activity_broascast" ;
	private DataLoadingProgress loading ;
	
	/**红包信息*/
	protected RelativeLayout rlRoot;
	protected LinearLayout llRedpacket;
	protected LinearLayout llRedpacket1;
	private RelativeLayout rlCover;
	private LinearLayout llGrabed;
	private LinearLayout llNoGrabed;
	protected TextView tvName;
	protected TextView tvDesc;
	private TextView tvGrabName;
	private TextView tvGrabDesc;
	private TextView tvName1;
	private TextView tvDesc1;
	private ImageView ivAuthorHead;
//	protected GrabRedEnvelopeUtil util;
	@Override
	protected void onCreate(Bundle arg0) {
		super.onCreate(arg0);
		MmfqApplication.getInstance().addActivity(this);
		exitReceiver=new ExitReceive();
		IntentFilter intentFilter=new IntentFilter(EXIT_ACTIVITY_BROADCAST);//注册退出app广播
		registerReceiver(exitReceiver, intentFilter);
//		BroadcastComm.rigisterReceiver(this, BroadcastComm.SHOW_REDENVELOPE_BROADCAST, showRedpacketReceiver);
	}

	public void setContentView(int layoutResID, boolean isTitleBar) {
		mBaseLayout = new RelativeLayout(this);
		mBaseLayout.setBackgroundColor(this.getResources().getColor(
				R.color.gray));
		LayoutInflater inflater = (LayoutInflater) getSystemService(Context.LAYOUT_INFLATER_SERVICE);
		titlebar = inflater.inflate(R.layout.titlebar, null);
		RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(
				LayoutParams.MATCH_PARENT,ToolUtil.pxTOdp(this, 48));
		params.addRule(RelativeLayout.ALIGN_PARENT_TOP);
		if (isTitleBar) {
			mBaseLayout.addView(titlebar, params); // 添加头部布局
		}
		ivBack = (ImageView) titlebar.findViewById(R.id.ivBack);
		ivPlaying = (ImageView) titlebar.findViewById(R.id.ivPlaying);
		ivBack.setOnClickListener(clicklistener);
		tvRight = (TextView) titlebar.findViewById(R.id.tvRight);
		tvRight.setOnClickListener(clicklistener);
		tvTitle = (TextView) titlebar.findViewById(R.id.tvTitle);
		titlebar.setVisibility(isTitleBar ? View.VISIBLE : View.GONE);
		params = new RelativeLayout.LayoutParams(LayoutParams.MATCH_PARENT,LayoutParams.WRAP_CONTENT);
		View contentView = inflater.inflate(layoutResID, null);
		params.addRule(RelativeLayout.BELOW, R.id.lyTitleBar);
		mBaseLayout.addView(contentView, params); // 添加内容布局
		setContentView(mBaseLayout);

	}

	public void setTitle(int resId){
		tvTitle.setText(getResources().getString(resId));
	}
	
	public void setTitle(String title){
		tvTitle.setText(title);
	}
	

	private OnClickListener clicklistener = new OnClickListener() {

		@Override
		public void onClick(View v) {
			switch (v.getId()) {
			case R.id.ivBack:
				finish();
				break;
			case R.id.tvRight:
				onRight();
				break;
			default:
				break;
			}
		}
	};

	/**
	 * TitleBar右按钮点击
	 */
	protected void onRight() {

	}
	
	/**
	 * 退出app广播
	 * @author Administrator
	 *
	 */
	class ExitReceive extends BroadcastReceiver{

		@Override
		public void onReceive(Context context, Intent intent) {
			// TODO Auto-generated method stub
			finish();
		}
	}
	


	@Override
	protected void onDestroy() {
		// TODO Auto-generated method stub
		super.onDestroy();
		if (null!=exitReceiver) {
			unregisterReceiver(exitReceiver);
		}
//		cancelLoading() ;
	}
	
	@Override
	protected void onResume()
	{
		super.onResume();
//		MobclickAgent.onResume(this);
	}

	@Override
	protected void onPause()
	{
		super.onPause();
//		MobclickAgent.onPause(this);
	}
	
	public void showLoading(){
		if(loading == null){
			loading = new DataLoadingProgress(this) ;
		}
		if (!loading.isShowing())
			loading.show();
	}

	public void cancelLoading(){
		if(loading != null && loading.isShowing()){
			loading.dismiss();
		}
	}

	public void onMeasure(int widthSpec, int heightSpec) {
		// TODO Auto-generated method stub
		
	}

//	public void setListener(GrabRedpacketListener listener) {
//		this.listener = listener;
//	}
}
