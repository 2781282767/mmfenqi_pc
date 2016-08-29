package com.mmfenqi.mmfq;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

import com.hzpz.pzlibrary.utils.PreferenceUtil;
import com.loopj.android.http.RequestParams;
import com.mmfenqi.fragment.MineFragment;
import com.mmfenqi.httpdata.HttpComm;
import com.mmfenqi.request.UpLoadPicRequest;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Timer;
import java.util.TimerTask;

public class LoadingActivity extends BaseActivity {
    private TimerTask timerTask;
    private Timer timer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_loading, false);
        initTime();
        upLoadToken();
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
                    try {
                        JSONObject data= (JSONObject) response.get("data");
                        if (data!=null&&data.has("isTokenEff")){
                            String isTokenEff = data.optString("isTokenEff");
                            if (isTokenEff.equals("false")){
                                PreferenceUtil.putString(LoadingActivity.this,MineFragment.TOKEN_FLAG,"");
                            }
                        }
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }

                @Override
                public void fail(int statusCode, String statusMsg) {

                }
            });
        }
    }

    /**
     * 计时3秒跳入主页
     */
    private void initTime() {
        timerTask=new TimerTask() {
            @Override
            public void run() {
                mHandler.sendEmptyMessage(0);
            }
        };
        timer=new Timer();
        timer.schedule(timerTask,3000,3000);

    }


    /**
     * 跳转主页
     */
    private Handler mHandler = new Handler() {
        public void handleMessage(android.os.Message msg) {
            startActivity(new Intent(LoadingActivity.this, HomeActivity.class));
            timerTask.cancel();
            timer.cancel();
            finish();
        };
    };

    @Override
    protected void onDestroy() {
        timerTask.cancel();
        timer.cancel();
        super.onDestroy();
    }
}
