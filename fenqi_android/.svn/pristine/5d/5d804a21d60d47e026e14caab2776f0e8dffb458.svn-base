package com.mmfenqi.mmfq;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.android.moblie.zmxy.antgroup.creditsdk.app.CreditApp;
import com.android.moblie.zmxy.antgroup.creditsdk.app.ICreditListener;
import com.hzpz.pzlibrary.utils.PreferenceUtil;
import com.hzpz.pzlibrary.utils.ToolUtil;
import com.loopj.android.http.RequestParams;
import com.mmfenqi.fragment.MineFragment;
import com.mmfenqi.httpdata.HttpComm;
import com.mmfenqi.httpdata.UserComm;
import com.mmfenqi.request.GetZMScoreRequest;

import java.util.Set;

public class ZMApproveActivity extends BaseActivity implements View.OnClickListener{
    private String TAG="ZMApproveActivity";
    private Button bt_approving;//立即授权
    private String token="";
    private CreditApp creditApp;
    //芝麻信用appid
    private String appId="1000320";
    //芝麻信用scene
    private String scene="美眉分期接入芝麻信用";

    private String url="http://pro.mmfenqi.com:9090/appZMXY/getParams";
    private String zmParams="";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_zmapprove,true);
        // CreditApp 类是 SDK 的主要实现类，开发者可通过 CreditApp 类访问芝麻信用的授权等 API。
        // 传入应用程序的全局 context，可通过 activity 的 getApplicationContext 方法获取
        creditApp = CreditApp.getOrCreateInstance(this.getApplicationContext());
        initView();
        initListener();
        initData();
    }
    /**
     * 初始化布局
     */
    private void initView() {
        setTitle("芝麻信用授权");
        bt_approving= (Button)findViewById(R.id.bt_approving);
    }
    /**
     * 设置监听
     */
    private void initListener() {
        bt_approving.setOnClickListener(this);
    }
    /**
     * 设置数据
     */
    private void initData() {
        token=PreferenceUtil.getString(this, MineFragment.TOKEN_FLAG);

    }
    /**
     * 页面跳转
     * @param act
     */
    public static void launchActivity(Activity act) {
        Intent intent = new Intent(act, ZMApproveActivity.class);
        act.startActivity(intent);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.bt_approving:
                getZMApproveScore();
                break;
        }
    }
    /**
     * 获取芝麻授权并获取芝麻信用分数
     */
    private void getZMApproveScore(){
        GetZMScoreRequest getZMScoreRequest = new GetZMScoreRequest();
        RequestParams params = new RequestParams();
        params.put("token",token);
        getZMScoreRequest.getScore(HttpComm.ZMXY_SCORE_URL, params, new GetZMScoreRequest.GetZMScoreListener() {
            @Override
            public void success(int statusCode, String score, String params, String sign) {
                if (statusCode==0){
                    if (score!=null&&!score.equals("")){
                        ToolUtil.Toast(ZMApproveActivity.this,"芝麻信用分为="+score);
                    }else{
                        creditApp.authenticate(ZMApproveActivity.this, appId, scene, params, sign, null, iCreditListener);
                    }
                }
            }

            @Override
            public void fail(int statusCode, String statusMsg) {

            }
        });

    }


    ICreditListener iCreditListener = new ICreditListener() {
        @Override
        public void onComplete(Bundle result) {
            ToolUtil.Toast(ZMApproveActivity.this,"complete");
            if (result != null) {
                Set<String> keys = result.keySet();
                for (String key : keys) {

//                    Log.d(TAG, key + " = " + result.getString(key));

                    if (keys.contains("params")){
                        zmParams = result.getString(key);
                        GetZMScoreRequest getZMScoreRequest = new GetZMScoreRequest();
                        RequestParams params = new RequestParams();
                        params.add("params",zmParams);
                        params.put("token",token);
                        getZMScoreRequest.getScore(url, params, new GetZMScoreRequest.GetZMScoreListener() {

                            @Override
                            public void success(int statusCode, String score, String params, String sign) {
                                ToolUtil.Toast(ZMApproveActivity.this,"成功  score=" + score);

                            }

                            @Override
                            public void fail(int statusCode, String statusMsg) {

                            }
                        });
                        return;
                    }
                }
            }
        }

        @Override
        public void onError(Bundle error) {
            ToolUtil.Toast(ZMApproveActivity.this, "error");
            if (error != null) {
                Set<String> keys = error.keySet();
                for (String key : keys) {
                    Log.d(TAG, key + " = " + error.getString(key));
                }
            }
        }

        @Override
        public void onCancel() {
            ToolUtil.Toast(ZMApproveActivity.this, "cancel");
        }
    };
}
