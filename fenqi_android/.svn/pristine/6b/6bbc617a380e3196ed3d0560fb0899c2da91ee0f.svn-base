package com.mmfenqi.mmfq;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Log;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ImageView;
import android.widget.TextView;

import com.hzpz.pzlibrary.utils.Base64;
import com.hzpz.pzlibrary.utils.PreferenceUtil;
import com.hzpz.pzlibrary.utils.StringUtil;
import com.hzpz.pzlibrary.utils.ToolUtil;
import com.loopj.android.http.RequestParams;
import com.mmfenqi.app.JScallAndroid;
import com.mmfenqi.dialog.ShareDialog;
import com.mmfenqi.dialog.UploadAvatarDialog;
import com.mmfenqi.fragment.MineFragment;
import com.mmfenqi.httpdata.HttpComm;
import com.mmfenqi.request.UpLoadPicRequest;

import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;

public class WebviewActivity extends BaseActivity implements JScallAndroid.JSCallShareListener,JScallAndroid.JSCallPhoneListener{
	private WebView webView;
	private TextView webback;
	private TextView webviewTitle;
	private String title;
	private String upLoadPicUrl = "";
	/** 处理过后的头像bitmap */
	private Bitmap photo;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_webview);
		init();
	}

	@SuppressLint("JavascriptInterface")
	private void init() {
		String loadUrl = getIntent().getStringExtra("loadurl");
		if (StringUtil.isBlank(loadUrl) || !loadUrl.startsWith("http")) {
			ToolUtil.Toast(this, "地址错误");
			finish();
			return;
		}

		webView = (WebView) findViewById(R.id.interaction_web);
		webView.getSettings().setJavaScriptEnabled(true);
		webback = (TextView) findViewById(R.id.webBack);

		webviewTitle = (TextView) findViewById(R.id.webviewTitle);
//		title=getIntent().getStringExtra("title");
//		webviewTitle.setText(title);

		WebChromeClient wvcc = new WebChromeClient() {
			@Override
			public void onReceivedTitle(WebView view, String title) {
				webviewTitle.setText(title);
				super.onReceivedTitle(view, title);
			}

		};
		webView.setWebChromeClient(wvcc);
		// WebView加载web资源
		webView.loadUrl(loadUrl);
		//JS调用安卓方法
		JScallAndroid jsCallAndroid=new JScallAndroid(this);
		jsCallAndroid.setShareListener(this);
		jsCallAndroid.setPhoneListener(this);
		webView.addJavascriptInterface(jsCallAndroid, "mmfqAndroid");
		// 覆盖WebView默认使用第三方或系统默认浏览器打开网页的行为，使网页用WebView打开
		webView.setWebViewClient(new WebViewClient() {

			@Override
			public void onPageStarted(WebView view, String url, Bitmap favicon) {
				showLoading();
				super.onPageStarted(view, url, favicon);
			}

			@Override
			public boolean shouldOverrideUrlLoading(WebView view, String url) {
				// TODO Auto-generated method stub
				// 返回值是true的时候控制去WebView打开，为false调用系统浏览器或第三方浏览器
				view.loadUrl(url);
				return true;
			}
			@Override
			public void onPageFinished(WebView view, String url) {
				cancelLoading();
				super.onPageFinished(view, url);
			}
		});


		webback.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				if (webView.canGoBack()) {
					webView.goBack();
				}else{
					finish();
				}
			}
		});
	}

	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if ((keyCode == KeyEvent.KEYCODE_BACK)) {
			System.out.println(webView.canGoBack());
			if (webView.canGoBack()) {
				webView.goBack();
				return true;
			}
		}
		return super.onKeyDown(keyCode, event);
	}

	public static void launchActivity(Activity act, String loadUrl,String title) {
		Intent intent = new Intent(act, WebviewActivity.class);
		intent.putExtra("loadurl", loadUrl);
		intent.putExtra("title", title);
		act.startActivity(intent);
	}

	/**
	 * 分享回调
	 * @param kLinkTitle
	 * @param kLinkDescription
	 * @param kLinkImg
	 * @param kLinkURL
	 */
	@Override
	public void call(String kLinkTitle, String kLinkDescription, String kLinkImg, String kLinkURL) {
		ShareDialog shar = new ShareDialog(this, this);
		shar.setShowInfo(kLinkURL,kLinkTitle,kLinkDescription, kLinkImg);
		Window win = shar.getWindow();
		win.setGravity(Gravity.BOTTOM);
		shar.show();
	}


	public static final int REQUEST_CODE_CAMERA = 101;    //调用摄像头参数
	public static final int REQUEST_CODE_GALLERY = 100;   //从本地相册取照片参数

	private UploadAvatarDialog uploadAvatarDialog;  //设置头像dialog

	/**
	 * 上传头像
	 */
	private void updateHead() {
		if (uploadAvatarDialog == null) {
			uploadAvatarDialog = new UploadAvatarDialog(this, this);
		}
		uploadAvatarDialog.setListener(new WebviewActivity.UploadListener());
		uploadAvatarDialog.show();
	}

	/**
	 * JScallAndroid类的上传头像回调
	 */
	@Override
	public void call(String type, String message) {
		switch (Integer.parseInt(type)) {
			case 3:
				upLoadPicUrl = message;
				updateHead();
				break;
		}
	}

	/**
	 * 退出登录
	 */
	private void logOut(String url) {
		UpLoadPicRequest upLoadPicRequest = new UpLoadPicRequest();
		RequestParams params = new RequestParams();
		upLoadPicRequest.upLoadPic(HttpComm.HOST+url, params, new UpLoadPicRequest.UpLoadPicListener() {
			@Override
			public void success(JSONObject response) {
				WebviewActivity.this.runOnUiThread(new Runnable() {
					@Override
					public void run() {
						// WebView加载web资源
						webView.loadUrl(HttpComm.MINE_URL);
					}
				});
			}
			@Override
			public void fail(int statusCode, String statusMsg) {

			}
		});
	}



	/**
	 * 保存登录token值
	 * @param token
	 */
	private void saveLoginToken(String token){
		PreferenceUtil.putString(this, MineFragment.TOKEN_FLAG, token);
	}



	/**
	 * 上传头像回调函数
	 * @author sunyl
	 *
	 */
	public  class UploadListener implements UploadAvatarDialog.UploadAvatarListener {

		@Override
		public void camera() {
			Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
			intent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(new File(Environment.getExternalStorageDirectory(), "headcover.jpg")));// 指定调用相机拍照后的照片存储的路径
			startActivityForResult(intent, REQUEST_CODE_CAMERA);
		}

		@Override
		public void choose() {
			Intent intent = new Intent(Intent.ACTION_PICK, null);
			intent.setDataAndType(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, "image/*");
			startActivityForResult(intent, REQUEST_CODE_GALLERY);
		}


	}

	@Override
	public void onActivityResult(int requestCode, int resultCode, Intent data) {
		if (resultCode == Activity.RESULT_OK) {
			switch (requestCode) {
				// 直接从相册获取
				case REQUEST_CODE_GALLERY:
					startPhotoZoom(data.getData());
					break;
				// 调用相机拍照时
				case REQUEST_CODE_CAMERA:
					File temp = new File(Environment.getExternalStorageDirectory() + "/headcover.jpg");
					startPhotoZoom(Uri.fromFile(temp));
					break;
				// 取得裁剪后的图片
				case 3:
					if (data != null) {
						setPicToView(data);
					}
					break;
			}
		}
		super.onActivityResult(requestCode, resultCode, data);
	}


	/**
	 * 裁剪图片方法实现
	 *
	 * @param uri
	 */
	public void startPhotoZoom(Uri uri) {
		Intent intent = new Intent("com.android.camera.action.CROP");
		intent.setDataAndType(uri, "image/*");
		intent.putExtra("crop", "true");
		// aspectX aspectY 是宽高的比例
		intent.putExtra("aspectX", 1);
		intent.putExtra("aspectY", 1);
		// outputX outputY 是裁剪图片宽高
		intent.putExtra("outputX", 80);
		intent.putExtra("outputY", 80);
		intent.putExtra("return-data", true);
		startActivityForResult(intent, 3);
	}

	/**
	 * 保存裁剪之后的图片数据
	 *
	 * @param picdata
	 */
	private String mEncoderBase64;
	@SuppressLint("NewApi")
	private void setPicToView(Intent picdata) {
		Bundle extras = picdata.getExtras();
		if (extras != null) {
			photo = extras.getParcelable("data");
			ByteArrayOutputStream stream = new ByteArrayOutputStream();
			photo.compress(Bitmap.CompressFormat.JPEG, 60, stream);
			byte[] b = stream.toByteArray(); // 将图片流以字符串形式存储下来
//            ivHead.setImageBitmap(ToolUtil.getRoundedCornerBitmap(photo, 2));
			mEncoderBase64 = Base64.encode(b);// 返回Base64编码过的字节数组字符串
		}
		upLoadToken();

	}

	/**
	 * 上传图片至服务端
	 */
	private void upLoadPic(){
		UpLoadPicRequest upLoadPicRequest=new UpLoadPicRequest();
		RequestParams params=new RequestParams();
		params.put("pic", mEncoderBase64);
		Log.e("AAAAA", HttpComm.HOST + upLoadPicUrl);
		upLoadPicRequest.upLoadPic(HttpComm.HOST + upLoadPicUrl, params, new UpLoadPicRequest.UpLoadPicListener() {
			@Override
			public void success(JSONObject response) {
				webView.loadUrl("javascript: bridgeAndr("+response+")");
//                ToolUtil.Toast(mActivity, "走了success");
			}

			@Override
			public void fail(int statusCode, String statusMsg) {

			}
		});
	}

	/**
	 * 上传登录token
	 */
	private void upLoadToken() {
		String token=PreferenceUtil.getString(this, MineFragment.TOKEN_FLAG);
		if (token!=null&&!token.equals("")){
			UpLoadPicRequest upLoadPicRequest = new UpLoadPicRequest();
			RequestParams params = new RequestParams();
			params.add("appToken",token);
			upLoadPicRequest.upLoadPic(HttpComm.UPLOAD_TOKEN_URL, params, new UpLoadPicRequest.UpLoadPicListener() {
				@Override
				public void success(JSONObject response) {
					upLoadPic();
				}
				@Override
				public void fail(int statusCode, String statusMsg) {

				}
			});
		}
	}
}
