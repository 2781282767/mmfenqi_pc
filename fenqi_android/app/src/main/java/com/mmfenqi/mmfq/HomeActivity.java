package com.mmfenqi.mmfq;

import android.annotation.SuppressLint;
import android.app.ActivityManager;
import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.widget.Button;
import android.widget.RadioGroup;
import android.widget.TextView;

import com.baidu.location.BDLocation;
import com.baidu.location.BDLocationListener;
import com.baidu.location.LocationClient;
import com.baidu.location.LocationClientOption;
import com.mmfenqi.app.MmfqApplication;
import com.mmfenqi.fragment.DoctorFragment;
import com.mmfenqi.fragment.HomeFragment;
import com.mmfenqi.fragment.IndianaFragment;
import com.mmfenqi.fragment.MineFragment;
import com.mmfenqi.fragment.ServiceFragment;

import java.util.ArrayList;
import java.util.List;

public class HomeActivity extends BaseActivity implements View.OnClickListener {
    private List<Fragment> mFragments = new ArrayList<Fragment>();
    private TextView tv_adress;//定位地址
    private FragmentManager fm ;
    private RadioGroup rg;//底部按钮
    public LocationClient mLocationClient = null;
    public MyLocationListener myListener ;
    private LocationCallBack callBack ;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home, false);


        initView();
        fm = getSupportFragmentManager();
        FragmentTransaction tr = fm.beginTransaction();
        if (fm.findFragmentByTag(HomeFragment.TAG) != null)
            tr.remove(fm.findFragmentByTag(HomeFragment.TAG));
        if (fm.findFragmentByTag(DoctorFragment.TAG) != null)
            tr.remove(fm.findFragmentByTag(DoctorFragment.TAG));
        if (fm.findFragmentByTag(IndianaFragment.TAG) != null)
            tr.remove(fm.findFragmentByTag(IndianaFragment.TAG));
