package com.mmfenqi.fragment;

import android.app.Activity;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.mmfenqi.Bean.RecognizeInfo;
import com.mmfenqi.mmfq.CreditActivity;
import com.mmfenqi.mmfq.MoreLimitActivity;
import com.mmfenqi.mmfq.R;
import com.mmfenqi.request.QueryRecognizeRequest;
import com.nineoldandroids.animation.ValueAnimator;

public class MoreLimitFragment extends Fragment implements View.OnClickListener{
    private Activity mActivity;
    private View rootView;
    private Button bt_approving;//立即授权
    private int arroveState=0;//当前认证状态

    private RelativeLayout rl_limitMoney;//额度头布局

    private RelativeLayout rl_fail;//审核失败头布局

    private LinearLayout rl_reApprove;//未认证布局中
    private LinearLayout ll_toApprove;//未认证布局下

    private TextView tv_bottom;//5000到10000额度

    private ImageView iv_approving;//审核图标
    private  TextView tv_approving;//审核通过文字

    private LinearLayout ll_approved;//审核中和审核通过布局

    private TextView tv_sumMoney;//增加的额度
    private TextView tv_title;
    //审核失败布局
    private LinearLayout ll_approvefail;

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
        rootView = inflater.inflate(R.layout.fragment_more_limit, null);
        return rootView;
    }
    /**
     * 初始化布局
     */
    private void initView() {
        view= (LinearLayout) rootView.findViewById(R.id.view);
        bt_approving= (Button) rootView.findViewById(R.id.bt_approving);
        tv_bottom= (TextView) rootView.findViewById(R.id.tv_bottom);

        tv_title= (TextView) rootView.findViewById(R.id.tv_title);

        rl_limitMoney= (RelativeLayout) rootView.findViewById(R.id.rl_limitMoney);
        rl_reApprove= (LinearLayout) rootView.findViewById(R.id.rl_reApprove);
        ll_toApprove= (LinearLayout) rootView.findViewById(R.id.ll_toApprove);

        rl_fail= (RelativeLayout) rootView.findViewById(R.id.rl_fail);

        ll_approved= (LinearLayout) rootView.findViewById(R.id.ll_approved);

        iv_approving= (ImageView) rootView.findViewById(R.id.iv_approving);
        tv_approving= (TextView) rootView.findViewById(R.id.tv_approving);

        tv_sumMoney= (TextView) rootView.findViewById(R.id.tv_sumMoney);

        ll_approvefail= (LinearLayout) rootView.findViewById(R.id.ll_approvefail);
        switch (Integer.parseInt(checkStatus)){
            case 11://极速认证认证前
            case 12://极速认证通过
            case 13://极速认证不通过
            case 14://极速认证审核中
            case 22://芝麻信用不通过
                rl_limitMoney.setVisibility(View.VISIBLE);
                ll_toApprove.setVisibility(View.VISIBLE);
                bt_approving.setVisibility(View.VISIBLE);
                tv_bottom.setVisibility(View.VISIBLE);

                ll_approved.setVisibility(View.GONE);
                rl_fail.setVisibility(View.GONE);
                ll_approvefail.setVisibility(View.GONE);
                bt_approving.setText("立即认证");
                bt_approving.setClickable(false);
                bt_approving.setEnabled(false);
                bt_approving.setSelected(true);
                break;
            case 21://芝麻信用通过
                rl_limitMoney.setVisibility(View.VISIBLE);
                ll_toApprove.setVisibility(View.VISIBLE);
                bt_approving.setVisibility(View.VISIBLE);
                tv_bottom.setVisibility(View.VISIBLE);
                tv_title.setVisibility(View.VISIBLE);

                ll_approved.setVisibility(View.GONE);
                rl_fail.setVisibility(View.GONE);
                ll_approvefail.setVisibility(View.GONE);
                bt_approving.setText("立即认证");
                bt_approving.setClickable(true);
                bt_approving.setEnabled(true);
                bt_approving.setSelected(false);
                break;
            case 33://审核中
                rl_limitMoney.setVisibility(View.VISIBLE);
                ll_approved.setVisibility(View.VISIBLE);
                tv_bottom.setVisibility(View.VISIBLE);
                tv_title.setVisibility(View.VISIBLE);

                ll_toApprove.setVisibility(View.GONE);
                bt_approving.setVisibility(View.GONE);
                rl_fail.setVisibility(View.GONE);
                ll_approvefail.setVisibility(View.GONE);

                tv_sumMoney.setText("审核中，请耐心等待");
                tv_sumMoney.setTextSize(20);
                tv_approving.setText("审核中");
                iv_approving.setBackgroundResource(R.mipmap.ic_morelimit_approving);
                break;
            case 32://审核不通过
                bt_approving.setVisibility(View.VISIBLE);
                rl_fail.setVisibility(View.VISIBLE);
                ll_approvefail.setVisibility(View.VISIBLE);
                tv_bottom.setVisibility(View.GONE);
                rl_limitMoney.setVisibility(View.GONE);
                tv_title.setVisibility(View.GONE);

                bt_approving.setText("重新认证");
                bt_approving.setClickable(true);
                bt_approving.setEnabled(true);
                bt_approving.setSelected(false);
                break;
            case 31://审核成功
                rl_limitMoney.setVisibility(View.VISIBLE);
                ll_approved.setVisibility(View.VISIBLE);
                bt_approving.setVisibility(View.VISIBLE);
                tv_bottom.setVisibility(View.VISIBLE);
                tv_title.setVisibility(View.VISIBLE);

                ll_toApprove.setVisibility(View.GONE);
                ll_approvefail.setVisibility(View.GONE);
                rl_fail.setVisibility(View.GONE);

                tv_approving.setText("审核通过");
                iv_approving.setBackgroundResource(R.mipmap.ic_morelimitsuccess);

                setIntChangeAnimation(0, Float.parseFloat(((CreditActivity) mActivity).getRealloanmoney()), tv_sumMoney);

                tv_sumMoney.setTextSize(40);
                bt_approving.setText("提交更多资料");
                bt_approving.setClickable(true);
                bt_approving.setEnabled(true);
                bt_approving.setSelected(false);
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
                MoreLimitActivity.launchActivity(mActivity);
                break;
        }
    }

    /**
     * 查询认证状态
     */
    //认证信息对象
    public RecognizeInfo recognizeInfo;
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
                    MoreLimitFragment.this.recognizeInfo = recognizeInfo;
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
                checkStatus="11";
                initView();
                initListener();
                initData();
                view.setVisibility(View.VISIBLE);
            }
        });
    }
}
