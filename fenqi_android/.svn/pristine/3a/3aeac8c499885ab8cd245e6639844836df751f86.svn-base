package com.mmfenqi.fragment;

import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.TextView;

import com.mmfenqi.app.JScallAndroid;
import com.mmfenqi.httpdata.HttpComm;
import com.mmfenqi.mmfq.HomeActivity;
import com.mmfenqi.mmfq.R;

/**
 * Created by hp on 2016/3/2.
 */
public class DoctorFragment extends Fragment implements View.OnClickListener{
    public static final String TAG = "DoctorFragment" ;
    private Activity mActivity;
    private Context mContext;
    private View rootView;
    private WebView wbv_doctor;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mActivity = this.getActivity();
        mContext = this.getActivity();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        rootView=inflater.inflate(R.layout.fragment_doctor_layout,null);
        initView();
        initData();
        return rootView;
    }
    /**
     * 初始化view
     */
    private void initView() {
        wbv_doctor= (WebView) rootView.findViewById(R.id.wbv_doctor);
//        webviewTitle= (TextView) rootView.findViewById(R.id.webviewTitle);
    }
    /**
     * 加载首页数据
     */
    private void initData() {
        WebChromeClient wvcc = new WebChromeClient() {
            @Override
            public void onReceivedTitle(WebView view, String title) {
                super.onReceivedTitle(view, title);
//                webviewTitle.setText(title);
            }

        };
        if(Build.VERSION.SDK_INT >= 19) {
            wbv_doctor.getSettings().setLoadsImagesAutomatically(true);
        } else {
            wbv_doctor.getSettings().setLoadsImagesAutomatically(false);
        }
        wbv_doctor.getSettings().setJavaScriptEnabled(true);

        JScallAndroid jsCallAndroid=new JScallAndroid(mActivity);
        wbv_doctor.addJavascriptInterface(jsCallAndroid, "mmfqAndroid");

        wbv_doctor.setWebChromeClient(wvcc);
        // WebView加载web资源
        wbv_doctor.loadUrl(HttpComm.DOCTOR_URL);
        // 覆盖WebView默认使用第三方或系统默认浏览器打开网页的行为，使网页用WebView打开
        wbv_doctor.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                if (getActivity()!=null){
                    ((HomeActivity)getActivity()).showLoading();
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
                if(!wbv_doctor.getSettings().getLoadsImagesAutomatically()) {
                    wbv_doctor.getSettings().setLoadsImagesAutomatically(true);
                }
                ((HomeActivity)getActivity()).cancelLoading();
                super.onPageFinished(view, url);
            }
        });
        wbv_doctor.setOnKeyListener(new View.OnKeyListener() {        // webview can go back
            @Override
            public boolean onKey(View v, int keyCode, KeyEvent event) {
                if (keyCode == KeyEvent.KEYCODE_BACK && wbv_doctor.canGoBack()) {
                    wbv_doctor.goBack();
                    return true;
                }
                return false;
            }
        });

    }
    @Override
    public void onHiddenChanged(boolean hidden) {
        super.onHiddenChanged(hidden);
        if (!hidden){
            // WebView加载web资源
            wbv_doctor.loadUrl(HttpComm.DOCTOR_URL);
        }
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
//            case R.id.webBack:
//                if (wbv_home.canGoBack()) {
//                    wbv_home.goBack();
//                }
//                break;
        }
    }
}
