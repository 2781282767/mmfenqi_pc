package com.mmfenqi.fragment;

import android.app.Activity;
import android.content.Context;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.mmfenqi.Bean.RecognizeInfo;
import com.mmfenqi.mmfq.CreditActivity;
import com.mmfenqi.mmfq.R;
import com.mmfenqi.mmfq.ZMApproveActivity;
import com.mmfenqi.request.QueryRecognizeRequest;
import com.nineoldandroids.animation.ValueAnimator;

public class ZMApproveFragment extends Fragment implements View.OnClickListener{
    private Activity mActivity;
    private View rootView;
    private Button bt_approving;//立即授权
    private TextView tv_sumMoney;//额度
    private LinearLayout ll_toApprove;//去认证布局
    private LinearLayout rl_reApprove;//去认证底下布局


    private LinearLayout ll_approved;//芝麻审核通过布局
    private RelativeLayout rl_zmapprove_success;//授权成功底下布局


//    private String zmApprovingState="";//芝麻认证状态 0为未授权 1为已授权
    private LinearLayout view;//全部视图
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mActivity=getActivity();
        getApproveState();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        rootView = inflater.inflate(R.layout.fragment_zm_approve, null);
        return rootView;
    }
    /**
     * 初始化布局
     */
    private void initView() {
        view= (LinearLayout) rootView.findViewById(R.id.view);
        bt_approving= (Button) rootView.findViewById(R.id.bt_approving);
        tv_sumMoney= (TextView) rootView.findViewById(R.id.tv_sumMoney);

        ll_toApprove= (LinearLayout) rootView.findViewById(R.id.ll_toApprove);
        rl_reApprove= (LinearLayout) rootView.findViewById(R.id.rl_reApprove);

        ll_approved= (LinearLayout) rootView.findViewById(R.id.ll_approved);
        rl_zmapprove_success= (RelativeLayout) rootView.findViewById(R.id.rl_zmapprove_success);

        switch (Integer.parseInt(checkStatus)){
            case 11://极速认证认证前
            case 13://极速认证不通过
            case 14://极速认证审核中
                ll_toApprove.setVisibility(View.VISIBLE);
                rl_reApprove.setVisibility(View.VISIBLE);
                ll_approved.setVisibility(View.GONE);
                rl_zmapprove_success.setVisibility(View.GONE);
//                bt_approving.setClickable(false);
//                bt_approving.setEnabled(false);
//                bt_approving.setSelected(true);


                bt_approving.setClickable(true);
                bt_approving.setEnabled(true);
                bt_approving.setSelected(false);
                break;
            case 12://极速认证通过
            case 22://芝麻信用不通过
                ll_toApprove.setVisibility(View.VISIBLE);
                rl_reApprove.setVisibility(View.VISIBLE);
                ll_approved.setVisibility(View.GONE);
                rl_zmapprove_success.setVisibility(View.GONE);
                bt_approving.setClickable(true);
                bt_approving.setEnabled(true);
                bt_approving.setSelected(false);
                break;
            case 31:
            case 32:
            case 33:
            case 21://芝麻信用通过
                ll_toApprove.setVisibility(View.GONE);
                rl_reApprove.setVisibility(View.GONE);
                ll_approved.setVisibility(View.VISIBLE);
                rl_zmapprove_success.setVisibility(View.VISIBLE);
                setIntChangeAnimation(0,Float.parseFloat(((CreditActivity) mActivity).getRealloanmoney()),tv_sumMoney);
                break;
        }
    }

    /**
     * 设置数字增长动画
     * @param startValue
     * @param endValue
     * @param textView
     */
    private void setIntChangeAnimation(float startValue, float endValue, final TextView textView) {
        final ValueAnimator animator = ValueAnimator.ofFloat(startValue, endValue);
        animator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            @Override
            public void onAnimationUpdate(ValueAnimator valueAnimator) {
                textView.setText(((Float) valueAnimator.getAnimatedValue()) + "");
            }
        });
        animator.setDuration(2000);
        animator.start();
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

    }


    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.bt_approving:
                ZMApproveActivity.launchActivity(mActivity);
                break;
        }
    }
    /**
     * 查询认证状态
     */
    //认证信息对象
    public  RecognizeInfo recognizeInfo;
    //认证状态
    public  String checkStatus="";
    private void getApproveState(){
        ((CreditActivity)mActivity).showLoading();
        QueryRecognizeRequest queryRecognizeRequest = new QueryRecognizeRequest();
        queryRecognizeRequest.goQuery(new QueryRecognizeRequest.QueryRecognizeListener() {

            @Override
            public void success(int statusCode, RecognizeInfo recognizeInfo) {
                ((CreditActivity)mActivity).cancelLoading();
                if (statusCode == 0 && recognizeInfo != null) {
                    ZMApproveFragment.this.recognizeInfo = recognizeInfo;
                    checkStatus = recognizeInfo.getCheckStatus();
//                    zmApprovingState = recognizeInfo.getCreditSix();
                    initView();
                    initListener();
                    initData();
                    view.setVisibility(View.VISIBLE);
                }
            }

            @Override
            public void fail(int statusCode, String statusMsg) {
                ((CreditActivity)mActivity).cancelLoading();
                checkStatus="22";
                initView();
                initListener();
                initData();
                view.setVisibility(View.VISIBLE);
            }
        });
    }
}
