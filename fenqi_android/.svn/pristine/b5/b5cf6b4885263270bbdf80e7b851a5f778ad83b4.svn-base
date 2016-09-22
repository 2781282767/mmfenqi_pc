package com.mmfenqi.fragment;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.view.inputmethod.EditorInfo;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.AdapterView;
import android.widget.EditText;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.PopupWindow;
import android.widget.TextView;

import com.hzpz.pzlibrary.utils.ToolUtil;
import com.loopj.android.http.RequestParams;
import com.mmfenqi.Bean.City;
import com.mmfenqi.Bean.CityInfos;
import com.mmfenqi.adapter.HotCityGridAdapter;
import com.mmfenqi.app.JScallAndroid;
import com.mmfenqi.app.MmfqApplication;
import com.mmfenqi.dialog.ShareDialog;
import com.mmfenqi.dialog.UploadAvatarDialog;
import com.mmfenqi.httpdata.HttpComm;
import com.mmfenqi.mmfq.CreditActivity;
import com.mmfenqi.mmfq.HomeActivity;
import com.mmfenqi.mmfq.R;
import com.mmfenqi.mmfq.WebviewActivity;
import com.mmfenqi.request.HotCityRequest;
import com.mmfenqi.request.SearchRequest;

import java.util.List;

/**
 * Created by hp on 2016/3/2.
 */
