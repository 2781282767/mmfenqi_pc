package com.mmfenqi.fragment;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;

import com.hzpz.pzlibrary.utils.Base64;
import com.hzpz.pzlibrary.utils.PreferenceUtil;
import com.hzpz.pzlibrary.utils.ToolUtil;
import com.loopj.android.http.RequestParams;
import com.mmfenqi.app.JScallAndroid;
import com.mmfenqi.dialog.ShareDialog;
import com.mmfenqi.dialog.UploadAvatarDialog;
import com.mmfenqi.httpdata.HttpComm;
import com.mmfenqi.mmfq.CreditActivity;
import com.mmfenqi.mmfq.HomeActivity;
import com.mmfenqi.mmfq.R;
import com.mmfenqi.request.UpLoadPicRequest;

import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;

/**
 * Created by hp on 2016/3/2.
 */
public class MineFragment extends Fragment implements View.OnClickListener, JScallAndroid.JSCallPhoneListener {
    public static final String TAG = "MineFragment";
    public static final String TOKEN_FLAG = "login_token";
    private Activity mActivity;
    private Context mContext;
    private View rootView;
    private WebView wbv_mine;
    /** 处理过后的头像bitmap */
    private Bitmap photo;
    private String upLoadPicUrl = "";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mActivity = this.getActivity();
        mContext = this.getActivity();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        rootView = inflater.inflate(R.layout.fragment_mine_layout, null);
        initView();
//        暂时先不用渲染webview了，先调通内部程序
        initData();
//        tempInitView();
        return rootView;
    }



    /**
     * 初始化view
     */
    private void initView() {
        wbv_mine = (WebView) rootView.findViewById(R.id.wbv_mine);
//        webviewTitle= (TextView) rootView.findViewById(R.id.webviewTitle);
    }

    /**
     * 加载首页数据
     */
    @SuppressLint("JavascriptInterface")
    private void initData() {
        WebChromeClient wvcc = new WebChromeClient() {
            @Override
            public void onReceivedTitle(WebView view, String title) {
                super.onReceivedTitle(view, title);
//                webviewTitle.setText(title);
            }

        };
        if (Build.VERSION.SDK_INT >= 19) {
            wbv_mine.getSettings().setLoadsImagesAutomatically(true);
        } else {
            wbv_mine.getSettings().setLoadsImagesAutomatically(false);
        }
        wbv_mine.getSettings().setJavaScriptEnabled(true);


        wbv_mine.setWebChromeClient(wvcc);
        // WebView加载web资源
        wbv_mine.loadUrl(HttpComm.MINE_URL);


        JScallAndroid jsCallAndroid = new JScallAndroid(mActivity);
        jsCallAndroid.setPhoneListener(this);
        wbv_mine.addJavascriptInterface(jsCallAndroid, "mmfqAndroid");

        // 覆盖WebView默认使用第三方或系统默认浏览器打开网页的行为，使网页用WebView打开
        wbv_mine.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                if (getActivity() != null) {
                    ((HomeActivity) getActivity()).showLoading();
                }
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
                if (!wbv_mine.getSettings().getLoadsImagesAutomatically()) {
                    wbv_mine.getSettings().setLoadsImagesAutomatically(true);
                }
                ((HomeActivity) getActivity()).cancelLoading();
                super.onPageFinished(view, url);
            }
        });

        wbv_mine.setOnKeyListener(new View.OnKeyListener() {        // webview can go back
            @Override
            public boolean onKey(View v, int keyCode, KeyEvent event) {
                if (keyCode == KeyEvent.KEYCODE_BACK && wbv_mine.canGoBack()) {
                    wbv_mine.goBack();
                    return true;
                }
                return false;
            }
        });
    }

    @Override
    public void onHiddenChanged(boolean hidden) {
        super.onHiddenChanged(hidden);
        if (!hidden) {
            // WebView加载web资源
            wbv_mine.loadUrl(HttpComm.MINE_URL);
        }
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.webBack:
                if (wbv_mine.canGoBack()) {
                    wbv_mine.goBack();
                }
                break;
        }
    }


    public static final int REQUEST_CODE_CAMERA = 101;    //调用摄像头参数
    public static final int REQUEST_CODE_GALLERY = 100;   //从本地相册取照片参数

    private UploadAvatarDialog uploadAvatarDialog;  //设置头像dialog

    /**
     * 上传头像
     */
    private void updateHead() {
        if (uploadAvatarDialog == null) {
            uploadAvatarDialog = new UploadAvatarDialog(mActivity, mActivity);
        }
        uploadAvatarDialog.setListener(new MineFragment.UploadListener());
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
            case 4:
                saveLoginToken(message);
                break;
            case 6://退出登录
                logOut(message);
                break;
        }
    }

    /**
     * 退出登录
     */
    private void logOut(String url) {
        ((HomeActivity)mActivity).showLoading();
        UpLoadPicRequest upLoadPicRequest = new UpLoadPicRequest();
        RequestParams params = new RequestParams();
        upLoadPicRequest.upLoadPic(HttpComm.HOST + url, params, new UpLoadPicRequest.UpLoadPicListener() {
            @Override
            public void success(JSONObject response) {
                ((HomeActivity)mActivity).cancelLoading();
                mActivity.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        // WebView加载web资源
                        wbv_mine.loadUrl(HttpComm.MINE_URL);
                    }
                });
            }

            @Override
            public void fail(int statusCode, String statusMsg) {
                ((HomeActivity)mActivity).cancelLoading();

            }
        });
    }



    /**
     * 保存登录token值
     * @param token
     */
    private void saveLoginToken(String token){
        PreferenceUtil.putString(mActivity, TOKEN_FLAG, token);
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
            mActivity.startActivityForResult(intent, REQUEST_CODE_CAMERA);
        }

        @Override
        public void choose() {
            Intent intent = new Intent(Intent.ACTION_PICK, null);
            intent.setDataAndType(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, "image/*");
            mActivity.startActivityForResult(intent, REQUEST_CODE_GALLERY);
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
        mActivity.startActivityForResult(intent, 3);
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
                wbv_mine.loadUrl("javascript: bridgeAndr("+response+")");
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
        String token=PreferenceUtil.getString(mActivity, MineFragment.TOKEN_FLAG);
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
