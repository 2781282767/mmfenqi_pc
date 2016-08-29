package com.mmfenqi.dialog;

import android.app.Dialog;
import android.content.Context;
import android.graphics.drawable.AnimationDrawable;
import android.widget.ImageView;
import android.widget.TextView;

import com.mmfenqi.mmfq.R;


public class DataLoadingProgress extends Dialog {
	private Context context = null;
	private  DataLoadingProgress customProgressDialog = null;
	private TextView tvMsg ;
	private ImageView ivAnim ;
	public DataLoadingProgress(Context context){
		
		super(context, R.style.CustomProgressDialog);
		this.context = context;
		this.setContentView(R.layout.data_loading_dialog);
		ivAnim = (ImageView) findViewById(R.id.loadingImageView) ;
//		tvMsg = (TextView) findViewById(R.id.tv_loadingmsg);
		setCanceledOnTouchOutside(false);
	}
 
    public void onWindowFocusChanged(boolean hasFocus){
    	
    	if (customProgressDialog == null){
    		return;
    	}
    	
        ImageView imageView = (ImageView) customProgressDialog.findViewById(R.id.loadingImageView);
        AnimationDrawable animationDrawable = (AnimationDrawable) imageView.getBackground();
        animationDrawable.start();
    }
    
    @Override
    public void show() {
    	// TODO Auto-generated method stub
    	       AnimationDrawable animationDrawable = (AnimationDrawable) ivAnim.getBackground();
    	       animationDrawable.start();
    	
    	super.show();
    }
    
    @Override
    public void dismiss() {
    	// TODO Auto-generated method stub
        AnimationDrawable animationDrawable = (AnimationDrawable) ivAnim.getBackground();
        animationDrawable.stop();
    	super.dismiss();
    }
    
    /**
     * 
     * [Summary]
     *       setMessage 提示内容
     * @param strMessage
     * @return
     *
     */
    public void setMessage(String strMessage){
    	
    	if (tvMsg != null){
    		tvMsg.setText(strMessage);
    	}
    }

}