public class HomeFragment extends Fragment implements View.OnClickListener,HomeActivity.LocationCallBack{
    public static final String TAG = "HomeFragment" ;
    private Activity mActivity;
    private Context mContext;
    private View rootView;
    private WebView wbv_home;
    private TextView webviewTitle;//标题
    private TextView tv_adress;//定位地址
    private PopupWindow popupWindow;//定位城市pop
    private GridView gridviewCity;//城市gridview
    private HotCityGridAdapter hotCityGridAdapter;
    private List<CityInfos> cityInfoses;
    private EditText edt_search;
    private TextView tv_search;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mActivity = this.getActivity();
        mContext = this.getActivity();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        rootView=inflater.inflate(R.layout.fragment_home_layout, null);
        initView();
        initData();
        getHotCitysList();
        return rootView;
    }




    /**
     * 初始化view
     */
    private void initView() {
        wbv_home= (WebView) rootView.findViewById(R.id.wbv_home);
        webviewTitle= (TextView) rootView.findViewById(R.id.webviewTitle);
        tv_adress= (TextView) rootView.findViewById(R.id.tv_adress);
        edt_search= (EditText) rootView.findViewById(R.id.edt_search);
        tv_search= (TextView) rootView.findViewById(R.id.tv_search);
        tv_adress.setOnClickListener(this);
        edt_search.setOnClickListener(this);
        tv_search.setOnClickListener(this);

        edt_search.setOnEditorActionListener(new EditText.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                if (actionId == EditorInfo.IME_ACTION_SEARCH) {
                    goToSearch(edt_search.getText().toString());
                    return true;
                }
                return false;
            }
        });
    }

    /**
     * 搜索
     * @param s 搜索内容
     */
    private void goToSearch(final String s) {
        SearchRequest searchRequest = new SearchRequest();
        RequestParams params = new RequestParams();
        params.add("goodsName", s);
        searchRequest.goToSearch(HttpComm.SEARCH_URL, params, new SearchRequest.SearchListener() {
            @Override
            public void success(int statusCode, String message) {
                WebviewActivity.launchActivity(mActivity, HttpComm.SEARCH_HAVE_GOODS_URL + "?goodsName=" + s, "");
            }

            @Override
            public void fail(int statusCode, String statusMsg) {
                ToolUtil.Toast(mActivity, statusMsg);
            }
        });
    }

    /**
     * 加载首页数据
     */
    @SuppressLint("JavascriptInterface")
    private void initData() {
//        WebChromeClient wvcc = new WebChromeClient() {
//            @Override
//            public void onReceivedTitle(WebView view, String title) {
//                super.onReceivedTitle(view, title);
//                webviewTitle.setText(!title.equals("")?title:"");
//            }
//
//        };
        ((HomeActivity)mActivity).setLocationCallBack(this);
        if (!MmfqApplication.locationCity.equals("")){
            tv_adress.setText(MmfqApplication.locationCity);
        }else {
            tv_adress.setText("杭州");
        }
        if(Build.VERSION.SDK_INT >= 19) {
            wbv_home.getSettings().setLoadsImagesAutomatically(true);
        } else {
            wbv_home.getSettings().setLoadsImagesAutomatically(false);
        }
        wbv_home.getSettings().setJavaScriptEnabled(true);
        wbv_home.getSettings().setDefaultTextEncodingName("utf-8");
//        wbv_home.setWebChromeClient(wvcc);

        wbv_home.setOnKeyListener(new View.OnKeyListener() {        // webview can go back
            @Override
            public boolean onKey(View v, int keyCode, KeyEvent event) {
                if (keyCode == KeyEvent.KEYCODE_BACK && wbv_home.canGoBack()) {
                    wbv_home.goBack();
                    return true;
                }
                return false;
            }
        });

        JScallAndroid jsCallAndroid=new JScallAndroid(mActivity);
        wbv_home.addJavascriptInterface(jsCallAndroid, "mmfqAndroid");
        // WebView加载web资源
        wbv_home.loadUrl(HttpComm.MAIN_URL);
        // 覆盖WebView默认使用第三方或系统默认浏览器打开网页的行为，使网页用WebView打开
        wbv_home.setWebViewClient(new WebViewClient() {
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
                if(!wbv_home.getSettings().getLoadsImagesAutomatically()) {
                    wbv_home.getSettings().setLoadsImagesAutomatically(true);
                }
                ((HomeActivity)getActivity()).cancelLoading();
                super.onPageFinished(view, url);
            }
        });

    }

    @Override
    public void onHiddenChanged(boolean hidden) {
        super.onHiddenChanged(hidden);
        if (!hidden){
            // WebView加载web资源
            wbv_home.loadUrl(HttpComm.MAIN_URL);
            if (!MmfqApplication.selectCity.equals("")){
                tv_adress.setText(MmfqApplication.selectCity);
            }else {
                if (!MmfqApplication.locationCity.equals("")){
                    tv_adress.setText(MmfqApplication.locationCity);
                }else{
                    tv_adress.setText("杭州");
                }
            }
        }
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.tv_adress:
                showLocationAdressPop();
                break;
            case R.id.edt_search:

                break;
            case R.id.tv_allCountry:
                tv_adress.setText("全国");
                if (popupWindow!=null){
                    popupWindow.dismiss();
                }
                MmfqApplication.selectCity="全国";
                wbv_home.loadUrl(HttpComm.MAIN_URL);
                break;
            case R.id.tv_search:
//                if (!edt_search.getText().toString().equals("")){
//                    goToSearch(edt_search.getText().toString());
//                }else{
//                    ToolUtil.Toast(mActivity,"搜索内容不能为空！");
//                }
                CreditActivity.launchActivity(mActivity);
                break;

        }
    }

    /**
     * 显示定位地址选择popwindows
     */
    private void showLocationAdressPop() {
        View popView=mActivity.getLayoutInflater().inflate(R.layout.pop_adress_layout, null);
        if (popupWindow==null) {
            popupWindow=new PopupWindow(popView, WindowManager.LayoutParams.MATCH_PARENT,WindowManager.LayoutParams.MATCH_PARENT,true);
            popupWindow.setBackgroundDrawable(new ColorDrawable(0));
            popupWindow.showAsDropDown(rootView.findViewById(R.id.rl_top));

        }else{
            if (popupWindow.isShowing()) {
                popupWindow.dismiss();
            }else{
                popupWindow.setBackgroundDrawable(new ColorDrawable(0));
                popupWindow.showAsDropDown(rootView.findViewById(R.id.rl_top));
            }
        }
        Drawable xingdrawable= mContext.getResources().getDrawable(R.mipmap.icon_arrow_down);
        /// 这一步必须要做,否则不会显示.
        xingdrawable.setBounds(0, 0, xingdrawable.getMinimumWidth(), xingdrawable.getMinimumHeight());
        tv_adress.setCompoundDrawables(null, null, xingdrawable, null);
        // 设置popWindow弹出窗体可点击，这句话必须添加，并且是true
        popupWindow.setOutsideTouchable(true);
        popupWindow.setFocusable(true);
        popupWindow.setOnDismissListener(new PopupWindow.OnDismissListener() {
            @Override
            public void onDismiss() {
                Drawable xingdrawable = mContext.getResources().getDrawable(R.mipmap.icon_arrow_up);
                /// 这一步必须要做,否则不会显示.
                xingdrawable.setBounds(0, 0, xingdrawable.getMinimumWidth(), xingdrawable.getMinimumHeight());
                tv_adress.setCompoundDrawables(null, null, xingdrawable, null);
            }
        });
        TextView tv_location= (TextView) popView.findViewById(R.id.tv_location);
//        tv_location.setOnClickListener(this);
        if (!MmfqApplication.locationCity.equals("")){
            tv_location.setText(MmfqApplication.locationCity);
        }else{
            tv_location.setText("定位失败");
        }
        popView.findViewById(R.id.tv_allCountry).setOnClickListener(this);
        gridviewCity= (GridView) popView.findViewById(R.id.gridviewCity);
        hotCityGridAdapter=new HotCityGridAdapter(mActivity);
        gridviewCity.setAdapter(hotCityGridAdapter);
        if (cityInfoses!=null){
            hotCityGridAdapter.setData(cityInfoses);
        }
        gridviewCity.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                MmfqApplication.selectCity=cityInfoses.get(position).getShowCityName();
                if (popupWindow!=null){
                    popupWindow.dismiss();
                }
                if (!MmfqApplication.selectCity.equals("")&&!tv_adress.getText().equals(MmfqApplication.selectCity)){
                    if (cityInfoses.get(position).getCitys()!=null){
                        City city= (City) cityInfoses.get(position).getCitys();
                        wbv_home.loadUrl(HttpComm.SELECT_CITY_URL+"?cityId="+city.getCityid());
                        Log.e("selectCity",HttpComm.SELECT_CITY_URL+"?cityId="+city.getCityid());
                    }
                }
                tv_adress.setText(cityInfoses.get(position).getShowCityName());
            }
        });
    }

    /**
     * 获取最热城市列表
     */
    public void getHotCitysList(){
        HotCityRequest HotCityRequest=new HotCityRequest();
        HotCityRequest.getHotCitys(new HotCityRequest.HotCityListener() {
            @Override
            public void success(List<CityInfos> list) {
                if (list!=null){
                    cityInfoses=list;
                }
            }

            @Override
            public void fail(int statusCode, String statusMsg) {
                ToolUtil.Toast(mActivity,"热门城市获取失败！");
            }
        });
    }


    /**
     * 如果定位成功，回调城市，更改ui
     * @param city
     */
    @Override
    public void callCity(String city) {
        tv_adress.setText(city);
    }
}