//        if (fm.findFragmentByTag(ServiceFragment.TAG) != null)
//            tr.remove(fm.findFragmentByTag(ServiceFragment.TAG));
        if (fm.findFragmentByTag(MineFragment.TAG) != null)
            tr.remove(fm.findFragmentByTag(MineFragment.TAG));
        rg = (RadioGroup) findViewById(R.id.rgBottom);
        rg.setOnCheckedChangeListener(menuItemChecked);

        rg.check(R.id.rbHome);

        initLocation();
    }

    /**
     * 开启定位
     */
    private void initLocation() {
        mLocationClient = new LocationClient(getApplicationContext());     //声明LocationClient类
        myListener = new MyLocationListener();
        mLocationClient.registerLocationListener(myListener);

        LocationClientOption option = new LocationClientOption();
        option.setOpenGps(true);
        option.setIsNeedAddress(true);// 返回的定位结果包含地址信息
        option.setAddrType("all");// 返回的定位结果包含地址信息
        option.setCoorType("bd09ll");// 返回的定位结果是百度经纬度,默认值gcj02
        option.setScanSpan(-1);// 设置发起定位请求的间隔时间为5000ms
        option.disableCache(true);// 禁止启用缓存定位
        mLocationClient.setLocOption(option);


        mLocationClient.start();// 开始定位


        if (mLocationClient != null && mLocationClient.isStarted()){
            mLocationClient.requestLocation();
        }else{
            Log.d("LocSDK3", "locClient is null or not started");
        }
    }


    /**
     * 初始化view
     */
    private void initView() {
    }

    @Override
    public void onClick(View v) {
        int id=v.getId();
        switch (id){
            case R.id.btOK:
            if (dialog != null && dialog.isShowing()) {
                dialog.dismiss();
                exitApp();
            }
            break;
            case R.id.btCancel:
                if (dialog != null && dialog.isShowing()) {
                    dialog.dismiss();
                }
                break;
            default:
                break;
        }
    }

    private RadioGroup.OnCheckedChangeListener menuItemChecked = new RadioGroup.OnCheckedChangeListener() {

        @SuppressLint("Recycle")
        @Override
        public void onCheckedChanged(RadioGroup group, int checkedId) {
            // TODO Auto-generated method stub
            FragmentTransaction transaction = fm.beginTransaction() ;
            Fragment tag = (Fragment) group.getTag();
            if (tag != null) {
                transaction.hide(tag);
            }
            Fragment fg = null;
            switch (checkedId) {
                case R.id.rbHome://首页
                    fg = fm.findFragmentByTag(HomeFragment.TAG);
                    if (fg == null) {
                        fg = new HomeFragment();
                        transaction.add(R.id.fl_content, fg, HomeFragment.TAG);
                    } else {
                        transaction.show(fg);
                    }
                    break;
                case R.id.rbIndiana://夺宝
                    fg = fm.findFragmentByTag(IndianaFragment.TAG);
                    if (fg == null) {
                        fg = new IndianaFragment();
                        transaction.add(R.id.fl_content, fg, IndianaFragment.TAG);
                    } else {
                        transaction.show(fg);
                    }
                    break;
//                case R.id.rbService://客服
//                    fg = fm.findFragmentByTag(ServiceFragment.TAG);
//                    if (fg == null) {
//                        fg = new ServiceFragment();
//                        transaction.add(R.id.fl_content, fg, ServiceFragment.TAG);
//                    } else {
//                        transaction.show(fg);
//                    }
//                    break;
                case R.id.rbDoctor://医生
                    fg = fm.findFragmentByTag(DoctorFragment.TAG);
                    if (fg == null) {
                        fg = new DoctorFragment();
                        transaction.add(R.id.fl_content, fg, DoctorFragment.TAG);
                    } else {
                        transaction.show(fg);
                    }
                    break;
                case R.id.rbMine://个人
                    fg = fm.findFragmentByTag(MineFragment.TAG);
                    if (fg == null) {
                        fg = new MineFragment();
                        transaction.add(R.id.fl_content, fg, MineFragment.TAG);
                    } else {
                        transaction.show(fg);
                    }
                    break;

                default:
                    break;
            }
            group.setTag(fg);
            transaction.commitAllowingStateLoss();
        }
    };

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        switch(keyCode){
            case KeyEvent.KEYCODE_BACK:
                showExitDialog();
                break;
        }
        return super.onKeyDown(keyCode, event);
    }


    /**
     * 显示退出对话框
     */
    public Dialog dialog ;
    private void showExitDialog() {
        View dialogView = getLayoutInflater().inflate(
                R.layout.exit_dialog_layout, null);

        ((Button) dialogView.findViewById(R.id.btOK)).setOnClickListener(this);
        ((Button) dialogView.findViewById(R.id.btCancel))
                .setOnClickListener(this);

        dialog = new Dialog(this, R.style.MyDialog);
        dialog.setContentView(dialogView);
        dialog.show();
    }
    private void exitApp(){
        MmfqApplication.getInstance().exit() ;
        int currentVersion = android.os.Build.VERSION.SDK_INT;
        if (currentVersion > android.os.Build.VERSION_CODES.ECLAIR_MR1) {
		    /*Intent startMain = new Intent(Intent.ACTION_MAIN);
		    startMain.addCategory(Intent.CATEGORY_HOME);
		    startMain.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);    */
            android.os.Process.killProcess(android.os.Process.myPid());
            System.exit(0);
        } else {// android2.1
            ActivityManager am = (ActivityManager)getSystemService(Context.ACTIVITY_SERVICE);
            am.restartPackage(getPackageName());

        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        fm.findFragmentByTag(MineFragment.TAG).onActivityResult(requestCode,resultCode,data);
        super.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    protected void onDestroy() {
//        lt.stopLocation();
        super.onDestroy();
    }

    public class MyLocationListener implements BDLocationListener {
        @Override
        public void onReceiveLocation(BDLocation location) {
            if (location == null)
                return ;
//            StringBuffer sb = new StringBuffer(256);
//            sb.append("time : ");
//            sb.append(location.getTime());
//            sb.append("\nerror code : ");
//            sb.append(location.getLocType());
//            sb.append("\nlatitude : ");
//            sb.append(location.getLatitude());
//            sb.append("\nlontitude : ");
//            sb.append(location.getLongitude());
//            sb.append("\nradius : ");
//            sb.append(location.getRadius());
//            if (location.getLocType() == BDLocation.TypeGpsLocation){
//                sb.append("\nspeed : ");
//                sb.append(location.getSpeed());
//                sb.append("\nsatellite : ");
//                sb.append(location.getSatelliteNumber());
//            } else if (location.getLocType() == BDLocation.TypeNetWorkLocation){
//                sb.append("\naddr : ");
//                sb.append(location.getAddrStr());
//            }
            MmfqApplication.locationCity=location.getCity();
            callBack.callCity(location.getCity());
        }
        public void onReceivePoi(BDLocation poiLocation) {}
    }

    /**
     * 定位城市回调
     */
    public interface LocationCallBack{
        void callCity(String city);
    }
    public void setLocationCallBack(LocationCallBack callBack){
        this.callBack=callBack;
    }
}
