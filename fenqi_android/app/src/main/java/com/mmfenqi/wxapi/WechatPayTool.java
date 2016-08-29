package com.mmfenqi.wxapi;

import java.io.StringReader;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.xmlpull.v1.XmlPullParser;

import android.app.Activity;
import android.app.ProgressDialog;
import android.os.AsyncTask;
import android.util.Log;
import android.util.Xml;

import com.mmfenqi.Bean.PayOrderInfo;
import com.mmfenqi.mmfq.R;
import com.tencent.mm.sdk.modelpay.PayReq;
import com.tencent.mm.sdk.openapi.IWXAPI;
import com.tencent.mm.sdk.openapi.WXAPIFactory;


public class WechatPayTool {
	private static WechatPayTool instance ;
	private Activity mContext ;
	private String money = "";
	private PayReq req;
	private StringBuffer sb;
	private PayOrderInfo mOrder ;
	private Map<String,String> resultunifiedorder;
	private IWXAPI msgApi = null;
	public static WechatPayTool getInstance(){
		if(instance == null){
			instance = new WechatPayTool();
		}
		return instance ;
	}
	/**
	 * 初始化
	 * @param mContext
	 */
	public void init(Activity mContext){
		this.mContext = mContext ;
		msgApi = WXAPIFactory.createWXAPI(mContext, null);
		msgApi.registerApp(Constants.APPID);
		req = new PayReq();
		sb = new StringBuffer();
	}
	/**
	 * 支付入口
	 * @param
	 */
//	public void pay(com.hzpz.ladybugfm.android.bean.MoneyData moneyData ){
	public void pay(){
//		money = moneyData.money + "" ;
//		GetPrepayIdTask task = new GetPrepayIdTask();
//		task.execute();
		Runnable runnable=new Runnable() {
			@Override
			public void run() {
				//获取签名
				genPayReq();
				//发送支付请求
				msgApi.registerApp(Constants.APPID);
				msgApi.sendReq(req);
			}
		};
		Thread thread=new Thread(runnable);
		thread.start();
	}
	

	private String prepayId = null ;
	private class GetPrepayIdTask extends AsyncTask<Void, Void, Map<String,String>> {

		private ProgressDialog dialog;


		@Override
		protected void onPreExecute() {
			dialog = ProgressDialog.show(mContext, "提示", "正在获取预支付订单...");
		}

		
		/**
		 * 相当于Handler 处理UI的方式，在这里面可以使用在doInBackground 得到的结果处理操作UI
		 */
		@Override
		protected void onPostExecute(Map<String,String> result) {
			if (dialog != null) {
				dialog.dismiss();
			}
//			prepayId =  result.get("prepay_id") ;
			prepayId =  Constants.PREPAYID ;
			sb.append("prepay_id\n"+prepayId+"\n\n");
			resultunifiedorder = result;
			//获取签名
			genPayReq();
			//发送支付请求
			msgApi.registerApp(Constants.APPID);
			Log.e("syl", "开始请求:"+req + " result:"+result);
			msgApi.sendReq(req);
			Log.e("syl", "请求结束");
		}

		@Override
		protected void onCancelled() {
			super.onCancelled();
		}

		@Override
		protected Map<String,String>  doInBackground(Void... params) {

			String url = String.format("https://api.mch.weixin.qq.com/pay/unifiedorder");
			String entity = genProductArgs();

			Log.e("syl","entity:"+entity);

			byte[] buf = Util.httpPost(url, entity);

			String content = new String(buf);
			Log.e("syl", "content:"+content);
			Map<String,String> xml= decodeXml(content);

			return xml;
		}
	}
	
	private String genProductArgs() {
		StringBuffer xml = new StringBuffer();

		try {
			String nonceStr = Constants.NONCESTR;
           // String body = new String(mBody.getBytes("UTF-8"), "ISO-8859-1"); 
			xml.append("</xml>");
			List<NameValuePair> packageParams = new LinkedList<NameValuePair>();
			packageParams.add(new BasicNameValuePair("appid", Constants.APPID));
			packageParams.add(new BasicNameValuePair("bank_type", "WX"));
			packageParams.add(new BasicNameValuePair("body", mContext.getString(R.string.app_name)+"微信充值"));
			packageParams.add(new BasicNameValuePair("mch_id", Constants.PARTNERID));
			packageParams.add(new BasicNameValuePair("nonce_str", nonceStr));
//			packageParams.add(new BasicNameValuePair("notify_url",HttpComm.WEICHAT_CALLBACK_URL ));
//			packageParams.add(new BasicNameValuePair("out_trade_no", mOrder.orderid));
			packageParams.add(new BasicNameValuePair("spbill_create_ip","60.12.140.146"));
			packageParams.add(new BasicNameValuePair("total_fee", money));
			packageParams.add(new BasicNameValuePair("trade_type", "APP"));
			//packageParams.add(new BasicNameValuePair("fee_type", "1"));
			
            
//			String sign = genPackageSign(packageParams);
			packageParams.add(new BasicNameValuePair("sign", Constants.PACKAGE));

			String xmlstring = toXml(packageParams);
			String param = new String(xmlstring.getBytes("UTF-8"), "ISO-8859-1");
			return param;

		} catch (Exception e) {
			return null;
		}
		
	}

