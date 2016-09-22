package com.hzpz.pzlibrary.widget;

import android.content.Context;
import android.graphics.Canvas;
import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.widget.TextView;

public class MarqueeTextView extends TextView {
	private final String namespace = "http://www.angellecho.com/";  
	/** 是否停止滚动 */
	private boolean mStopMarquee;
	private String mText;
	private float mCoordinateX;
	private float mTextWidth;    
	private float textSize; 
	private float wlen ;

	public MarqueeTextView(Context context, AttributeSet attrs) {
		super(context, attrs);
		textSize = attrs.getAttributeIntValue(namespace, "textSize", 15); 
		
	}

	public void setWindowLen(int len){
		this.wlen = len ;
	}
	public void setText(String text) {
		this.mText = text;
		mTextWidth = getPaint().measureText(mText);
		if (mHandler.hasMessages(0))
			mHandler.removeMessages(0);
		mHandler.sendEmptyMessageDelayed(0, 100);
	}

	@Override
	protected void onAttachedToWindow() {
		mStopMarquee = false;
		if (!TextUtils.isEmpty(mText))
			mHandler.sendEmptyMessageDelayed(0, 100);
		super.onAttachedToWindow();
	}

	@Override
	protected void onDetachedFromWindow() {
		mStopMarquee = true;
		if (mHandler.hasMessages(0))
			mHandler.removeMessages(0);
		super.onDetachedFromWindow();
	}

	@Override
	protected void onDraw(Canvas canvas) {
		super.onDraw(canvas);
		if (!TextUtils.isEmpty(mText)){
			canvas.drawText(mText, mCoordinateX, getHeight()*2/3, getPaint());
		}
	}

	private Handler mHandler = new Handler() {
		@Override
		public void handleMessage(Message msg) {
			//Log.d("MarqueeTextView","字长 = "+mTextWidth + "  mCoordinateX = " + mCoordinateX );
			switch (msg.what) {
			case 0:
				if (Math.abs(mCoordinateX) <= 0) {
					mCoordinateX = wlen;
					invalidate();
					if (!mStopMarquee) {
						sendEmptyMessageDelayed(0, 100);
					}
				} else {
					mCoordinateX -= 2;
					invalidate();
					if (!mStopMarquee) {
						sendEmptyMessageDelayed(0, 30);
					}
				}

				break;
			}
			super.handleMessage(msg);
		}
	};

}