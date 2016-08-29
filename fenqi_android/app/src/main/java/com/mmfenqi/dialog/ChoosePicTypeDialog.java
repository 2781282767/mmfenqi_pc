package com.mmfenqi.dialog;

import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup.LayoutParams;
import android.widget.TextView;

import com.hzpz.pzlibrary.data.BaseData;
import com.hzpz.pzlibrary.utils.ToolUtil;
import com.mmfenqi.mmfq.R;

/**
 * 上传头像
 * 
 * @author sunyl
 * 
 */
public class ChoosePicTypeDialog extends Dialog implements View.OnClickListener {

	private UploadPicListener listener;
	private Context mContext;
	private Activity mActivity;
	private TextView cameraTV;
	private TextView chooseTV;

	/**
	 *
	 * @param act
	 * @param cxt
	 */
	public ChoosePicTypeDialog(Activity act, Context cxt) {
		super(cxt, R.style.MyDialog);
		this.mContext = cxt;
		this.mActivity = act;
		ToolUtil.initDisplayMetrics(act);
	}

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		LayoutParams lp = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT);
		lp.width = (int) (BaseData.ScreenWidth * 7 / 10); // 设置宽度
		setContentView(LayoutInflater.from(mContext).inflate(R.layout.dialog_upload_pic, null), lp);
		initView();
	}

	/**
	 * 初始化控件
	 */
	private void initView() {
		cameraTV = (TextView) findViewById(R.id.cameraTV);
		chooseTV = (TextView) findViewById(R.id.chooseTV);

		cameraTV.setOnClickListener(this);
		chooseTV.setOnClickListener(this);
	}

	@Override
	public void onClick(View arg) {
		switch (arg.getId()) {
		case R.id.cameraTV:
			dismiss();
			listener.camera();
			break;
		case R.id.chooseTV:
			dismiss();
			listener.choose();
			break;
		default:
			break;
		}
	}

	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if (keyCode == KeyEvent.KEYCODE_BACK) {
			this.dismiss();
			return true;
		}
		return super.onKeyDown(keyCode, event);
	}

	public interface UploadPicListener {
		public void camera();

		public void choose();
	}

	public void setListener(UploadPicListener listener) {
		this.listener = listener;
	}

}