	/**
	 * 生成APP微信支付参数
	 */
	private void genPayReq() {

		req.appId = Constants.APPID;
		req.partnerId = Constants.PARTNERID;
//		req.prepayId = resultunifiedorder.get("prepay_id");
		req.prepayId = Constants.PREPAYID;
		req.packageValue = "Sign=WXPay";
		req.nonceStr = Constants.NONCESTR;
		req.timeStamp = String.valueOf(Constants.TIMESTAMP);


		List<NameValuePair> signParams = new LinkedList<NameValuePair>();
		signParams.add(new BasicNameValuePair("appid", req.appId));
		signParams.add(new BasicNameValuePair("noncestr", req.nonceStr));
		signParams.add(new BasicNameValuePair("package", req.packageValue));
		signParams.add(new BasicNameValuePair("partnerid", req.partnerId));
		signParams.add(new BasicNameValuePair("prepayid", req.prepayId));
		signParams.add(new BasicNameValuePair("timestamp", req.timeStamp));

//		req.sign = genAppSign(signParams);
		req.sign = Constants.SIGN;
		sb.append("sign\n"+req.sign+"\n\n");


	}
//	private String genAppSign(List<NameValuePair> params) {
//		StringBuilder sb = new StringBuilder();
//
//		for (int i = 0; i < params.size(); i++) {
//			sb.append(params.get(i).getName());
//			sb.append('=');
//			sb.append(params.get(i).getValue());
//			sb.append('&');
//		}
//		sb.append("key=");
//		sb.append(Constants.PREPAYID);
//
//		this.sb.append("sign str\n"+sb.toString()+"\n\n");
//		String appSign = MD5.getMessageDigest(sb.toString().getBytes());
//		return appSign;
//	}
	

	/**
	 生成签名
	 */
//	private String genPackageSign(List<NameValuePair> params) {
//		StringBuilder sb = new StringBuilder();
//
//		for (int i = 0; i < params.size(); i++) {
//			sb.append(params.get(i).getName());
//			sb.append('=');
//			sb.append(params.get(i).getValue());
//			sb.append('&');
//		}
//		sb.append("key=");
//		sb.append(Constants.PREPAYID);
//
//
//		String packageSign = MD5.getMessageDigest(sb.toString().getBytes()).toUpperCase();
//		return packageSign;
//	}
//	private String genNonceStr() {
//		Random random = new Random();
//		return MD5.getMessageDigest(String.valueOf(random.nextInt(10000)).getBytes());
//	}
	
//	private long genTimeStamp() {
//		return System.currentTimeMillis() / 1000;
//	}
	private String toXml(List<NameValuePair> params) {
		StringBuilder sb = new StringBuilder();
		sb.append("<xml>");
		for (int i = 0; i < params.size(); i++) {
			sb.append("<"+params.get(i).getName()+">");


			sb.append(params.get(i).getValue());
			sb.append("</"+params.get(i).getName()+">");
		}
		sb.append("</xml>");

		return sb.toString();
	}
	
	public Map<String,String> decodeXml(String content) {

		try {
			Map<String, String> xml = new HashMap<String, String>();
			XmlPullParser parser = Xml.newPullParser();
			parser.setInput(new StringReader(content));
			int event = parser.getEventType();
			while (event != XmlPullParser.END_DOCUMENT) {

				String nodeName=parser.getName();
				switch (event) {
					case XmlPullParser.START_DOCUMENT:

						break;
					case XmlPullParser.START_TAG:

						if("xml".equals(nodeName)==false){
							//实例化student对象
							xml.put(nodeName,parser.nextText());
						}
						break;
					case XmlPullParser.END_TAG:
						break;
				}
				event = parser.next();
			}

			return xml;
		} catch (Exception e) {
			Log.e("orion",e.toString());
		}
		return null;

	}

	
}
