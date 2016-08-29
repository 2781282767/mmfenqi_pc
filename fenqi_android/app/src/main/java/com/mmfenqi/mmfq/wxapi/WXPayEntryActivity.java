package com.mmfenqi.mmfq.wxapi;


import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.mmfenqi.httpdata.HttpComm;
import com.mmfenqi.mmfq.WebviewActivity;
import com.mmfenqi.wxapi.Constants;
import com.tencent.mm.sdk.constants.ConstantsAPI;
import com.tencent.mm.sdk.modelbase.BaseReq;
import com.tencent.mm.sdk.modelbase.BaseResp;
import com.tencent.mm.sdk.openapi.IWXAPI;
import com.tencent.mm.sdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.sdk.openapi.WXAPIFactory;

public class WXPayEntryActivity extends Activity implements IWXAPIEventHandler{
	private static final String TAG = "MicroMsg.SDKSample.WXPayEntryActivity";

    private IWXAPI api;
    private String reqMoney ;
	
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        setContentView(R.layout.pay_result);
        
    	api = WXAPIFactory.createWXAPI(this, Constants.APPID,false);

        api.handleIntent(getIntent(), this);
    }

	@Override
	protected void onNewIntent(Intent intent) {
		super.onNewIntent(intent);
		setIntent(intent);
        api.handleIntent(intent, this);
	}
	@Override
	protected void onDestroy() {
		// TODO Auto-generated method stub
		super.onDestroy();
		if(dialog != null){
			dialog.dismiss();
		}
	}

	@Override
	public void onReq(BaseReq req) {
		if(req != null){
			
		}
	}
	ProgressDialog dialog ;
	@SuppressLint("LongLogTag")
	@Override
	public void onResp(BaseResp resp) {
		Log.d(TAG, "onPayFinish, errCode = " + resp.errCode);
		Log.d(TAG, "onPayFinish, openId = " + resp.openId);
		Log.d(TAG, "onPayFinish, errStr = " + resp.errStr );
		if (resp.getType() == ConstantsAPI.COMMAND_PAY_BY_WX) {
			if(resp.errCode == 0){
				AlertDialog.Builder builder = new AlertDialog.Builder(this);
				builder.setTitle("微信支付");
				builder.setMessage("微信充值成功!");
				/*builder.setMessage("微信充值失败!" + "/n" + "结果:" + resp.errStr +";code=" + String.valueOf(resp.errCode)
						+ "/n" + resp.toString() +
						"/n transaction =" + resp.transaction
						+ "/n getType=" + resp.getType()
						+ "/n" + resp.openId);*/
				builder.setPositiveButton("确定", new OnClickListener() {

					@Override
					public void onClick(DialogInterface dialog, int which) {
						// TODO Auto-generated method stub
						WebviewActivity.launchActivity(WXPayEntryActivity.this, HttpComm.HOST+Constants.SENDURL,"");
						finish();
					}
				});
				builder.setCancelable(false);
				builder.show();
			}else{
				AlertDialog.Builder builder = new AlertDialog.Builder(this);
				builder.setTitle("微信支付");
				builder.setMessage("微信充值失败!");
				/*builder.setMessage("微信充值失败!" + "/n" + "结果:" + resp.errStr +";code=" + String.valueOf(resp.errCode)
						+ "/n" + resp.toString() +
						"/n transaction =" + resp.transaction
						+ "/n getType=" + resp.getType() 
						+ "/n" + resp.openId);*/
				builder.setPositiveButton("确定", new OnClickListener() {
					
					@Override
					public void onClick(DialogInterface dialog, int which) {
						// TODO Auto-generated method stub
						finish();
					}
				});
				builder.setCancelable(false);
				builder.show();
			}
			
		}
	}
	

}